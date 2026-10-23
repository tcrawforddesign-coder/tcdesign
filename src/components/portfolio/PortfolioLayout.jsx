import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

import HalftoneMark, { LogoPill } from "../../brand/HalftoneMark.jsx";
import { WORK_SECTIONS } from "../../data/workSections.js";

const CONTACT_EMAIL = "tcrawford.design@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/travis-crawford-67759b24a";
const DRIBBBLE_URL = "https://dribbble.com/tcrawforddesign";
const RESUME_URL = "/TravisCrawford_Resume.pdf";
const PROJECT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("New project")}&body=${encodeURIComponent(
  "Hi Travis,\n\nWhat I'm making:\n\nWhen I need it:\n\nRough budget:\n\nLinks or examples:\n",
)}`;

export { CONTACT_EMAIL, LINKEDIN_URL, DRIBBBLE_URL, RESUME_URL, PROJECT_MAILTO };

const NAV_ITEMS = [
  { to: "/#about", label: "About" },
  { to: "/logo-questionnaire", label: "Logo brief" },
];

export function PortfolioLayout({ children, overlayHeader = false }) {
  useRevealOnScroll();

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

// Sections rise into place as they scroll into view, once each. Anything
// already on screen when the page opens rises straight away. Without
// IntersectionObserver, or with reduced motion, everything just shows.
function useRevealOnScroll() {
  const location = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      root.classList.remove("tc-reveal-ready");
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const watch = (scope) => {
      scope.querySelectorAll?.(".portfolio-reveal:not(.is-in)").forEach((el) => observer.observe(el));
    };

    root.classList.add("tc-reveal-ready");
    watch(document);

    // Galleries render more items after load; pick those up too.
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;
        if (node.classList.contains("portfolio-reveal")) observer.observe(node);
        watch(node);
      }));
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [location.pathname]);
}

function isWorkPath(pathname) {
  return WORK_SECTIONS.some((section) => pathname === section.to) || pathname.startsWith("/projects/");
}

function WorkMenu() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const wrapRef = useRef(null);
  const closeTimer = useRef(0);
  const active = isWorkPath(location.pathname);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        wrapRef.current?.querySelector("button")?.focus();
      }
    };
    const onPointer = (event) => {
      if (!wrapRef.current?.contains(event.target)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  // Hover opens it for mouse users; clicking works everywhere.
  const hoverable = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const onEnter = () => {
    if (!hoverable()) return;
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const onLeave = () => {
    if (!hoverable()) return;
    closeTimer.current = window.setTimeout(() => setOpen(false), 180);
  };

  return (
    <div className="tc-work-menu" ref={wrapRef} onPointerEnter={onEnter} onPointerLeave={onLeave}>
      <button
        type="button"
        className={`tc-nav-link tc-work-trigger ${active ? "active" : ""}`}
        aria-expanded={open}
        aria-controls="tc-work-panel"
        onClick={() => setOpen((value) => !value)}
      >
        Work
        <ChevronDown aria-hidden="true" className="tc-work-chevron" />
      </button>
      <div id="tc-work-panel" className="tc-work-panel tc-glass" hidden={!open}>
        <ul>
          {WORK_SECTIONS.map((section) => (
            <li key={section.to}>
              <NavLink to={section.to} end className={`tc-work-panel-row ${section.soon ? "is-soon" : ""}`}>
                <span className="tc-work-row-label">{section.label}</span>
                <span className="tc-work-row-note">{section.note}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
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
          <WorkMenu />
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
        <p className="tc-mobile-group">Work</p>
        {WORK_SECTIONS.map((section) => (
          <Link key={section.to} to={section.to} className={`tc-mobile-link tc-mobile-sublink ${section.soon ? "is-soon" : ""}`}>
            <span>{section.label}</span>
            <span className="tc-work-row-note">{section.note}</span>
          </Link>
        ))}
        <span className="tc-mobile-divider" aria-hidden="true" />
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
          <Link to="/branding">Branding</Link>
          <Link to="/logos">Logos</Link>
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
