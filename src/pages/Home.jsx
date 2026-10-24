import { Link } from "react-router-dom";

import WaveField from "../brand/WaveField.jsx";
import { HeroParallax, Magnetic, ParallaxMedia, ScrollWords, ShowcaseReveal } from "../components/motion/ScrollMotion.jsx";
import {
  ContactSection,
  LINKEDIN_URL,
  PortfolioLayout,
  PortfolioReveal,
  RESUME_URL,
} from "../components/portfolio/PortfolioLayout.jsx";
import { getProjectCover, splitProjectTitle } from "../components/portfolio/PortfolioCards.jsx";
import { ProjectLabel } from "../components/portfolio/WorkPages.jsx";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import { projects } from "../data/projects.js";
import { posterProject } from "../data/posters.js";

const showcaseProject = projects.find((project) => project.slug === "atlas-coffee-club");
const selectedProjectSlugs = ["civil-goat-coffee", "barbican-refresh", "yellow-bike"];

const selectedProjects = [
  ...selectedProjectSlugs.map((slug) => projects.find((project) => project.slug === slug)).filter(Boolean),
  posterProject,
];

// Each service links to the work that proves it.
const services = [
  {
    title: "Brand identity",
    copy: "Logos, marks, color, type and the guidelines that keep them consistent everywhere they show up.",
    to: "/branding",
    proof: "See the branding work",
  },
  {
    title: "Campaigns and paid social",
    copy: "One clear idea carried through ads, social, email, events and print.",
    to: "/projects/atlas-coffee-club",
    proof: "See the Atlas Coffee Club ads",
  },
  {
    title: "Posters and motion",
    copy: "Posters, animated pieces and visual experiments for launches, events and social.",
    to: "/posters",
    proof: "See the poster archive",
  },
];

export default function Home() {
  return (
    <PortfolioLayout overlayHeader>
      <HeroParallax className="tc-wave-hero" aria-labelledby="tc-wave-hero-title" field={<WaveField />}>
        <div className="tc-wave-hero-copy portfolio-reveal">
          <h1 id="tc-wave-hero-title">
            Brands, campaigns and posters<span className="tc-dot">.</span>
          </h1>
          <p>I'm Travis Crawford, a visual designer and creative strategist in San Antonio, looking for a full-time design role. I also take on select freelance projects.</p>
          <div className="tc-actions">
            <Magnetic>
              <a href="#work" className="tc-btn tc-btn-ink tc-btn-lg">
                See the work
              </a>
            </Magnetic>
            <a href={RESUME_URL} className="tc-btn tc-btn-ghost tc-btn-lg" target="_blank" rel="noreferrer">
              Download resume
            </a>
          </div>
        </div>
      </HeroParallax>

      <ShowcaseReveal
        project="Atlas Coffee Club"
        label={showcaseProject?.tag ?? "Paid social ads"}
        image="/images/atlas-showcase.jpg"
        alt="Atlas+ static ads fanned in an arc: Blends with Benefits, Replace Your Supplement Stack, Replace Your Latte and more"
        to="/projects/atlas-coffee-club"
      />

      <section className="tc-statement" aria-label="How I work">
        <div className="tc-container">
          <ScrollWords
            className="tc-statement-text"
            text="Strategy first, then the visuals. Every brand I build starts with what it needs to say and who needs to hear it, so the logo, the posters and the ads all pull in the same direction."
          />
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
                <Link to={service.to} className="tc-text-link tc-service-link">
                  {service.proof}
                </Link>
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

  return (
    <section id="work" className="tc-selected" aria-labelledby="tc-selected-title">
      <div className="tc-container">
        <div className="tc-selected-head">
          <h2 id="tc-selected-title" className="tc-h2">
            Selected work
          </h2>
          <Link to="/projects" className="tc-text-link">
            All featured work
          </Link>
        </div>
        <div className="tc-work-grid">
          {selectedProjects.map((project) => (
            <WorkCard key={project.id ?? project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({ project }) {
  const title = splitProjectTitle(project.title).primary;
  const cover = getProjectCover(project);
  const isVideo = project.coverType === "video" || /\.mp4$/i.test(cover ?? "");
  const reduceMotion = usePrefersReducedMotion();

  return (
    <Link className="tc-work-card portfolio-reveal" to={project.href ?? `/projects/${project.slug}`}>
      <ParallaxMedia className="tc-work-media">
        {isVideo ? (
          <video src={cover} autoPlay={!reduceMotion} muted loop playsInline preload="metadata" aria-hidden="true" />
        ) : (
          <img src={cover} alt="" loading="lazy" decoding="async" />
        )}
      </ParallaxMedia>
      <div className="tc-work-meta">
        <h3>{title}</h3>
        <ProjectLabel project={project} />
      </div>
    </Link>
  );
}
