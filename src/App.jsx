import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Megaphone, Camera, PenTool, Cpu } from "lucide-react";

const BRAND = { red: "#ff1a1a", black: "#0a0a0a" };
const projects = [
  { id: 1, tag: "Brand Identity", title: "Civil Goat Coffee — Conversational Brand System", cover: "/images/civil-goat-01.jpg" },
  { id: 2, tag: "Destination Brand", title: "Sydney — Bound for Life's Adventure", cover: "/images/sydney-hero.jpg" },
  { id: 3, tag: "Cultural Space", title: "Barbican Centre — Minimal Brutal Refresh", cover: "/images/barbican-hero.jpg" },
  { id: 4, tag: "Tech / Concept", title: "Isolate — AI sample detective", cover: "/images/isolate-hero.jpg" },
];

export default function App() {
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
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:bg-white focus:text-black focus:px-3 focus:py-2 focus:rounded">Skip to content</a>
      <motion.div style={{ width }} className="fixed top-0 left-0 h-[3px] bg-[var(--brand-red)] z-50" aria-hidden />

      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <a href="#home" className="font-black tracking-tight text-lg md:text-xl">
              <span className="px-2 py-1 bg-white text-black">TC</span>
              <span className="ml-2 text-white/80">DESIGN</span>
            </a>
            <nav aria-label="Primary" className="hidden md:flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
              {["Work", "About", "Contact"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="px-4 py-2 rounded-full border border-white/15 hover:border-white/40 transition backdrop-blur bg-white/5 hover:bg-white/10">{item}</a>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <a href="#contact" className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[var(--brand-red)] text-black font-medium hover:contrast-125 transition">
                <ArrowUpRight className="w-4 h-4" /> Start a project
              </a>
              <button className="md:hidden p-2 rounded border border-white/15" aria-label="Open menu" onClick={() => setOpen(true)}>☰</button>
            </div>
          </div>
        </div>
        {open && (
          <div role="dialog" aria-modal className="fixed inset-0 z-50 bg-black/80">
            <div className="absolute top-4 right-4">
              <button className="p-2 rounded border border-white/15" onClick={() => setOpen(false)} aria-label="Close menu">✕</button>
            </div>
            <div className="min-h-full grid place-items-center">
              <ul className="space-y-6 text-center text-2xl">
                {[{label:"Work",href:"#work"},{label:"About",href:"#about"},{label:"Contact",href:"#contact"}].map(i=>(
                  <li key={i.label}><a href={i.href} onClick={()=>setOpen(false)} className="px-6 py-3 rounded-full border border-white/15 inline-block bg-white/5 hover:bg-white/10">{i.label}</a></li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </header>

      <section id="home" className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 pt-16 md:pt-24 pb-10 md:pb-16">
          <div className="grid md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7">
              <h1 className="text-4xl md:text-6xl font-black leading-[1.05] tracking-tight">
                Visual designer crafting <span className="text-[var(--brand-red)]">bold</span> brand systems & interfaces.
              </h1>
              <p className="mt-5 text-white/70 max-w-xl">Brutalist taste. Human-friendly UX. Experimental, but never at the expense of clarity.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#work" className="px-4 py-2 rounded-full bg-white text-black font-medium hover:contrast-125 transition">View work</a>
                <a href="#contact" className="px-4 py-2 rounded-full border border-white/20 hover:border-white/40">Get in touch</a>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/60">
                <span className="inline-flex items-center gap-2"><PenTool className="w-4 h-4"/> Branding</span>
                <span className="inline-flex items-center gap-2"><Megaphone className="w-4 h-4"/> Marketing</span>
                <span className="inline-flex items-center gap-2"><Cpu className="w-4 h-4"/> Strategy</span>
                <span className="inline-flex items-center gap-2"><Camera className="w-4 h-4"/> Art Direction</span>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                <img src="/images/headshot.jpg" alt="Travis Crawford headshot" className="w-full h-full object-cover" />
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
              <a href="#" className="inline-flex items-center gap-2 text-white/70 hover:text-white">See all <ArrowUpRight className="w-4 h-4" /></a>
            </div>
            <ul className="grid md:grid-cols-12 gap-6">
              {projects.map((p, i) => (
                <li key={p.id} className={`group md:col-span-${i % 3 === 0 ? 7 : 5} col-span-12`}>
                  <ProjectCard p={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <p>© {new Date().getFullYear()} TC Design</p>
          <div className="flex gap-4">
            <a href="#work" className="hover:text-white">Work</a>
            <a href="#about" className="hover:text-white">About</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProjectCard({ p }) {
  return (
    <a href="#" className="block group" aria-label={p.title}>
      <motion.div initial={{ opacity: 0.9 }} whileHover={{ scale: 1.015 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40">
        <img src={p.cover} alt="" className="aspect-[16/10] object-cover w-full opacity-90 group-hover:opacity-100 transition" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"/>
        <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
          <div>
            <span className="inline-block text-xs tracking-wide uppercase text-white/70">{p.tag}</span>
            <h3 className="text-lg md:text-xl font-semibold leading-tight mt-1 max-w-xl">{p.title}</h3>
          </div>
          <ArrowUpRight className="w-5 h-5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
        </div>
        <span className="absolute top-0 left-0 w-16 h-16 bg-[var(--brand-red)]/90 mix-blend-screen" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} aria-hidden />
      </motion.div>
    </a>
  );
}

function Marquee() {
  return (
    <div className="border-y border-white/10 bg-[#0d0d0d] whitespace-nowrap overflow-hidden">
      <div className="[animation:marquee_18s_linear_infinite] py-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="mx-6 inline-flex items-center gap-2 text-white/60">
            <span className="w-2 h-2 rounded-full bg-[var(--brand-red)] inline-block" />
            Brand identity systems • Marketing strategy • Campaign concepts • Content design • Design systems • Web prototypes
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}