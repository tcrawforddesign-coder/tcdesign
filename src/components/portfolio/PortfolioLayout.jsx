import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const CONTACT_EMAIL = "tcrawford.design@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/travis-crawford-67759b24a";
const DRIBBBLE_URL = "https://dribbble.com/tcrawforddesign";

export { CONTACT_EMAIL, LINKEDIN_URL, DRIBBBLE_URL };

export function PortfolioLayout({ children }) {
  return (
    <div className="portfolio-site">
      <header className="portfolio-header">
        <Link to="/" className="portfolio-logo" aria-label="Travis Crawford home">
          <img src="/travis-logo.png" alt="Travis Crawford" />
        </Link>
        <nav aria-label="Primary navigation">
          <Link to="/#work">Work</Link>
          <Link to="/#about">About</Link>
          <Link to="/experiments">Experiments</Link>
          <Link to="/posters">Posters</Link>
          <Link to="/#contact">Contact</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="portfolio-footer">
        <Link to="/" className="portfolio-footer-logo" aria-label="Travis Crawford home">
          <img src="/travis-logo.png" alt="Travis Crawford" />
        </Link>
        <div className="portfolio-footer-contact">
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <p>© 2026 Travis Crawford. All rights reserved.</p>
        </div>
        <div className="portfolio-footer-social">
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={DRIBBBLE_URL} target="_blank" rel="noreferrer">Dribbble</a>
        </div>
      </footer>
    </div>
  );
}

export function PortfolioPointerEffects() {
  return (
    <>
      <PortfolioCursorSpotlight />
      <PortfolioClickDrops />
    </>
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
        spotlight.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
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

function PortfolioClickDrops() {
  const dropsRef = useRef(null);

  useEffect(() => {
    const drops = dropsRef.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!drops || prefersReducedMotion) return undefined;

    const createDrop = (event) => {
      if (event.button !== 0) return;

      const drop = document.createElement("span");
      drop.className = "portfolio-click-drop";
      drop.style.setProperty("--drop-x", `${event.clientX}px`);
      drop.style.setProperty("--drop-y", `${event.clientY}px`);
      drop.innerHTML = "<span></span><span></span><span></span>";
      drops.appendChild(drop);

      window.setTimeout(() => {
        drop.remove();
      }, 900);
    };

    window.addEventListener("pointerdown", createDrop, { capture: true });

    return () => {
      window.removeEventListener("pointerdown", createDrop, { capture: true });
      drops.replaceChildren();
    };
  }, []);

  return <div ref={dropsRef} className="portfolio-click-drops" aria-hidden="true" />;
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
      <PortfolioReveal as="p">Have a project, collaboration, or creative opportunity in mind? I’d love to hear from you.</PortfolioReveal>
      <a className="portfolio-contact-link portfolio-reveal" href={`mailto:${CONTACT_EMAIL}`}>
        Email Me
      </a>
      <div className="portfolio-contact-meta portfolio-reveal">
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn</a>
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
