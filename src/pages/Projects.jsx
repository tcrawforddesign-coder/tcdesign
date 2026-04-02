import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Github, Linkedin, Mail, Menu, X } from "lucide-react";

import { projects } from "../data/projects.js";
import { posterProject } from "../data/posters.js";
import { ProjectCard } from "./Home.jsx";

const PRIORITY_SLUGS = ["data-dog-analytics"];

const orderedProjects = [
  posterProject,
  ...PRIORITY_SLUGS.map((slug) => projects.find((project) => project.slug === slug)).filter(Boolean),
  ...projects.filter((project) => !PRIORITY_SLUGS.includes(project.slug)),
];
const spanForIndex = (index) => (Math.floor(index / 2) % 2 === 0 ? (index % 2 === 0 ? "md:col-span-7" : "md:col-span-5") : index % 2 === 0 ? "md:col-span-5" : "md:col-span-7");

export default function ProjectsPage() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono" id="top">
      <header className="sticky top-0 z-40 border-b-2 border-white bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <Link to="/" className="font-display font-extrabold tracking-tighter text-lg md:text-xl uppercase">
              Travis Crawford
            </Link>

            <nav aria-label="Primary" className="hidden md:flex items-center gap-0 absolute left-1/2 -translate-x-1/2 divide-x divide-white/20 border border-white/25">
              {[
                { label: "Work", to: { pathname: "/", hash: "#work" } },
                { label: "Projects", to: "/projects" },
                { label: "Posters", to: "/posters" },
                { label: "About", to: { pathname: "/", hash: "#about" } },
                { label: "Contact", to: { pathname: "/", hash: "#contact" } },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.28em] text-white/85 hover:bg-white hover:text-black transition-colors"
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
                {[
                  { label: "Work", to: { pathname: "/", hash: "#work" } },
                  { label: "Projects", to: "/projects" },
                  { label: "Posters", to: "/posters" },
                  { label: "About", to: { pathname: "/", hash: "#about" } },
                  { label: "Contact", to: { pathname: "/", hash: "#contact" } },
                ].map((item) => (
                  <li key={item.label} className="border border-white/25">
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="block py-4 text-sm font-bold uppercase tracking-[0.35em] hover:bg-white hover:text-black transition-colors"
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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 border-b-2 border-white/15 pb-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.45em] text-white/45">All Projects</p>
            <h1 className="font-display mt-3 text-4xl md:text-5xl font-extrabold tracking-tighter uppercase">Extended Portfolio</h1>
            <p className="mt-4 max-w-2xl text-sm text-white/65 leading-relaxed">
              A deeper archive of visual systems, brand campaigns, and digital experiences spanning client launches, concept
              studies, and collaborations.
            </p>
          </div>
          <Link
            to={{ pathname: "/", hash: "#contact" }}
            className="inline-flex items-center gap-2 px-5 py-3 border-2 border-white bg-white text-black text-[10px] font-bold uppercase tracking-[0.28em] hover:bg-transparent hover:text-white transition-colors shadow-brut-sm"
          >
            Start a project <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <ul className="grid md:grid-cols-12 gap-6">
          {orderedProjects.map((project, index) => (
            <li
              key={project.id}
              className={`group col-span-12 ${spanForIndex(index)}`}
            >
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </main>

      <footer className="border-t border-white/10 py-10 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Travis Crawford — Portfolio
        <div className="mt-3 flex justify-center gap-4 text-white/60">
          <Link to={{ pathname: "/", hash: "#contact" }} className="inline-flex items-center gap-2 hover:text-white">
            <Mail className="w-4 h-4" /> Email
          </Link>
          <a href="https://www.linkedin.com/in/travis-crawford-67759b24a" className="inline-flex items-center gap-2 hover:text-white">
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}
