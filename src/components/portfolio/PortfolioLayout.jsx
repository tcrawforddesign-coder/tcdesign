import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const CONTACT_EMAIL = "tcrawford.design@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/travis-crawford-67759b24a";

export { CONTACT_EMAIL, LINKEDIN_URL };

export function PortfolioLayout({ children }) {
  return (
    <div className="portfolio-site">
      <PortfolioCursorSpotlight />
      <header className="portfolio-header">
        <Link to="/" className="portfolio-logo">
          Travis Crawford
        </Link>
        <nav aria-label="Primary navigation">
          <Link to="/#work">Work</Link>
          <Link to="/#paid-social">Paid Ads</Link>
          <Link to="/posters">Posters</Link>
          <Link to="/#about">About</Link>
          <Link to="/#contact">Contact</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="portfolio-footer">
        <p>© 2026 Travis Crawford</p>
        <p>Brand / Campaign / Paid Social / Posters</p>
      </footer>
    </div>
  );
}

function PortfolioCursorSpotlight() {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const spotlight = spotlightRef.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const usesCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (!spotlight || prefersReducedMotion || usesCoarsePointer) return undefined;

    let animationFrame = 0;

    const updateSpotlight = (event) => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        spotlight.style.setProperty("--spotlight-x", `${event.clientX}px`);
        spotlight.style.setProperty("--spotlight-y", `${event.clientY}px`);
        spotlight.classList.add("is-visible");
      });
    };

    const hideSpotlight = () => {
      spotlight.classList.remove("is-visible");
    };

    window.addEventListener("pointermove", updateSpotlight);
    document.addEventListener("mouseleave", hideSpotlight);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", updateSpotlight);
      document.removeEventListener("mouseleave", hideSpotlight);
    };
  }, []);

  return <div ref={spotlightRef} className="portfolio-cursor-spotlight" aria-hidden="true" />;
}

export function PortfolioReveal({ as: Component = "div", className = "", children }) {
  return <Component className={`portfolio-reveal ${className}`}>{children}</Component>;
}

export function SectionHeading({ eyebrow, title }) {
  return (
    <PortfolioReveal className="portfolio-section-heading">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
    </PortfolioReveal>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="portfolio-section portfolio-contact-section">
      <PortfolioReveal as="p">Available for design opportunities, portfolio reviews, and selected freelance projects.</PortfolioReveal>
      <a className="portfolio-contact-link portfolio-reveal" href={`mailto:${CONTACT_EMAIL}`}>
        {CONTACT_EMAIL}
      </a>
      <div className="portfolio-contact-meta portfolio-reveal">
        <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </section>
  );
}

export function Marquee() {
  return (
    <section className="portfolio-marquee" aria-label="Services">
      <div className="portfolio-marquee-track">
        <span>Paid Social</span>
        <span>Brand Systems</span>
        <span>Campaign Design</span>
        <span>Poster Design</span>
        <span>Art Direction</span>
        <span>Typography</span>
        <span>Paid Social</span>
        <span>Brand Systems</span>
        <span>Campaign Design</span>
        <span>Poster Design</span>
      </div>
    </section>
  );
}
