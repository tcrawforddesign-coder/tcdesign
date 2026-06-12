import { ContactSection, Marquee, PortfolioLayout, PortfolioReveal, SectionHeading } from "../components/portfolio/PortfolioLayout.jsx";
import { PortfolioProjectCarousel, ProjectDataCard } from "../components/portfolio/PortfolioCards.jsx";
import { projects } from "../data/projects.js";
import { posterProject } from "../data/posters.js";

const FEATURED_PROJECT_SLUGS = ["atlas-coffee-club", "civil-goat-coffee"];
const TOP_PROJECT_SLUG = "3sixty-integrated-marketing";
const PRIORITY_SLUGS = ["data-dog-analytics"];

const topProject = projects.find((project) => project.slug === TOP_PROJECT_SLUG);
const homepageProjects = [
  ...FEATURED_PROJECT_SLUGS.map((slug) => projects.find((project) => project.slug === slug)).filter(Boolean),
  topProject,
  posterProject,
  ...PRIORITY_SLUGS.map((slug) => projects.find((project) => project.slug === slug)).filter(Boolean),
  ...projects.filter(
    (project) => !FEATURED_PROJECT_SLUGS.includes(project.slug) && project.slug !== TOP_PROJECT_SLUG && !PRIORITY_SLUGS.includes(project.slug),
  ),
].filter(Boolean);

export default function Home() {
  return (
    <PortfolioLayout>
      <section className="portfolio-hero portfolio-section">
        <PortfolioReveal className="portfolio-hero-kicker">Portfolio / Brand / Campaign / Poster</PortfolioReveal>
        <PortfolioReveal as="h1" className="portfolio-hero-title">
          Clean visual systems for brands, campaigns, and paid social creative.
        </PortfolioReveal>
        <PortfolioReveal as="p" className="portfolio-hero-copy">
          Travis Crawford is a Texas-based multidisciplinary designer creating polished campaign visuals,
          paid Meta ads, brand systems, and poster-led design work with clarity, rhythm, and intention.
        </PortfolioReveal>
        <PortfolioReveal className="portfolio-hero-actions">
          <a href="#work" className="portfolio-button portfolio-primary">View Work</a>
          <a href="#about" className="portfolio-button portfolio-secondary">About Travis</a>
        </PortfolioReveal>
      </section>

      <Marquee />

      <section id="work" className="portfolio-section portfolio-work-section">
        <SectionHeading eyebrow="Projects" title="Brand systems, campaign visuals, product concepts, and visual experiments." />
        <PortfolioProjectCarousel label="Projects">
          {homepageProjects.map((project) => (
            <ProjectDataCard key={project.id} project={project} />
          ))}
        </PortfolioProjectCarousel>
      </section>

      <section id="paid-social" className="portfolio-section portfolio-split-section">
        <PortfolioReveal className="portfolio-sticky-label">
          <p>Paid Social Creative</p>
        </PortfolioReveal>
        <PortfolioReveal className="portfolio-split-content">
          <h2>Designed for quick attention, clear hierarchy, and platform-first performance.</h2>
          <p>
            My paid Meta ad work focuses on making a message easy to understand in seconds. I build static ad systems with strong visual hooks,
            clean typography, flexible layouts, and enough variation to support testing without losing brand consistency.
          </p>
          <div className="portfolio-mini-grid">
            <span>Static Ads</span>
            <span>Campaign Concepts</span>
            <span>Hook Testing</span>
            <span>Visual Variations</span>
          </div>
        </PortfolioReveal>
      </section>

      <section className="portfolio-section portfolio-large-type-section">
        <PortfolioReveal as="h2">Clarity first. Then rhythm, tension, and a little visual bite.</PortfolioReveal>
      </section>

      <section id="posters" className="portfolio-section portfolio-split-section portfolio-alt">
        <PortfolioReveal className="portfolio-sticky-label">
          <p>Poster Work</p>
        </PortfolioReveal>
        <PortfolioReveal className="portfolio-split-content">
          <h2>Where typography, composition, and mood get more expressive.</h2>
          <p>
            Posters are where I push scale, contrast, and visual rhythm. They give the portfolio a sharper edge and show how I think through
            hierarchy, atmosphere, and composition in a single frame.
          </p>
        </PortfolioReveal>
      </section>

      <section id="about" className="portfolio-section portfolio-about-section">
        <PortfolioReveal className="portfolio-about-copy">
          <p>About</p>
          <h2>I’m Travis Crawford, a Texas-based designer who cares about culture, clarity, and the small details that make something feel considered.</h2>
        </PortfolioReveal>
        <PortfolioReveal className="portfolio-about-text">
          <p>
            I’m drawn to design because it gives me a way to organize ideas, build a point of view, and make things feel more human. I like work that has
            structure, but still leaves room for personality, rhythm, and a little tension.
          </p>
          <p>
            Outside of the final visuals, I care about the process: asking better questions, paying attention to how people read and react, and finding the
            details that can turn a simple idea into something memorable.
          </p>
        </PortfolioReveal>
      </section>

      <ContactSection />
    </PortfolioLayout>
  );
}
