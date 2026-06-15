import { ContactSection, Marquee, PortfolioLayout, PortfolioReveal, SectionHeading } from "../components/portfolio/PortfolioLayout.jsx";
import { getProjectCover, splitProjectTitle } from "../components/portfolio/PortfolioCards.jsx";
import { projects } from "../data/projects.js";
import { posterProject } from "../data/posters.js";

const TOP_PROJECT_SLUG = "3sixty-integrated-marketing";
const PRIORITY_SLUGS = ["data-dog-analytics"];
const HIDDEN_PROJECT_SLUGS = ["aluma-skincare"];

const topProject = projects.find((project) => project.slug === TOP_PROJECT_SLUG);
const experimentsProject = {
  id: "experiments-archive",
  slug: "experiments",
  title: "Experiments & Abandoned Projects",
  tag: "One-offs, Motion, Visual Studies",
  href: "/experiments",
  cover: "/images/experiments/comp-1-3.mp4",
  coverType: "video",
};

const orderedProjects = [
  posterProject,
  experimentsProject,
  ...PRIORITY_SLUGS.map((slug) => projects.find((project) => project.slug === slug)).filter(Boolean),
  ...projects.filter((project) => project.slug !== TOP_PROJECT_SLUG && !PRIORITY_SLUGS.includes(project.slug)),
  topProject,
].filter((project) => project && !HIDDEN_PROJECT_SLUGS.includes(project.slug));

export default function ProjectsPage() {
  return (
    <PortfolioLayout>
      <section className="portfolio-hero portfolio-section portfolio-subpage-hero">
        <PortfolioReveal className="portfolio-hero-kicker">Selected Work / Portfolio Archive</PortfolioReveal>
        <PortfolioReveal as="h1" className="portfolio-hero-title">
          A focused mix of paid ads, identity systems, and poster-driven design.
        </PortfolioReveal>
        <PortfolioReveal as="p" className="portfolio-hero-copy">
          Clean visual systems for brands, campaigns, and paid social creative.
        </PortfolioReveal>
      </section>

      <Marquee />

      <section className="portfolio-section portfolio-work-section">
        <SectionHeading eyebrow="Projects" title="Brand systems, campaign visuals, product concepts, and visual experiments." />
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

  return (
    <a className={`tc-project-card tc-project-card-${project.slug} portfolio-reveal`} href={project.href ?? `/projects/${project.slug}`}>
      <div className="tc-project-thumb">
        {project.coverType === "video" ? (
          <video src={getProjectCover(project)} autoPlay muted loop playsInline preload="metadata" />
        ) : (
          <img src={getProjectCover(project)} alt="" loading="lazy" decoding="async" />
        )}
      </div>
      <div className="tc-project-meta">
        <div>
          <h3>{title}</h3>
          <p>{project.tag}</p>
        </div>
        <span aria-hidden="true">→</span>
      </div>
    </a>
  );
}
