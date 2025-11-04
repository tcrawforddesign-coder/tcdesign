import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Github, Linkedin, Mail, Menu, X } from "lucide-react";

import { projects } from "../data/projects.js";
import { ProjectCard } from "./Home.jsx";

const BRAND = { red: "#ff1a1a", black: "#0a0a0a" };

export default function ProjectsPage() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--brand-red", BRAND.red);
    root.style.setProperty("--brand-black", BRAND.black);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <Link to="/" className="font-black tracking-tight text-lg md:text-xl">
              <span className="px-2 py-1 bg-white text-black">TC</span>
              <span className="ml-2 text-white/80">DESIGN</span>
            </Link>

            <nav aria-label="Primary" className="hidden md:flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
              {[
                { label: "Work", to: { pathname: "/", hash: "#work" } },
                { label: "Projects", to: "/projects" },
                { label: "About", to: { pathname: "/", hash: "#about" } },
                { label: "Contact", to: { pathname: "/", hash: "#contact" } },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="px-4 py-2 rounded-full border border-white/15 hover:border-white/40 transition backdrop-blur bg-white/5 hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                to={{ pathname: "/", hash: "#contact" }}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[var(--brand-red)] text-black font-medium hover:contrast-125 transition"
              >
                <ArrowUpRight className="w-4 h-4" /> Contact
              </Link>
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
                  { label: "Work", to: { pathname: "/", hash: "#work" } },
                  { label: "Projects", to: "/projects" },
                  { label: "About", to: { pathname: "/", hash: "#about" } },
                  { label: "Contact", to: { pathname: "/", hash: "#contact" } },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="px-6 py-3 rounded-full border border-white/15 inline-block bg-white/5 hover:bg-white/10"
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

      <main className="max-w-7xl mx-auto px-4 lg:px-10 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-white/60">All Projects</p>
            <h1 className="mt-3 text-4xl md:text-5xl font-black tracking-tight">Extended Portfolio</h1>
            <p className="mt-4 max-w-2xl text-white/70">
              A deeper archive of visual systems, brand campaigns, and digital experiences spanning client launches, concept
              studies, and collaborations.
            </p>
          </div>
          <Link
            to={{ pathname: "/", hash: "#contact" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition"
          >
            Start a project <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <ul className="grid md:grid-cols-12 gap-6">
          {projects.map((project, index) => (
            <li
              key={project.id}
              className={`group col-span-12 ${index % 3 === 0 ? "md:col-span-7" : "md:col-span-5"}`}
            >
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </main>

      <footer className="border-t border-white/10 py-10 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Travis Crawford — Portfolio
        <div className="mt-3 flex justify-center gap-4 text-white/60">
          <a href="mailto:tcrawford.design@gmail.com" className="inline-flex items-center gap-2 hover:text-white">
            <Mail className="w-4 h-4" /> Email
          </a>
          <a href="#" className="inline-flex items-center gap-2 hover:text-white">
            <Github className="w-4 h-4" /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/travis-crawford-67759b24a" className="inline-flex items-center gap-2 hover:text-white">
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}
