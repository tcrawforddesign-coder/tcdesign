import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github, Instagram, Linkedin, Mail, Menu, X, Megaphone, Camera, PenTool, Cpu } from "lucide-react";

import { projects } from "../data/projects.js";
import CodeCloud from "../components/CodeCloud.jsx";

const HEADSHOT = "/images/headshot.jpg";
const MotionDiv = motion.div;
const POSTER_IMAGES = Array.from({ length: 19 }, (_, index) => `/images/Poster_${index + 1}.png`);

const FEATURED_SLUGS = ["civil-goat-coffee", "aluma-skincare", "barbican-refresh", "data-dog-analytics"];
const FEATURED_COL_SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];
const featuredProjects = FEATURED_SLUGS.map((slug) => projects.find((project) => project.slug === slug)).filter(Boolean);

export default function Home() {
  const [open, setOpen] = useState(false);
  const [showPosters, setShowPosters] = useState(false);
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="min-h-screen bg-[#030303] text-white antialiased selection:bg-white selection:text-black">
      <MotionDiv style={{ width }} className="fixed top-0 left-0 h-[3px] bg-[var(--brand-red)] z-50" aria-hidden />

      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <a href="#home" className="font-black tracking-tight text-lg md:text-xl">
              <span className="px-2 py-1 bg-white text-black">TC</span>
              <LogoGlitchWord text="DESIGN" className="ml-2" />
            </a>

            <nav aria-label="Primary" className="hidden md:flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
              {["Work", "About", "Contact"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="px-4 py-2 rounded-full border border-white/15 hover:border-white/40 transition backdrop-blur bg-white/5 hover:bg-white/10">
                  {item}
                </a>
              ))}
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
                {[
                  { label: "Work", href: "#work" },
                  { label: "About", href: "#about" },
                  { label: "Contact", href: "#contact" },
                ].map((i) => (
                  <li key={i.label}>
                    <a
                      href={i.href}
                      onClick={() => setOpen(false)}
                      className="px-6 py-3 rounded-full border border-white/15 inline-block bg-white/5 hover:bg-white/10"
                    >
                      {i.label}
                    </a>
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
          <div className="grid md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7">
              <h1 className="hero-heading text-4xl md:text-6xl font-black leading-[1.05] tracking-tight">
                Visual designer crafting <span className="text-[var(--brand-red)]">bold</span> brand systems.
              </h1>
              <p className="mt-5 text-white/70 max-w-xl">Simple, intentional, and not afraid to experiment.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#work" className="px-4 py-2 rounded-full bg-white text-black font-medium hover:contrast-125 transition">
                  View work
                </a>
                <a href="#contact" className="px-4 py-2 rounded-full border border-white/20 hover:border-white/40">
                  Get in touch
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/60">
                <span className="inline-flex items-center gap-2">
                  <PenTool className="w-4 h-4" /> Branding
                </span>
                <span className="inline-flex items-center gap-2">
                  <Megaphone className="w-4 h-4" /> Marketing
                </span>
                <span className="inline-flex items-center gap-2">
                  <Cpu className="w-4 h-4" /> Strategy
                </span>
                <span className="inline-flex items-center gap-2">
                  <Camera className="w-4 h-4" /> Art Direction
                </span>
              </div>
            </div>
            <div className="md:col-span-5 relative">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                <HeadshotCard />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <main id="content">
        <section id="work" className="relative">
          <div className="max-w-7xl mx-auto px-4 py-14 md:py-24">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-2xl md:text-4xl font-black tracking-tight">Selected Work</h2>
              <Link to="/projects" className="inline-flex items-center gap-2 text-white/70 hover:text-white">
                See all <ArrowUpRight className="w-4 h-4" />
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
            <aside className="md:col-span-5 space-y-4">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowPosters((prev) => !prev)}
                  aria-pressed={showPosters}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-sm uppercase tracking-[0.18em] transition"
                >
                  {showPosters ? "Hide posters" : "Show posters"}
                </button>
              </div>
              {showPosters ? (
                <PosterSpotlight posters={POSTER_IMAGES} />
              ) : (
                <ul className="grid grid-cols-2 gap-4 text-sm">
                  {[
                    { k: "Years", v: "5+" },
                    { k: "Awards", v: "Graphis Gold + 6x Silver" },
                    { k: "Focus", v: "Brand, Product, Strategy" },
                    { k: "Tools", v: "Figma, ID, PS/AI" },
                  ].map((stat) => (
                    <li key={stat.k} className="p-4 rounded-xl border border-white/10 bg-black/30">
                      <div className="text-white/50">{stat.k}</div>
                      <div className="text-lg font-semibold mt-1">{stat.v}</div>
                    </li>
                  ))}
                </ul>
              )}
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
                  <a href="#" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white/40">
                    <Github className="w-4 h-4" /> GitHub
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

const DISABLED_SLUGS = ["sydney-bound", "mntwire"];

export function ProjectCard({ project }) {
  const disabled = DISABLED_SLUGS.includes(project.slug);

  const cardContent = (
    <MotionDiv
      initial={{ opacity: 0.9 }}
      whileHover={disabled ? undefined : { scale: 1.015 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black/40"
    >
      <img
        src={project.cover}
        alt=""
        className={`w-full h-full object-cover transition ${disabled ? "opacity-40" : "opacity-90 group-hover:opacity-100"}`}
        loading="lazy"
        decoding="async"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
      />
      <div className={`card-hover-border ${disabled ? "card-hover-border--disabled" : ""}`} aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
        <div>
          <span className="inline-block text-xs tracking-wide uppercase text-white/70">{project.tag}</span>
          <h3 className="text-lg md:text-xl font-semibold leading-tight mt-1 max-w-xl">{project.title}</h3>
        </div>
        {!disabled && (
          <ArrowUpRight className="w-5 h-5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
        )}
      </div>
      {disabled && (
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

  return (
    <Link to={`/projects/${project.slug}`} className="block group" aria-label={project.title}>
      {cardContent}
    </Link>
  );
}

function HeadshotCard() {
  return (
    <div className="profile-card" aria-label="Portrait of Travis Crawford">
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
          <a
            href="https://www.instagram.com/traviscrawford.design"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a href="https://github.com/tcrawforddesign-coder" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github className="w-5 h-5" />
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


