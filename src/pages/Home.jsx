import { ContactSection, Marquee, PortfolioLayout, PortfolioReveal, SectionHeading } from "../components/portfolio/PortfolioLayout.jsx";
import { getProjectCover, PortfolioProjectCard } from "../components/portfolio/PortfolioCards.jsx";
import { projects } from "../data/projects.js";
import { posterProject } from "../data/posters.js";

const bySlug = (slug) => projects.find((project) => project.slug === slug);

export default function Home() {
  const atlas = bySlug("atlas-coffee-club");
  const civilGoat = bySlug("civil-goat-coffee");
  const barbican = bySlug("barbican-refresh");

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
        <SectionHeading eyebrow="Selected Work" title="A focused mix of paid ads, identity systems, and poster-driven design." />
        <div className="portfolio-project-grid">
          <PortfolioProjectCard
            project={atlas}
            eyebrow="Paid Meta Ads"
            year="2026"
            title={atlas?.title}
            copy="Performance-minded layouts with strong hooks, clean hierarchy, and visual consistency across campaign variations."
            image={getProjectCover(atlas)}
            imageClass="portfolio-image-one"
          />
          <PortfolioProjectCard
            project={civilGoat}
            eyebrow="Brand Identity"
            year="School Project"
            title={civilGoat?.title}
            copy="A conversational brand system using warmth, type, and approachable structure to create a memorable coffee identity."
            image={getProjectCover(civilGoat)}
            imageClass="portfolio-image-two"
          />
          <PortfolioProjectCard
            to="/posters"
            eyebrow="Poster Design"
            year="Series"
            title="Poster Archive"
            copy="Experimental compositions exploring contrast, pacing, negative space, and expressive type within a tight visual frame."
            image="/images/Poster_6.png"
            imageClass="portfolio-image-three"
          />
          <PortfolioProjectCard
            project={barbican}
            eyebrow="Cultural Space"
            year="Student Project"
            title={barbican?.title}
            copy="A student identity concept exploring cultural branding, brutalist influence, typography, and structured visual direction."
            image={getProjectCover(barbican)}
            imageClass="portfolio-image-four"
          />
        </div>
        <PortfolioReveal className="portfolio-section-action">
          <a href="/projects" className="portfolio-button portfolio-primary">View All Projects</a>
        </PortfolioReveal>
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
