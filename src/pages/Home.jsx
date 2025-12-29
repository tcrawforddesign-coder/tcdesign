import { useCallback, useEffect, useMemo, useState, useRef, useId } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github, Instagram, Linkedin, Mail, Menu, X, Megaphone, Camera, PenTool, Cpu } from "lucide-react";

import { projects } from "../data/projects.js";
import { posterProject } from "../data/posters.js";
import CodeCloud from "../components/CodeCloud.jsx";

const HEADSHOT = "/images/headshot.jpg";
const MotionDiv = motion.div;
const MotionOutline = motion.div;
const POSTER_IMAGES = Array.from({ length: 19 }, (_, index) => `/images/Poster_${index + 1}.png`);
const SOFTWARE_ICONS = [
  { name: "Photoshop", src: "/Photoshop.svg" },
  { name: "Illustrator", src: "/Illustrator.svg" },
  { name: "InDesign", src: "/InDesign.svg" },
  { name: "Figma", src: "/Figma.svg" },
  { name: "Lightroom", src: "/Lightroom.svg" },
  { name: "Acrobat", src: "/Acrobat.svg" },
  { name: "XD", src: "/Xd.svg" },
  { name: "Cursor", src: "/Cursor.svg" },
];

function splitProjectTitle(title = "") {
  const segments = title.split("—").map((segment) => segment.trim()).filter(Boolean);
  if (segments.length <= 1) {
    return { primary: title.trim(), secondary: "" };
  }
  return {
    primary: segments[0],
    secondary: segments.slice(1).join(" — "),
  };
}

const PRIMARY_NAV = [
  { label: "Work", type: "anchor", href: "#work" },
  { label: "Posters", type: "route", to: "/posters" },
  { label: "About", type: "anchor", href: "#about" },
  { label: "Contact", type: "anchor", href: "#contact" },
];
const ABOUT_TEXT_STATS = [
  { k: "Years", v: "5+" },
  { k: "Awards", v: "Graphis Gold + 6x Silver" },
];

const FEATURED_SLUGS = ["civil-goat-coffee", "atlas-coffee-club", "barbican-refresh"];
const FEATURED_COL_SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];
const baseFeaturedProjects = FEATURED_SLUGS.map((slug) => projects.find((project) => project.slug === slug)).filter(Boolean);
const featuredProjects = posterProject
  ? [baseFeaturedProjects[0], posterProject, ...baseFeaturedProjects.slice(1)].filter(Boolean)
  : baseFeaturedProjects;

export default function Home() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const outlineRotation = useTransform(scrollYProgress, [0, 1], ["0deg", "8deg"]);
  const outlineOpacity = useTransform(scrollYProgress, [0, 0.4], [0.18, 0.05]);
  const outlineScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <div className="min-h-screen bg-[#030303] text-white antialiased selection:bg-white selection:text-black">
      <MotionDiv style={{ width }} className="fixed top-0 left-0 h-[3px] bg-[var(--brand-red)] z-50" aria-hidden />

      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <a href="#home" className="font-black tracking-tight text-lg md:text-xl inline-flex items-center">
              <span>Travis Crawford</span>
            </a>

            <nav aria-label="Primary" className="hidden md:flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
              {PRIMARY_NAV.map((item) =>
                item.type === "route" ? (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="px-4 py-2 rounded-full border border-white/15 hover:border-white/40 transition backdrop-blur bg-white/5 hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="px-4 py-2 rounded-full border border-white/15 hover:border-white/40 transition backdrop-blur bg-white/5 hover:bg-white/10"
                  >
                    {item.label}
                  </a>
                ),
              )}
            </nav>

            <div className="flex items-center gap-3">
              <a href="#contact" className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white text-black font-medium hover:contrast-125 transition">
                <ArrowUpRight className="w-4 h-4" /> Contact
              </a>
              <button className="md:hidden p-2 rounded border border-white/15" aria-label="Open menu" onClick={() => setOpen(true)}>
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div role="dialog" aria-modal className="fixed inset-0 z-50 bg-black/80">
            <div className="absolute top-4 right-4">
              <button className="p-2 rounded border border-white/15" onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="min-h-full grid place-items-center">
              <ul className="space-y-6 text-center text-2xl">
                {PRIMARY_NAV.map((item) => (
                  <li key={item.label}>
                    {item.type === "route" ? (
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="px-6 py-3 rounded-full border border-white/15 inline-block bg-white/5 hover:bg-white/10"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="px-6 py-3 rounded-full border border-white/15 inline-block bg-white/5 hover:bg-white/10"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </header>

      <section id="home" className="relative overflow-hidden">
        <CodeCloud />
        <div className="hero-gradient" aria-hidden="true" />
            <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20 pb-14 md:pt-28 md:pb-24">
              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-7 flex flex-col gap-5">
                  <div className="hero-intro-card relative rounded-[28px] border border-white/15 bg-black/55 backdrop-blur-sm px-6 py-8 md:px-10 md:py-12 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.9)]">
                    <MotionOutline
                      style={{ rotate: outlineRotation, opacity: outlineOpacity, scale: outlineScale }}
                      className="hero-heading__outline hidden md:block"
                      aria-hidden
                    >
                      TC
                    </MotionOutline>
                    <div className="space-y-5 relative z-10">
                      <h1 className="hero-heading text-4xl md:text-6xl font-black leading-[1.05] tracking-tight">
                        Visual designer crafting <span className="text-[var(--brand-red)]">bold</span> brand systems.
                      </h1>
                      <p className="text-white/70 max-w-xl">Simple, intentional, and not afraid to experiment.</p>
                      <div className="flex flex-wrap gap-3">
                        <a href="#work" className="px-4 py-2 rounded-full bg-white text-black font-medium hover:contrast-125 transition">
                          View work
                        </a>
                        <a href="#contact" className="px-4 py-2 rounded-full border border-white/20 hover:border-white/40">
                          Get in touch
                        </a>
                      </div>
                    </div>
                  </div>
                  <DashboardMetricCard />
            </div>
              <div className="md:col-span-5 flex flex-col gap-4">
                <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.8)]">
                  <HeadshotCard />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4 w-full">
                  <FunMetricCard
                    title="Pixels panned per day"
                    value="4.2 mi"
                    description="Average distance dragged across Figma canvases."
                    accentStops={["#00c6ff", "#005bea", "#002c8a"]}
                    variant="sparkline"
                    data={PIXELS_SERIES}
                  />
                  <FunMetricCard
                    title="Keyshot espresso time"
                    value="7:00 AM"
                    description="Daily ritual before the first design sprint kicks in."
                    accentStops={["#bbf7d0", "#4ade80", "#166534"]}
                    variant="clock"
                    data={ESPRESSO_SERIES}
                  />
                </div>
              </div>
          </div>
        </div>
      </section>

      <main id="content">
        <section id="work" className="relative">
          <div className="max-w-7xl mx-auto px-4 py-14 md:py-24">
            <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
              <h2 className="text-2xl md:text-4xl font-black tracking-tight">Selected Work</h2>
              <Link
                to={{ pathname: "/projects", hash: "#top" }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold shadow-[0_10px_30px_-12px_rgba(255,255,255,0.65)] hover:shadow-[0_14px_34px_-10px_rgba(255,255,255,0.75)] hover:translate-y-[-2px] transition-transform transition-shadow"
              >
                See all work <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <ul className="grid md:grid-cols-12 gap-6">
              {featuredProjects.map((project, index) => (
                <li
                  key={project.id}
                  className={`group col-span-12 ${FEATURED_COL_SPANS[index] ?? "md:col-span-5"}`}
                >
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="about" className="relative border-y border-white/10 bg-[#0d0d0d]">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            aria-hidden
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(255,255,255,.12) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(255,255,255,.10) 0 2px, transparent 2px 6px)",
            }}
          />
          <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7">
              <h2 className="text-2xl md:text-4xl font-black tracking-tight">About</h2>
              <p className="mt-4 text-white/70 leading-relaxed max-w-2xl">
                I&apos;m Travis Crawford, a designer from Texas who focuses on branding and digital experiences. I like creating work
                that feels intentional but still has room to surprise people. When I&apos;m not working on client projects, I&apos;m usually
                designing posters for fun. It&apos;s my way of staying curious.
              </p>
              <div className="mt-8 flex gap-3">
                <a href="#contact" className="px-4 py-2 rounded-full bg-[var(--brand-red)] text-black font-medium hover:contrast-125 transition">
                  Work together
                </a>
                <a href="#" className="px-4 py-2 rounded-full border border-white/20 hover:border-white/40">
                  Download CV
                </a>
              </div>
            </div>
            <aside className="md:col-span-5 space-y-4 text-sm relative z-0">
              <div className="p-4 rounded-xl border border-white/10 bg-black/30 relative z-10">
                <div className="text-white/50">Tools</div>
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-4">
                  {SOFTWARE_ICONS.map((icon) => (
                    <div key={icon.name} className="software-icon flex flex-col items-center gap-2 text-center">
                      <img src={icon.src} alt={icon.name} className="h-12 w-12 object-contain" loading="lazy" decoding="async" />
                      <span className="software-icon__label text-[11px] uppercase tracking-[0.28em] text-white/60">{icon.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ABOUT_TEXT_STATS.map((stat) => (
                  <li key={stat.k} className="p-4 rounded-xl border border-white/10 bg-black/30">
                    <div className="text-white/50">{stat.k}</div>
                    <div className="text-lg font-semibold mt-1">{stat.v}</div>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
            <div className="grid md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-7">
                <h2 className="text-2xl md:text-4xl font-black tracking-tight">Let’s build something sharp.</h2>
                <p className="mt-4 text-white/70 max-w-xl">
                  Send a note about your goals, timeline, and any references. I’ll reply within 1–2 business days with next steps.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="mailto:tcrawford.design@gmail.com"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-medium hover:contrast-125"
                  >
                    <Mail className="w-4 h-4" /> tcrawford.design@gmail.com
                  </a>
                  <a
                    href="https://www.linkedin.com/in/travis-crawford-67759b24a"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white/40"
                  >
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                </div>
              </div>
              <MagnetCTA />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <p>© {new Date().getFullYear()} TC Design</p>
          <div className="flex gap-4">
            <a href="#work" className="hover:text-white">
              Work
            </a>
            <Link to="/posters" className="hover:text-white">
              Posters
            </Link>
            <a href="#about" className="hover:text-white">
              About
            </a>
            <a href="#contact" className="hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const DISABLED_SLUGS = [];

const CAPABILITY_METRICS = [
  { label: "Branding", icon: PenTool, progress: 95, accent: "from-[#ff5f6d] to-[#ffc371]" },
  { label: "Marketing", icon: Megaphone, progress: 88, accent: "from-[#3f2b96] via-[#a8c0ff] to-[#00d4ff]" },
  { label: "Strategy", icon: Cpu, progress: 92, accent: "from-[#8360c3] to-[#2ebf91]" },
  { label: "Art Direction", icon: Camera, progress: 90, accent: "from-[#f83600] to-[#f9d423]" },
];

const PIXELS_SERIES = [
  { label: "Mon", value: 3.8 },
  { label: "Tue", value: 4.1 },
  { label: "Wed", value: 4.6 },
  { label: "Thu", value: 4.0 },
  { label: "Fri", value: 4.4 },
  { label: "Sat", value: 4.7 },
  { label: "Sun", value: 3.9 },
];

const ESPRESSO_SERIES = [
  { label: "Mon", value: 6.92, display: "6:55" },
  { label: "Tue", value: 7.08, display: "7:05" },
  { label: "Wed", value: 6.83, display: "6:50" },
  { label: "Thu", value: 7.15, display: "7:09" },
  { label: "Fri", value: 7.0, display: "7:00" },
  { label: "Sat", value: 8.2, display: "8:12" },
  { label: "Sun", value: 9.0, display: "9:00" },
];

export function ProjectCard({ project }) {
  const disabled = DISABLED_SLUGS.includes(project.slug);
  const { primary, secondary } = splitProjectTitle(project.title ?? "");
  const linkTarget = project.href ?? (project.slug ? `/projects/${project.slug}` : "#");
  const hasImage = Boolean(project.cover);
  const isComingSoon = disabled;
  const clickable = !isComingSoon;
  const ariaLabel = secondary ? `${primary} — ${secondary}` : primary;

  const cardContent = (
    <MotionDiv
      initial={{ opacity: 0.9 }}
      whileHover={clickable ? { scale: 1.015 } : undefined}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black/40"
    >
      {hasImage ? (
        <img
          src={project.cover}
          alt=""
          className={`w-full h-full object-cover transition ${disabled ? "opacity-40" : "opacity-90 group-hover:opacity-100"}`}
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
        />
      ) : (
        <div
          className={`w-full h-full transition ${disabled ? "opacity-40" : "opacity-90 group-hover:opacity-100"} bg-black/50`}
          aria-hidden="true"
        />
      )}
      <div className={`card-hover-border ${disabled ? "card-hover-border--disabled" : ""}`} aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
        <div className="space-y-1">
          <span className="inline-block text-xs tracking-wide uppercase text-white/70">{project.tag}</span>
          <div className="space-y-1">
            <h3 className="text-lg md:text-xl font-semibold leading-tight max-w-xl">{primary}</h3>
            {secondary ? (
              <span className="block text-[11px] uppercase tracking-[0.35em] text-white/50">{secondary}</span>
            ) : null}
          </div>
        </div>
        {clickable ? (
          <ArrowUpRight className="w-5 h-5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
        ) : (
          <span className="text-[11px] uppercase tracking-[0.35em] text-white/50">Coming Soon</span>
        )}
      </div>
      {isComingSoon && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm grid place-items-center">
          <span className="text-white/80 text-sm uppercase tracking-[0.3em]">Coming Soon</span>
        </div>
      )}
    </MotionDiv>
  );

  if (disabled) {
    return (
      <div className="block group pointer-events-none" aria-disabled="true" title="Coming soon">
        {cardContent}
      </div>
    );
  }

  if (!clickable) {
    return (
      <div className="block group cursor-default" aria-disabled="true" aria-label={ariaLabel} title="Case study coming soon">
        {cardContent}
      </div>
    );
  }

  return (
    <Link to={linkTarget} className="block group" aria-label={ariaLabel}>
      {cardContent}
    </Link>
  );
}

function HeadshotCard() {
  return (
    <div className="profile-card profile-card--compact" aria-label="Portrait of Travis Crawford">
      <img
        src={HEADSHOT}
        alt="Travis Crawford"
        className="profile-card__image"
        loading="eager"
        fetchpriority="high"
        decoding="async"
      />
      <div className="profile-card__overlay" />
      <div className="profile-card__border">
        <div className="profile-card__name">Travis Crawford</div>
        <div className="profile-card__icons" aria-label="Social links">
          <a
            href="https://www.linkedin.com/in/travis-crawford-67759b24a"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://www.instagram.com/treves_/" target="_blank" rel="noreferrer" aria-label="Instagram">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}

function PosterSpotlight({ posters }) {
  const curated = useMemo(() => posters.filter(Boolean), [posters]);
  const [order, setOrder] = useState(curated);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setOrder(curated);
  }, [curated]);

  const rotations = useMemo(() => [-4.5, 2.5, 1.5, -2.5, 0.75], []);

  const shufflePosters = () => {
    setOrder((prev) => {
      const next = [...prev];
      for (let i = next.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
      }
      return next;
    });
  };

  useEffect(() => {
    if (selected) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
    return undefined;
  }, [selected]);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") {
        setSelected(null);
      }
    };
    if (selected) {
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
    return undefined;
  }, [selected]);

  return (
    <>
      <section className="poster-gallery">
        <header className="poster-gallery__header">
          <div className="poster-gallery__title">
            Poster archive
            <span>{String(order.length).padStart(2, "0")} pieces</span>
          </div>
          <button type="button" className="poster-gallery__shuffle" onClick={shufflePosters}>
            Shuffle
          </button>
        </header>
        <div className="poster-gallery__scroll" role="list">
          {order.map((src, index) => (
            <figure
              key={src}
              role="listitem"
              className="poster-gallery__item"
              style={{ "--poster-rotation": `${rotations[index % rotations.length]}deg` }}
            >
              <button
                type="button"
                className="poster-gallery__button"
                onClick={() => setSelected(src)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelected(src);
                  }
                }}
                aria-label={`View poster ${index + 1}`}
              >
                <img src={src} alt={`Poster ${index + 1}`} loading="lazy" decoding="async" />
              </button>
            </figure>
          ))}
        </div>
      </section>
      {selected && (
        <PosterLightbox
          src={selected}
          onClose={() => setSelected(null)}
          total={order.length}
          index={order.findIndex((src) => src === selected)}
        />
      )}
    </>
  );
}

function DashboardMetricCard({ className = "" }) {
  return (
    <div className={`w-full rounded-2xl border border-white/10 bg-[#090909]/85 backdrop-blur-sm p-6 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.85)] space-y-5 flex flex-col ${className}`}>
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/40">
        <span>Capabilities Pulse</span>
        <span className="inline-flex items-center gap-1 text-white/55">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </span>
      </div>
      <div className="capability-gauges space-y-4 pt-2 flex-1">
        {CAPABILITY_METRICS.map(({ label, icon: Icon, progress, accent }) => (
          <div key={label} className="capability-gauge">
            <div className="flex items-center justify-between text-sm text-white/60 mb-2">
              <span className="inline-flex items-center gap-2">
                <Icon className="w-4 h-4" /> {label}
              </span>
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">{progress}%</span>
            </div>
            <div className="gauge-bar">
              <motion.div
                className={`gauge-bar__fill bg-gradient-to-r ${accent}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FunMetricCard({ title, value, description, accentStops = [], variant, data = [] }) {
  return (
    <div className="fun-metric-card relative overflow-hidden rounded-2xl border border-white/10 bg-[#050505]/92 backdrop-blur-sm p-4 shadow-[0_10px_28px_-20px_rgba(0,0,0,0.85)]">
      <div className="relative z-10 space-y-2.5">
        <div className="text-[11px] uppercase tracking-[0.35em] text-white/45">{title}</div>
        <div className="text-2xl font-black tracking-tight text-white">{value}</div>
        <p className="text-xs text-white/60 leading-relaxed">{description}</p>
        {variant === "sparkline" ? <PixelsSparkline data={data} stops={accentStops} /> : null}
        {variant === "clock" ? <EspressoSunrise data={data} /> : null}
      </div>
    </div>
  );
}

function PixelsSparkline({ data = [], stops = [] }) {
  const gradientId = useId();
  const gradientStops = stops.length ? stops : ["#4ade80", "#22d3ee"];
  if (!data.length) return null;

  const width = 220;
  const height = 80;
  const paddingX = 10;
  const paddingY = 10;
  const maxValue = Math.max(...data.map((point) => point.value));

  const points = data.map((point, index) => {
    const x = paddingX + (index / Math.max(data.length - 1, 1)) * (width - paddingX * 2);
    const normalized = point.value / maxValue;
    const y = height - paddingY - normalized * (height - paddingY * 2);
    return { x, y, label: point.label, value: point.value };
  });

  const pathData = `M ${points.map((point) => `${point.x},${point.y}`).join(" L ")}`;
  const areaData = `${pathData} L ${points[points.length - 1].x},${height - paddingY} L ${points[0].x},${height - paddingY} Z`;

  return (
    <svg className="fun-metric-card__sparkline" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Weekly Figma distance">
      <defs>
        <linearGradient id={`${gradientId}-stroke`} x1="0%" y1="0%" x2="100%" y2="0%">
          {gradientStops.map((color, index) => (
            <stop key={`${gradientId}-stroke-${color}`} offset={`${(index / Math.max(gradientStops.length - 1, 1)) * 100}%`} stopColor={color} />
          ))}
        </linearGradient>
        <linearGradient id={`${gradientId}-fill`} x1="0%" y1="0%" x2="0%" y2="100%">
          {gradientStops.map((color, index) => (
            <stop
              key={`${gradientId}-fill-${color}`}
              offset={`${(index / Math.max(gradientStops.length - 1, 1)) * 100}%`}
              stopColor={color}
              stopOpacity={index === 0 ? 0.45 : 0.05}
            />
          ))}
        </linearGradient>
      </defs>
      <path d={areaData} fill={`url(#${gradientId}-fill)`} opacity={0.25} />
      <path d={pathData} stroke={`url(#${gradientId}-stroke)`} strokeWidth={2.2} fill="none" strokeLinecap="round" />
      {points.map((point) => (
        <circle key={`${point.label}-dot`} cx={point.x} cy={point.y} r={3} fill="rgba(255,255,255,0.9)" />
      ))}
      <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="rgba(255,255,255,0.12)" strokeWidth={1} strokeDasharray="4 4" />
      {points.map((point) => (
        <text key={`${point.label}-label`} x={point.x} y={height - 2} fontSize="10" textAnchor="middle" fill="rgba(255,255,255,0.35)" letterSpacing="0.28em">
          {point.label}
        </text>
      ))}
    </svg>
  );
}

function EspressoSunrise({ data = [] }) {
  const current = data.find((point) => point.label === "Fri") ?? data[data.length - 1];
  const hourValue = current?.value ?? 7;
  const hours = Math.floor(hourValue);
  const minutes = Math.round((hourValue - hours) * 60);
  const totalHours = hours + minutes / 60;
  const normalized = Math.min(Math.max((totalHours - 5) / 6, 0), 1);
  const display = current?.display ?? `${hours}:${minutes.toString().padStart(2, "0")}`;

  return (
    <div className="fun-metric-card__sunrise" role="img" aria-label="Espresso ritual timeline">
      <svg viewBox="0 0 140 80" className="sunrise-timeline">
        <defs>
          <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="30%" stopColor="#2563eb" />
            <stop offset="60%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="140" height="80" fill="url(#timeline-gradient)" opacity="0.22" />
        <line x1="12" y1="60" x2="128" y2="60" stroke="rgba(255,255,255,0.18)" strokeWidth="1.3" strokeLinecap="round" />
        {[6, 9, 12].map((hour) => (
          <g key={hour}>
            <line x1={12 + ((hour - 4) / 8) * 116} y1="58" x2={12 + ((hour - 4) / 8) * 116} y2="62" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <text x={12 + ((hour - 4) / 8) * 116} y="70" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)" letterSpacing="0.3em">
              {hour} AM
            </text>
          </g>
        ))}
        <circle cx={12 + normalized * 116} cy="60" r="6" fill="rgba(255, 243, 133, 0.95)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
        <circle cx={12 + normalized * 116} cy="60" r="16" fill="rgba(255, 200, 0, 0.15)" />
      </svg>
      <div className="sunrise-time sunrise-time--timeline">{display}</div>
    </div>
  );
}

function PosterLightbox({ src, onClose, index, total }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();
    return () => {
      if (previouslyFocused && previouslyFocused.focus) {
        previouslyFocused.focus();
      }
    };
  }, []);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="poster-modal" role="dialog" aria-modal="true" onClick={handleBackdropClick}>
      <div className="poster-modal__backdrop" />
      <div className="poster-modal__content">
        <button
          type="button"
          className="poster-modal__close poster-modal__close--floating"
          onClick={onClose}
          ref={closeButtonRef}
          aria-label="Close poster"
        >
          Close
        </button>
        <div className="poster-modal__tag">
          Poster {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
        </div>
        <div className="poster-modal__image">
          <img src={src} alt="Poster detail" loading="lazy" decoding="async" />
        </div>
      </div>
    </div>
  );
}

const GLITCH_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function LogoGlitchWord({ text, className = "" }) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const textRef = useRef(text);

  const clearTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const runGlitch = useCallback(() => {
    clearTimers();
    const target = textRef.current;
    const extraChars = Math.max(6, Math.ceil(target.length / 2));
    const totalLength = target.length + extraChars;
    let iteration = 0;
    const maxIterations = totalLength + 4;

    setIsGlitching(true);

    intervalRef.current = window.setInterval(() => {
      iteration += 1.2;

      const scrambled = Array.from({ length: totalLength }, (_, index) => {
        if (index < target.length) {
          const char = target[index];
          if (!/[A-Za-z]/.test(char)) {
            return char;
          }
          if (index < iteration) {
            return char;
          }
          return GLITCH_CHARSET[Math.floor(Math.random() * GLITCH_CHARSET.length)];
        }
        const extraIndex = index - target.length;
        const removalThreshold = target.length + extraIndex * 1.5;
        if (iteration < removalThreshold) {
          return GLITCH_CHARSET[Math.floor(Math.random() * GLITCH_CHARSET.length)];
        }
        return " ";
      })
        .join("")
        .trimEnd();

      setDisplayText(scrambled);

      if (iteration >= maxIterations) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplayText(target);
        setIsGlitching(false);
        timeoutRef.current = window.setTimeout(runGlitch, 6000 + Math.random() * 7000);
      }
    }, 45);
  }, [clearTimers]);

  useEffect(() => {
    textRef.current = text;
    setDisplayText(text);
    runGlitch();

    return () => {
      clearTimers();
    };
  }, [text, runGlitch, clearTimers]);

  return (
    <span className={`inline-block ${isGlitching ? "text-white" : "text-[var(--brand-red)]"} ${className}`} aria-label={text}>
      {displayText}
    </span>
  );
}

function MagnetCTA() {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setPos({ x: event.clientX - (rect.left + rect.width / 2), y: event.clientY - (rect.top + rect.height / 2) });
    };
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="md:col-span-5">
      <div ref={ref} className="relative p-8 rounded-2xl border border-white/10 bg-black/40 overflow-hidden">
        <div
          className="pointer-events-none absolute -inset-20 opacity-40"
          style={{
            background: `radial-gradient(400px 200px at calc(50% + ${pos.x / 10}px) calc(50% + ${pos.y / 10}px), rgba(255,255,255,.22), transparent 60%)`,
          }}
          aria-hidden
        />
        <h3 className="text-xl font-semibold">Have a brief?</h3>
        <p className="mt-2 text-white/70">Send 3–5 bullets about the challenge. I’ll respond with an approach & timeline.</p>
        <a
          href="mailto:tcrawford.design@gmail.com"
          className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-medium hover:contrast-125 transition"
        >
          Share your brief
        </a>
      </div>
    </div>
  );
}


