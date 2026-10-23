import { Link } from "react-router-dom";

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

const selectedProjects = [
  ...selectedProjectSlugs.map((slug) => projects.find((project) => project.slug === slug)).filter(Boolean),
  posterProject,
];

const projectCategories = {
  "civil-goat-coffee": "Brand identity",
  "barbican-refresh": "Concept refresh, wayfinding",
  "yellow-bike": "UX/UI design",
  "atlas-coffee-club": "Paid social campaign",
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
    title: "Posters and motion",
    copy: "Posters, animated pieces and visual experiments for launches, events and social.",
  },
];

export default function Home() {
  return (
    <PortfolioLayout overlayHeader>
      <section className="tc-wave-hero" aria-labelledby="tc-wave-hero-title">
        <WaveField />
        <div className="tc-wave-hero-inner">
          <div className="tc-wave-hero-copy portfolio-reveal">
            <h1 id="tc-wave-hero-title">
              Brands, campaigns and posters<span className="tc-dot">.</span>
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
          <p className="tc-lede">I design identities, campaigns and posters that make ideas easy to understand and hard to forget.</p>
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
  const [feature, ...rest] = selectedProjects;

  return (
    <section id="work" className="tc-selected" aria-labelledby="tc-selected-title">
      <div className="tc-container">
        <div className="tc-selected-head">
          <h2 id="tc-selected-title" className="tc-h2">
            Selected work
          </h2>
          <Link to="/projects" className="tc-text-link">
            All projects
          </Link>
        </div>
        <div className="tc-work-grid">
          <WorkCard project={feature} featured />
          {rest.map((project) => (
            <WorkCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({ project, featured = false }) {
  const title = splitProjectTitle(project.title).primary;
  const category = projectCategories[project.slug] ?? project.tag;
  const cover = featured && project.heroImage ? project.heroImage : getProjectCover(project);
  const isVideo = project.coverType === "video" || /\.mp4$/i.test(cover ?? "");

  return (
    <Link className={`tc-work-card ${featured ? "is-featured" : ""}`} to={project.href ?? `/projects/${project.slug}`}>
      <div className="tc-work-media">
        {isVideo ? (
          <video src={cover} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
        ) : (
          <img src={cover} alt="" loading={featured ? "eager" : "lazy"} decoding="async" />
        )}
      </div>
      <div className="tc-work-meta">
        <h3>{title}</h3>
        <p>{category}</p>
      </div>
    </Link>
  );
}
