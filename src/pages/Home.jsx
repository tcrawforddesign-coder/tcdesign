import { Link } from "react-router-dom";

import WaveField from "../brand/WaveField.jsx";
import { ContactSection, PortfolioLayout, PortfolioReveal } from "../components/portfolio/PortfolioLayout.jsx";
import { getProjectCover, splitProjectTitle } from "../components/portfolio/PortfolioCards.jsx";
import { projects } from "../data/projects.js";
import { posterProject } from "../data/posters.js";

const selectedProjectSlugs = ["civil-goat-coffee", "barbican-refresh", "yellow-bike", "atlas-coffee-club"];

const experimentsProject = {
  id: "experiments-archive",
  slug: "experiments",
  title: "Experiments & Abandoned Projects",
  tag: "One-offs, Motion, Visual Studies",
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
  "civil-goat-coffee": "Branding, Identity",
  "barbican-refresh": "Brand Refresh, Wayfinding",
  "yellow-bike": "UX/UI, App Design",
  "atlas-coffee-club": "Paid Social, Campaign",
  experiments: "One-offs, Motion",
  "poster-archive": "Poster Series",
};

const services = [
  {
    title: "Brand identity",
    copy: "Logos, marks, color, type and the guidelines that keep them consistent everywhere they show up.",
  },
  {
    title: "Campaigns and paid social",
    copy: "One clear idea carried through ads, social, email, events and print, built to perform.",
  },
  {
    title: "Websites and motion",
    copy: "Sites, interactive moments and creative code that make a brand feel alive.",
  },
];

const skills = ["Brand Identity", "Campaign Design", "Art Direction", "Paid Social Ads", "Print & Digital", "Marketing Systems"];

export default function Home() {
  return (
    <PortfolioLayout overlayHeader>
      <section className="tc-wave-hero" aria-labelledby="tc-wave-hero-title">
        <WaveField />
        <div className="tc-wave-hero-inner">
          <div className="tc-wave-hero-card tc-glass portfolio-reveal">
            <h1 id="tc-wave-hero-title">
              Visual designer and creative strategist<span className="tc-dot">.</span>
            </h1>
            <p>Identity systems, campaigns and websites for brands that want to be remembered.</p>
            <div className="tc-actions">
              <a href="#work" className="tc-btn tc-btn-ink tc-btn-lg">
                View work
              </a>
              <a href="#contact" className="tc-btn tc-btn-ghost tc-btn-lg">
                Start a project
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="tc-selected" aria-labelledby="tc-selected-title">
        <div className="tc-container tc-selected-head">
          <h2 id="tc-selected-title" className="tc-h2">
            Selected work
          </h2>
          <Link to="/projects" className="tc-text-link">
            All projects
          </Link>
        </div>
        <div className="tc-strip" tabIndex={0} aria-label="Selected projects, scroll sideways">
          {selectedProjects.map((project) => (
            <StripCard key={project.id} project={project} />
          ))}
        </div>
      </section>

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
          <p className="tc-lede">
            I'm a designer based in Texas. I create identity systems, campaign visuals and brand experiences that help ideas feel clear, useful and memorable.
          </p>
          <ul className="tc-skills" aria-label="Skills">
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
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
