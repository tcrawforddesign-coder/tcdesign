import { Link } from "react-router-dom";

import { getProjectCover, splitProjectTitle } from "./PortfolioCards.jsx";
import { PortfolioReveal } from "./PortfolioLayout.jsx";
import { WORK_SECTIONS } from "../../data/workSections.js";

export function PageHero({ title, copy }) {
  return (
    <section className="portfolio-hero portfolio-section portfolio-subpage-hero">
      <PortfolioReveal as="h1" className="portfolio-hero-title">
        {title}
        <span className="tc-dot">.</span>
      </PortfolioReveal>
      {copy ? (
        <PortfolioReveal as="p" className="portfolio-hero-copy">
          {copy}
        </PortfolioReveal>
      ) : null}
    </section>
  );
}

export function ProjectCardGrid({ items, label = "Projects" }) {
  return (
    <section className="portfolio-section portfolio-work-section" aria-label={label}>
      <div className="tc-project-grid">
        {items.map((project) => (
          <ProjectGridCard key={project.id ?? project.slug} project={project} />
        ))}
      </div>
    </section>
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

// Stacked rows linking to every part of the work. `current` is the path of the
// page it sits on, which is left out.
export function WorkIndex({ current, title = "More work" }) {
  const sections = WORK_SECTIONS.filter((section) => section.to !== current);

  return (
    <section className="portfolio-section tc-work-index" aria-labelledby="tc-work-index-title">
      <h2 id="tc-work-index-title" className="tc-h2">
        {title}
      </h2>
      <ul className="tc-work-rows">
        {sections.map((section) => (
          <li key={section.to}>
            <Link to={section.to} className={`tc-work-row ${section.soon ? "is-soon" : ""}`}>
              <span className="tc-work-row-label">{section.label}</span>
              <span className="tc-work-row-note">{section.note}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
