import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github, Instagram, Linkedin, Mail, Menu, X, Megaphone, Camera, PenTool, Cpu } from "lucide-react";

import { projects } from "../data/projects.js";

const HEADSHOT = "/images/headshot.jpg";
const BRAND = { red: "#ff1a1a", black: "#0a0a0a" };
const MotionDiv = motion.div;

const FEATURED_SLUGS = ["civil-goat-coffee", "aluma-skincare", "barbican-refresh", "data-dog-analytics"];
const FEATURED_COL_SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];
const featuredProjects = FEATURED_SLUGS.map((slug) => projects.find((project) => project.slug === slug)).filter(Boolean);

export default function Home() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--brand-red", BRAND.red);
    root.style.setProperty("--brand-black", BRAND.black);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white antialiased selection:bg-white selection:text-black">
      <MotionDiv style={{ width }} className="fixed top-0 left-0 h-[3px] bg-[var(--brand-red)] z-50" aria-hidden />

      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <a href="#home" className="font-black tracking-tight text-lg md:text-xl">
              <span className="px-2 py-1 bg-white text-black">TC</span>
              <span className="ml-2 text-white/80">DESIGN</span>
            </a>

            <nav aria-label="Primary" className="hidden md:flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
              {["Work", "About", "Contact"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="px-4 py-2 rounded-full border border-white/15 hover:border-white/40 transition backdrop-blur bg-white/5 hover:bg-white/10">
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a href="#contact" className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[var(--brand-red)] text-black font-medium hover:contrast-125 transition">
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
        <div className="max-w-7xl mx-auto px-4 pt-20 pb-14 md:pt-28 md:pb-24">
          <div className="grid md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7">
              <h1 className="text-4xl md:text-6xl font-black leading-[1.05] tracking-tight">
                Visual designer crafting <span className="text-[var(--brand-red)]">bold</span> brand systems & interfaces.
              </h1>
              <p className="mt-5 text-white/70 max-w-xl">
                Brutalist taste. Human-friendly UX. Experimental, but never at the expense of clarity.
              </p>
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
        <Marquee />
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
                "repeating-linear-gradient(0deg, rgba(255,255,255,.12) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(255,26,26,.10) 0 2px, transparent 2px 6px)",
            }}
          />
          <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7">
              <h2 className="text-2xl md:text-4xl font-black tracking-tight">About</h2>
              <p className="mt-4 text-white/70 leading-relaxed max-w-2xl">
                I design brand identities and digital experiences that feel inevitable — the kind you can’t imagine any other
                way. My process blends research, typographic rigor, and adventurous visual systems.
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
            <ul className="md:col-span-5 grid grid-cols-2 gap-4 text-sm">
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
    <div
      className="profile-card"
      style={{ backgroundImage: `url(${HEADSHOT})` }}
      aria-label="Portrait of Travis Crawford"
    >
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
            background: `radial-gradient(400px 200px at calc(50% + ${pos.x / 10}px) calc(50% + ${pos.y / 10}px), rgba(255,26,26,.25), transparent 60%)`,
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

function Marquee() {
  return (
    <div className="border-y border-white/10 bg-[#0d0d0d] whitespace-nowrap overflow-hidden">
      <div className="[animation:marquee_18s_linear_infinite] py-3">
        {Array.from({ length: 12 }).map((_, index) => (
          <span key={index} className="mx-6 inline-flex items-center gap-2 text-white/60">
            <span className="w-2 h-2 rounded-full bg-[var(--brand-red)] inline-block" />
            Brand identity systems • Marketing strategy • Campaign concepts • Content design • Design systems • Web prototypes
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}

