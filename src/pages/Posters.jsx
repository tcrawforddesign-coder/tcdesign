import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Github, Linkedin, Mail, Menu, Sparkles, X } from "lucide-react";

import PosterGallery from "../components/PosterGallery.jsx";
import { posterEntries, posterProject } from "../data/posters.js";

const NAV_LINKS = [
  { label: "Work", to: { pathname: "/", hash: "#work" } },
  { label: "Projects", to: "/projects" },
  { label: "Posters", to: "/posters" },
  { label: "About", to: { pathname: "/", hash: "#about" } },
  { label: "Contact", to: { pathname: "/", hash: "#contact" } },
];

const FILTER_TABS = [
  { label: "All", value: "all" },
  { label: "Color", value: "color" },
  { label: "Monochrome", value: "mono" },
];

const PILLARS = [
  {
    title: "Typographic Systems",
    copy: "Exploring condensed, mono, and variable families to stress-test hierarchy before committing to brand guidelines.",
  },
  {
    title: "Print-to-Digital Bridges",
    copy: "Testing layouts that adapt cleanly from large format posters to carousels and landing pages without losing hierarchy.",
  },
  {
    title: "Texture & Light",
    copy: "From halftone grit to liquid chrome, each study experiments with material cues that later inform packaging and hero art.",
  },
];

export default function PostersPage() {
  const [open, setOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const filterCounts = useMemo(
    () => ({
      all: posterEntries.length,
      color: posterEntries.filter((poster) => poster.colorMode === "color").length,
      mono: posterEntries.filter((poster) => poster.colorMode === "mono").length,
    }),
    [],
  );

  const filteredPosters = useMemo(() => {
    if (activeFilter === "all") return posterEntries;
    return posterEntries.filter((poster) => poster.colorMode === activeFilter);
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono">
      <header className="sticky top-0 z-40 border-b-2 border-white bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <Link to="/" className="font-display font-extrabold tracking-tighter text-lg md:text-xl uppercase">
              <span>Travis Crawford</span>
            </Link>

            <nav aria-label="Primary" className="hidden md:flex items-center gap-0 absolute left-1/2 -translate-x-1/2 divide-x divide-white/20 border border-white/25">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`px-4 py-3 text-[10px] font-bold uppercase tracking-[0.28em] transition-colors ${
                    item.label === "Posters" ? "bg-white text-black" : "text-white/85 hover:bg-white hover:text-black"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                to={{ pathname: "/", hash: "#contact" }}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 border-2 border-white bg-white text-black text-[10px] font-bold uppercase tracking-[0.22em] hover:bg-transparent hover:text-white transition-colors"
              >
                <ArrowUpRight className="w-4 h-4" /> Contact
              </Link>
              <button
                type="button"
                className="md:hidden p-2.5 border-2 border-white/30 hover:bg-white/10"
                aria-label="Open menu"
                onClick={() => setOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div role="dialog" aria-modal className="fixed inset-0 z-50 bg-black border-2 border-white">
            <div className="absolute top-4 right-4">
              <button
                type="button"
                className="p-2.5 border-2 border-white hover:bg-white hover:text-black"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="min-h-full grid place-items-center px-6">
              <ul className="space-y-4 text-center w-full max-w-sm">
                {NAV_LINKS.map((item) => (
                  <li key={item.label} className="border border-white/25">
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={`block py-4 text-sm font-bold uppercase tracking-[0.35em] transition-colors ${
                        item.label === "Posters" ? "bg-white text-black" : "hover:bg-white hover:text-black"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 lg:px-10 py-16 md:py-24 space-y-20">
        <section className="grid md:grid-cols-12 gap-10 md:gap-12 items-start">
          <div className="md:col-span-7 space-y-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.45em] text-white/45">Poster Archive</p>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-[0.95] tracking-tighter uppercase">
              {posterProject.spotlight.headline}
            </h1>
            <p className="text-white/70 leading-relaxed max-w-3xl">{posterProject.summary}</p>
            <div className="space-y-4 text-white/70 leading-relaxed max-w-3xl">
              {posterProject.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              {posterProject.roles.map((role) => (
                <span key={role} className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] border border-white/25 bg-black">
                  {role}
                </span>
              ))}
              {posterProject.tools.map((tool) => (
                <span key={tool} className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] border border-white/25 bg-black">
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <aside className="md:col-span-5 space-y-5">
            <div className="border-2 border-white/20 bg-black p-6 md:p-7 space-y-4 shadow-brut-sm">
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.35em] text-white/45">
                <Sparkles className="w-4 h-4 text-white/70" />
                Personal Lab
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{posterProject.spotlight.copy}</p>
            </div>
            <div className="border-2 border-white/15 bg-black p-6 md:p-7">
              <h2 className="font-display text-lg font-bold tracking-tight uppercase text-white">Why posters?</h2>
              <p className="mt-3 text-sm text-white/65 leading-relaxed">
                Client work thrives on clarity. Posters give me permission to move fast, remix palettes, and stress-test type before rolling the ideas into
                product or campaign systems.
              </p>
            </div>
          </aside>
        </section>

        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-white/50">Filter the archive</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">Curate by color energy</h2>
            </div>
            <div className="inline-flex items-stretch border-2 border-white/25 bg-black">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveFilter(tab.value)}
                  className={`px-4 py-3 text-[10px] font-bold uppercase tracking-[0.28em] border-l border-white/20 first:border-l-0 transition-colors ${
                    activeFilter === tab.value ? "bg-white text-black" : "text-white/55 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {tab.label} <span className="ml-1 text-white/40">({filterCounts[tab.value]})</span>
                </button>
              ))}
            </div>
          </div>

          <PosterGallery posters={filteredPosters} variant="expanded" />
        </section>

        <section>
          <div className="text-[11px] uppercase tracking-[0.4em] text-white/50 mb-4">What I track</div>
          <div className="grid md:grid-cols-3 gap-4">
            {PILLARS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-black/35 p-6 md:p-7">
                <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm text-white/65 leading-relaxed">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/30 p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-white/50">Need this energy in your launch?</p>
            <h2 className="mt-3 text-2xl md:text-3xl font-black tracking-tight">Let’s bend these experiments into your campaign.</h2>
            <p className="mt-3 text-white/65 max-w-xl">
              Share a brief or a mood board. I’ll respond with how this poster lab translates into brand systems, product UI, or launch storytelling.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:tcrawford.design@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white text-black font-medium hover:contrast-125 transition"
            >
              <Mail className="w-4 h-4" /> Email Travis
            </a>
            <Link
              to={{ pathname: "/", hash: "#contact" }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white/40 transition"
            >
              View contact options
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-10 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Travis Crawford — Poster Archive
        <div className="mt-3 flex justify-center gap-4 text-white/60">
          <a href="mailto:tcrawford.design@gmail.com" className="inline-flex items-center gap-2 hover:text-white">
            <Mail className="w-4 h-4" /> Email
          </a>
          <a href="https://www.linkedin.com/in/travis-crawford-67759b24a" className="inline-flex items-center gap-2 hover:text-white">
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}


