import { ContactSection, Marquee, PortfolioLayout, PortfolioReveal, SectionHeading } from "../components/portfolio/PortfolioLayout.jsx";
import { ProjectDataCard } from "../components/portfolio/PortfolioCards.jsx";
import { projects } from "../data/projects.js";
import { posterProject } from "../data/posters.js";

const TOP_PROJECT_SLUG = "3sixty-integrated-marketing";
const PRIORITY_SLUGS = ["data-dog-analytics"];

const topProject = projects.find((project) => project.slug === TOP_PROJECT_SLUG);

const orderedProjects = [
  topProject,
  posterProject,
  ...PRIORITY_SLUGS.map((slug) => projects.find((project) => project.slug === slug)).filter(Boolean),
  ...projects.filter((project) => project.slug !== TOP_PROJECT_SLUG && !PRIORITY_SLUGS.includes(project.slug)),
].filter(Boolean);

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
        <div className="portfolio-project-grid">
          {orderedProjects.map((project) => (
            <ProjectDataCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <ContactSection />
    </PortfolioLayout>
  );
}
