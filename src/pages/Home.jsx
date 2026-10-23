import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import WaveField from "../brand/WaveField.jsx";
import {
  ContactSection,
  LINKEDIN_URL,
  PortfolioLayout,
  PortfolioReveal,
  RESUME_URL,
} from "../components/portfolio/PortfolioLayout.jsx";
import { getProjectCover, splitProjectTitle } from "../components/portfolio/PortfolioCards.jsx";
import { projects } from "../data/projects.js";
import { posterProject } from "../data/posters.js";

const selectedProjectSlugs = ["civil-goat-coffee", "barbican-refresh", "yellow-bike", "atlas-coffee-club"];

const experimentsProject = {
  id: "experiments-archive",
  slug: "experiments",
  title: "Experiments & Abandoned Projects",
  tag: "One-offs, motion, visual studies",
  href: "/experiments",
  cover: "/images/experiments/comp-1-3.mp4",
  coverType: "video",
};

const selectedProjects = [
  ...selectedProjectSlugs.map((slug) => projects.find((project) => project.slug === slug)).filter(Boolean),
  experimentsProject,
  posterProject,
];

const projectCategories = {
  "civil-goat-coffee": "Brand identity",
  "barbican-refresh": "Concept refresh, wayfinding",
  "yellow-bike": "UX/UI design",
  "atlas-coffee-club": "Paid social campaign",
  experiments: "One-offs and motion",
  "poster-archive": "Poster series",
};

const services = [
  {
    title: "Brand identity",
    copy: "Logos, marks, color, type and the guidelines that keep them consistent everywhere they show up.",
  },
  {
    title: "Campaigns and paid social",
    copy: "One clear idea carried through ads, social, email, events and print.",
  },
  {
    title: "Websites and motion",
    copy: "Sites, interactive moments and creative code that make a brand feel alive.",
  },
];

export default function Home() {
  return (
    <PortfolioLayout overlayHeader>
      <section className="tc-wave-hero" aria-labelledby="tc-wave-hero-title">
        <WaveField />
        <div className="tc-wave-hero-inner">
          <div className="tc-wave-hero-card tc-glass portfolio-reveal">
            <h1 id="tc-wave-hero-title">
              Brands, campaigns and websites<span className="tc-dot">.</span>
            </h1>
            <p>From first sketch to launch. I'm Travis Crawford, a visual designer and creative strategist in Texas, and I take on freelance projects.</p>
            <div className="tc-actions">
              <a href="#work" className="tc-btn tc-btn-ink tc-btn-lg">
                See the work
              </a>
              <a href="#contact" className="tc-btn tc-btn-ghost tc-btn-lg">
                Start a project
              </a>
            </div>
          </div>
        </div>
      </section>

      <SelectedWork />

      <section id="about" className="tc-container tc-bio" aria-labelledby="tc-about-title">
        <PortfolioReveal className="tc-bio-photo">
          <picture>
            <source srcSet="/brand/travis-headshot.webp" type="image/webp" />
            <img src="/brand/travis-headshot.jpg" alt="Travis Crawford smiling, in a blue striped shirt" width="1200" height="1200" loading="lazy" decoding="async" />
          </picture>
          <span className="tc-bio-point" aria-hidden="true" />
        </PortfolioReveal>
        <PortfolioReveal className="tc-bio-copy">
          <h2 id="tc-about-title" className="tc-h2">
            Hi, I'm Travis<span className="tc-dot">.</span>
          </h2>
          <p className="tc-lede">I design identities, campaigns and websites that make ideas easy to understand and hard to forget.</p>
          <p className="tc-bio-text">
            By day I'm a creative marketing specialist at 3Sixty Integrated, where I turn technical security topics into emails, sales materials and social posts that are easy to follow. On my own, I take brands from the first logo sketch to the launch posts.
          </p>
          <div className="tc-bio-links">
            <a className="tc-text-link" href={RESUME_URL} target="_blank" rel="noreferrer">
              Resume (PDF)
            </a>
            <a className="tc-text-link" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </PortfolioReveal>
      </section>

      <section className="tc-services" aria-labelledby="tc-services-title">
        <div className="tc-container tc-services-inner">
          <h2 id="tc-services-title" className="tc-h2">
            What I make
          </h2>
          <div className="tc-service-list">
            {services.map((service) => (
              <PortfolioReveal key={service.title} className="tc-service">
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
              </PortfolioReveal>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </PortfolioLayout>
  );
}

function SelectedWork() {
  const stripRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const max = strip.scrollWidth - strip.clientWidth;
    setEdges({ start: strip.scrollLeft <= 4, end: strip.scrollLeft >= max - 4 });
  }, []);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return undefined;
    updateEdges();
    strip.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      strip.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const scrollByCard = (direction) => {
    const strip = stripRef.current;
    const card = strip?.querySelector(".tc-strip-card");
    if (!strip || !card) return;
    const gap = parseFloat(getComputedStyle(strip).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    strip.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section id="work" className="tc-selected" aria-labelledby="tc-selected-title">
      <div className="tc-container tc-selected-head">
        <h2 id="tc-selected-title" className="tc-h2">
          Selected work
        </h2>
        <div className="tc-selected-tools">
          <div className="tc-strip-controls">
            <button type="button" className="tc-strip-button" aria-label="Previous projects" aria-controls="tc-strip" disabled={edges.start} onClick={() => scrollByCard(-1)}>
              <ChevronLeft aria-hidden="true" />
            </button>
            <button type="button" className="tc-strip-button" aria-label="Next projects" aria-controls="tc-strip" disabled={edges.end} onClick={() => scrollByCard(1)}>
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
          <Link to="/projects" className="tc-text-link">
            All projects
          </Link>
        </div>
      </div>
      <div id="tc-strip" ref={stripRef} className="tc-strip" tabIndex={0} aria-label="Selected projects, scroll sideways">
        {selectedProjects.map((project) => (
          <StripCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

function StripCard({ project }) {
  const title = splitProjectTitle(project.title).primary;
  const category = projectCategories[project.slug] ?? project.tag;
  const cover = getProjectCover(project);
  const isVideo = project.coverType === "video" || /\.mp4$/i.test(cover ?? "");

  return (
    <Link className="tc-strip-card" to={project.href ?? `/projects/${project.slug}`}>
      <div className="tc-strip-media">
        {isVideo ? (
          <video src={cover} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
        ) : (
          <img src={cover} alt="" loading="lazy" decoding="async" />
        )}
      </div>
      <div className="tc-strip-meta">
        <h3>{title}</h3>
        <p>{category}</p>
      </div>
    </Link>
  );
}
