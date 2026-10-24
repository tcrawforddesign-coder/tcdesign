import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import HalftoneMark, { LogoPill } from "../../brand/HalftoneMark.jsx";
import { WORK_SECTIONS } from "../../data/workSections.js";
import { Magnetic } from "../motion/ScrollMotion.jsx";

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
  { href: RESUME_URL, label: "Resume" },
  { to: "/logo-questionnaire", label: "Logo brief" },
];
const HELLO_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Hello Travis")}`;

// Header links: a route, an in-page anchor, or a file that opens in a new tab.
function NavItem({ item, className }) {
  if (item.href) {
    return (
      <a href={item.href} className={className} target="_blank" rel="noreferrer">
        {item.label}
      </a>
    );
  }
  if (item.to.includes("#")) {
    return (
      <Link to={item.to} className={className}>
        {item.label}
      </Link>
    );
  }
  return (
    <NavLink to={item.to} className={className}>
      {item.label}
    </NavLink>
  );
}

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

// "Work" opens a panel across the screen: big rows on the left, and a preview
// of each section's work on the right that changes as you hover or tab.
// The panel renders outside the nav pill: the pill's backdrop blur would
// otherwise trap a fixed-position panel inside it.
function useWorkMenu() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  return { open, setOpen, buttonRef };
}

function WorkButton({ open, setOpen, buttonRef }) {
  const location = useLocation();
  const active = isWorkPath(location.pathname);
  return (
    <button
      ref={buttonRef}
      type="button"
      className={`tc-nav-link tc-work-trigger ${active ? "active" : ""}`}
      aria-expanded={open}
      aria-controls="tc-work-panel"
      onClick={() => setOpen((value) => !value)}
    >
      Work
      <ChevronDown aria-hidden="true" className="tc-work-chevron" />
    </button>
  );
}

function WorkMenu({ open, setOpen, buttonRef }) {
  const [preview, setPreview] = useState(WORK_SECTIONS[0].to);
  const location = useLocation();
  const panelRef = useRef(null);

  const close = (returnFocus = false) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  };

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash, setOpen]);

  useEffect(() => {
    if (!open) return undefined;
    // Start the preview on the page you're on, if it's one of the sections.
    const current = WORK_SECTIONS.find((section) => section.to === location.pathname);
    setPreview(current?.preview ? current.to : WORK_SECTIONS[0].to);

    const onKey = (event) => {
      if (event.key === "Escape") close(true);
    };
    window.addEventListener("keydown", onKey);
    window.__studioLenis?.stop();
    document.documentElement.classList.add("tc-work-open");
    // The page behind the menu can't take focus or be read while it's open.
    const behind = [document.getElementById("main"), document.querySelector(".tc-footer")].filter(Boolean);
    behind.forEach((el) => {
      el.inert = true;
    });
    panelRef.current?.querySelector("a")?.focus({ preventScroll: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.__studioLenis?.start();
      document.documentElement.classList.remove("tc-work-open");
      behind.forEach((el) => {
        el.inert = false;
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const shown = WORK_SECTIONS.find((section) => section.to === preview);

  return (
    <>
      <div
        id="tc-work-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Work"
        className="tc-work-overlay"
        hidden={!open}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="tc-work-overlay-inner" onClick={(event) => {
          if (!event.target.closest("a, .tc-work-preview")) close();
        }}>
          <ul className="tc-work-overlay-rows">
            {WORK_SECTIONS.map((section) => (
              <li key={section.to}>
                <NavLink
                  to={section.to}
                  end
                  className={`tc-work-overlay-row ${section.soon ? "is-soon" : ""}`}
                  onPointerEnter={() => setPreview(section.to)}
                  onFocus={() => setPreview(section.to)}
                >
                  <span className="tc-work-row-label">{section.label}</span>
                  <span className="tc-work-row-note">{section.note}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="tc-work-preview" aria-hidden="true">
            {WORK_SECTIONS.filter((section) => section.preview).map((section) => (
              <img
                key={section.to}
                src={section.preview}
                alt=""
                loading={open ? "eager" : "lazy"}
                decoding="async"
                className={shown?.to === section.to ? "is-on" : ""}
              />
            ))}
            {shown && !shown.preview ? <p className="tc-work-preview-empty">{shown.label} is coming soon.</p> : null}
          </div>
        </div>
      </div>
    </>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const work = useWorkMenu();
  const navRef = useRef(null);

  // One soft pill slides between nav links as you hover or tab, instead of
  // each link lighting up on its own. Set straight on the element, no state.
  const moveNavPill = (event) => {
    const nav = navRef.current;
    const link = event.target.closest?.(".tc-nav-link");
    if (!nav || !link || !nav.contains(link)) return;
    nav.style.setProperty("--pill-x", `${link.offsetLeft}px`);
    nav.style.setProperty("--pill-w", `${link.offsetWidth}px`);
    nav.classList.add("has-pill");
  };
  const hideNavPill = (event) => {
    if (event.type === "blur" && navRef.current?.contains(event.relatedTarget)) return;
    navRef.current?.classList.remove("has-pill");
  };
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
        <nav ref={navRef} className="tc-nav tc-glass" aria-label="Primary navigation" onPointerOver={moveNavPill} onPointerLeave={hideNavPill} onFocus={moveNavPill} onBlur={hideNavPill}>
          <span className="tc-nav-pill" aria-hidden="true" />
          <WorkButton {...work} />
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.label} item={item} className="tc-nav-link" />
          ))}
          <Link to="/#contact" className="tc-btn tc-btn-red tc-btn-sm">
            Get in touch
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
      <WorkMenu {...work} />
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
          <NavItem key={item.label} item={item} className="tc-mobile-link" />
        ))}
        <Link to="/#contact" className="tc-btn tc-btn-red">
          Get in touch
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
          Hiring for a design role, or have a project in mind? Email me.
        </PortfolioReveal>
        <PortfolioReveal className="tc-reach-actions">
<Magnetic>
          <a className="tc-btn tc-btn-red tc-btn-lg" href={HELLO_MAILTO}>
            Email me
          </a>
          </Magnetic>
          <a className="tc-btn tc-btn-ghost tc-btn-lg" href={RESUME_URL} target="_blank" rel="noreferrer">
            Download resume
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
