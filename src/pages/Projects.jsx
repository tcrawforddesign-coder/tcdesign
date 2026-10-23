import { Link } from "react-router-dom";

import { ContactSection, PortfolioLayout, PortfolioReveal } from "../components/portfolio/PortfolioLayout.jsx";
import { getProjectCover, splitProjectTitle } from "../components/portfolio/PortfolioCards.jsx";
import { projects } from "../data/projects.js";
import { posterProject } from "../data/posters.js";

// Strongest finished case studies first, archives last.
const PROJECT_ORDER = [
  "civil-goat-coffee",
  "barbican-refresh",
  "yellow-bike",
  "atlas-coffee-club",
  "3sixty-integrated-marketing",
  "ritual-coffee",
  "data-dog-analytics",
];
const HIDDEN_PROJECT_SLUGS = ["aluma-skincare"];

const experimentsProject = {
  id: "experiments-archive",
  slug: "experiments",
  title: "Experiments & Abandoned Projects",
  tag: "One-offs, motion, visual studies",
  href: "/experiments",
  cover: "/images/experiments/comp-1-3.mp4",
  coverType: "video",
};

const orderedProjects = [
  ...PROJECT_ORDER.map((slug) => projects.find((project) => project.slug === slug)),
  ...projects.filter((project) => !PROJECT_ORDER.includes(project.slug)),
  posterProject,
  experimentsProject,
].filter((project) => project && !HIDDEN_PROJECT_SLUGS.includes(project.slug));

export default function ProjectsPage() {
  return (
    <PortfolioLayout>
      <section className="portfolio-hero portfolio-section portfolio-subpage-hero">
        <PortfolioReveal as="h1" className="portfolio-hero-title">
          Work, 2022–2026<span className="tc-dot">.</span>
        </PortfolioReveal>
        <PortfolioReveal as="p" className="portfolio-hero-copy">
          Brand identities, ad campaigns, an app concept, in-house marketing, and a poster archive.
        </PortfolioReveal>
      </section>

      <section className="portfolio-section portfolio-work-section" aria-label="Projects">
        <div className="tc-project-grid">
          {orderedProjects.map((project) => (
            <ProjectGridCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <ContactSection />
    </PortfolioLayout>
  );
}

function ProjectGridCard({ project }) {
  const title = splitProjectTitle(project.title).primary;
  const cover = getProjectCover(project);
  const isVideo = project.coverType === "video" || /\.mp4$/i.test(cover ?? "");

  return (
    <Link className={`tc-project-card tc-project-card-${project.slug} portfolio-reveal`} to={project.href ?? `/projects/${project.slug}`}>
      <div className="tc-project-thumb">
        {isVideo ? (
          <video src={cover} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
        ) : (
          <img src={cover} alt="" loading="lazy" decoding="async" />
        )}
      </div>
      <div className="tc-project-meta">
        <h3>{title}</h3>
        <p>{project.tag}</p>
      </div>
    </Link>
  );
}
