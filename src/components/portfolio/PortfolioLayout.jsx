import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import HalftoneMark, { LogoPill } from "../../brand/HalftoneMark.jsx";

const CONTACT_EMAIL = "tcrawford.design@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/travis-crawford-67759b24a";
const DRIBBBLE_URL = "https://dribbble.com/tcrawforddesign";
const RESUME_URL = "/TravisCrawford_Resume.pdf";
const PROJECT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("New project")}&body=${encodeURIComponent(
  "Hi Travis,\n\nWhat I'm making:\n\nWhen I need it:\n\nRough budget:\n\nLinks or examples:\n",
)}`;

export { CONTACT_EMAIL, LINKEDIN_URL, DRIBBBLE_URL, RESUME_URL, PROJECT_MAILTO };

const NAV_ITEMS = [
  { to: "/projects", label: "Work" },
  { to: "/#about", label: "About" },
  { to: "/posters", label: "Posters" },
  { to: "/experiments", label: "Experiments" },
  { to: "/logo-questionnaire", label: "Logo brief" },
];

export function PortfolioLayout({ children, overlayHeader = false }) {
  return (
    <div className={`portfolio-site tc-brand ${overlayHeader ? "tc-has-overlay-header" : ""}`}>
      <a className="tc-skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="tc-header">
      <div className="tc-header-inner">
        <LogoPill to="/" aria-label="Travis Crawford, home" />
        <nav className="tc-nav tc-glass" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) =>
            item.to.includes("#") ? (
              <Link key={item.label} to={item.to} className="tc-nav-link">
                {item.label}
              </Link>
            ) : (
              <NavLink key={item.label} to={item.to} className="tc-nav-link">
                {item.label}
              </NavLink>
            ),
          )}
          <Link to="/#contact" className="tc-btn tc-btn-red tc-btn-sm">
            Start a project
          </Link>
        </nav>
        <button
          type="button"
          className="tc-menu-button tc-glass"
          aria-expanded={open}
          aria-controls="tc-mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="tc-menu-icon" aria-hidden="true" data-open={open} />
          <span>{open ? "Close" : "Menu"}</span>
        </button>
      </div>
      <div id="tc-mobile-menu" className="tc-mobile-menu tc-glass" hidden={!open}>
        {NAV_ITEMS.map((item) => (
          <Link key={item.label} to={item.to} className="tc-mobile-link">
            {item.label}
          </Link>
        ))}
        <Link to="/#contact" className="tc-btn tc-btn-red">
          Start a project
        </Link>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="tc-footer">
      <div className="tc-footer-inner">
        <div className="tc-footer-brand">
          <Link to="/" className="tc-footer-mark" aria-label="Travis Crawford, home">
            <HalftoneMark size={40} />
            <span>
              Travis Crawford<span className="tc-dot">.</span>
            </span>
          </Link>
          <p>Visual designer and creative strategist.</p>
        </div>
        <nav className="tc-footer-links" aria-label="Footer">
          <Link to="/projects">Work</Link>
          <Link to="/posters">Posters</Link>
          <Link to="/experiments">Experiments</Link>
          <Link to="/logo-questionnaire">Logo brief</Link>
          <a href={RESUME_URL} target="_blank" rel="noreferrer">
            Resume
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={DRIBBBLE_URL} target="_blank" rel="noreferrer">
            Dribbble
          </a>
        </nav>
      </div>
      <div className="tc-footer-base">
        <span>
          © {new Date().getFullYear()} Travis Crawford<span className="tc-dot">.</span>
        </span>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </div>
    </footer>
  );
}

export function PortfolioReveal({ as: Component = "div", className = "", children }) {
  return <Component className={`portfolio-reveal ${className}`}>{children}</Component>;
}

export function SectionHeading({ eyebrow, title }) {
  return (
    <PortfolioReveal className="portfolio-section-heading">
      {eyebrow ? <p>{eyebrow}</p> : null}
      <h2>{title}</h2>
    </PortfolioReveal>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="tc-reach">
      <div className="tc-reach-inner">
        <PortfolioReveal as="h2" className="tc-reach-title">
          Have something
          <br />
          worth making<span className="tc-dot">?</span>
        </PortfolioReveal>
        <PortfolioReveal as="p" className="tc-reach-lede">
          Tell me what you're making and when you need it.
        </PortfolioReveal>
        <PortfolioReveal className="tc-reach-actions">
          <a className="tc-btn tc-btn-red tc-btn-lg" href={PROJECT_MAILTO}>
            Start a project
          </a>
          <a className="tc-reach-email" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </PortfolioReveal>
        <PortfolioReveal as="p" className="tc-reach-note">
          Need a logo? <Link to="/logo-questionnaire">Fill out the logo brief</Link> and I'll follow up.
        </PortfolioReveal>
      </div>
    </section>
  );
}
