import { Marquee, PortfolioLayout, PortfolioReveal, SectionHeading } from "../components/portfolio/PortfolioLayout.jsx";
import { getProjectCover, splitProjectTitle } from "../components/portfolio/PortfolioCards.jsx";
import { projects } from "../data/projects.js";
import { posterProject } from "../data/posters.js";

const selectedProjectSlugs = [
  "civil-goat-coffee",
  "barbican-refresh",
  "yellow-bike",
  "atlas-coffee-club",
];

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
  "atlas-coffee-club": "Paid Social Ads, Campaign Design",
  "experiments": "One-offs, Motion, Visual Studies",
  "poster-archive": "Poster Series, Visual Experiments",
};

const playgroundItems = [
  { title: "Poster Studies", label: "Type, color, motion cues", image: "/images/Poster_6.png", tone: "lime" },
  { title: "Typography Experiments", label: "Scale tests and bold systems", image: "/images/Poster_13.png", tone: "lavender" },
  { title: "Unused Concepts", label: "Directions worth remembering", image: "/images/Poster_18.png", tone: "orange" },
  { title: "Visual Explorations", label: "Doodles, marks, and sparks", image: "/images/Poster_1.png", tone: "yellow" },
];

const skills = ["Brand Identity", "Campaign Design", "Art Direction", "Paid Social Ads", "Print & Digital Design", "Marketing Systems"];

export default function Home() {
  return (
    <PortfolioLayout>
      <section className="portfolio-hero portfolio-section tc-hero">
        <div className="tc-hero-copy-block">
          <PortfolioReveal className="portfolio-hero-kicker">Designer, Ad Creative, Problem Solver.</PortfolioReveal>
          <PortfolioReveal as="div" className="tc-hero-logo-wrap">
            <img src="/hero-logo.png" alt="Travis Crawford" />
          </PortfolioReveal>
          <PortfolioReveal as="h1" className="portfolio-hero-title">
            Identity, campaigns, and creative systems.
          </PortfolioReveal>
          <PortfolioReveal as="p" className="portfolio-hero-copy">
            I help brands communicate clearly through thoughtful design systems, campaign visuals, and expressive creative direction.
          </PortfolioReveal>
          <PortfolioReveal className="portfolio-hero-actions">
            <a href="#work" className="portfolio-button portfolio-primary">View Work</a>
            <a href="#about" className="portfolio-button portfolio-secondary">About Me</a>
          </PortfolioReveal>
        </div>
        <HeroCollage />
      </section>

      <Marquee />

      <section id="work" className="portfolio-section portfolio-work-section">
        <SectionHeading eyebrow="Selected Work" title="Identity systems, campaigns, products, and visual experiments built with clarity." />
        <div className="tc-project-grid">
          {selectedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <PortfolioReveal className="tc-work-actions">
          <a href="/projects" className="portfolio-button portfolio-secondary">See All Projects</a>
        </PortfolioReveal>
      </section>

      <section id="about" className="portfolio-section tc-about-section">
        <PortfolioReveal className="tc-about-image">
          <img
            className="tc-about-photo"
            src="/about-headshot.png"
            alt="Travis Crawford smiling portrait"
            loading="lazy"
            decoding="async"
          />
        </PortfolioReveal>
        <PortfolioReveal className="tc-about-copy">
          <p className="tc-section-kicker">About</p>
          <h2>Hi, I’m Travis Crawford, a designer based in Texas.</h2>
          <p>
            I create identity systems, campaign visuals, and thoughtful brand experiences that help ideas feel clear, useful, and memorable.
          </p>
          <ul className="tc-skill-list">
            {skills.map((skill) => (
              <li key={skill}>
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </PortfolioReveal>
      </section>

      <section id="playground" className="portfolio-section tc-playground-section">
        <SectionHeading eyebrow="Playground" title="Poster studies, type experiments, unused concepts, doodles, and visual explorations." />
        <div className="tc-playground-grid">
          {playgroundItems.map((item) => (
            <a key={item.title} className={`tc-playground-card tc-tone-${item.tone}`} href="/experiments">
              <img src={item.image} alt="" loading="lazy" decoding="async" />
              <div>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="contact" className="portfolio-section tc-contact-section">
        <PortfolioReveal className="tc-contact-inner">
          <p className="tc-section-kicker">Contact</p>
          <h2>Let’s make something useful.</h2>
          <p>Have a project, collaboration, or creative opportunity in mind? I’d love to hear from you.</p>
          <a className="portfolio-button portfolio-primary" href="mailto:tcrawford.design@gmail.com">Email Me</a>
        </PortfolioReveal>
      </section>
    </PortfolioLayout>
  );
}

function HeroCollage() {
  return (
    <PortfolioReveal className="tc-hero-collage">
      <div className="tc-collage-card tc-collage-orange tc-poster-card">
        <img src="/images/Poster_6.png" alt="Poster artwork by Travis Crawford" loading="eager" decoding="async" />
      </div>
      <div className="tc-collage-card tc-collage-lavender tc-poster-card">
        <img src="/images/Poster_1.png" alt="Banana poster artwork by Travis Crawford" loading="eager" decoding="async" />
      </div>
      <div className="tc-collage-card tc-collage-black tc-poster-card">
        <img src="/images/Poster_18.png" alt="Poster artwork by Travis Crawford" loading="eager" decoding="async" />
      </div>
      <div className="tc-collage-card tc-collage-lime tc-poster-card tc-chime-card">
        <img src="/cg-icon.png" alt="Globe icon" loading="eager" decoding="async" />
      </div>
      <span className="tc-collage-logo-sticker" aria-hidden="true">
        <img src="/favicon-v3.png" alt="" />
      </span>
      <img className="tc-collage-smile" src="/smiley.png" alt="" aria-hidden="true" />
    </PortfolioReveal>
  );
}

function ProjectCard({ project }) {
  const title = splitProjectTitle(project.title).primary;
  const category = projectCategories[project.slug] ?? project.tag;

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
          <p>{category}</p>
        </div>
        <span aria-hidden="true">→</span>
      </div>
    </a>
  );
}
