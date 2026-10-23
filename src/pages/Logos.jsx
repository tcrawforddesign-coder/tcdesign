import { Link } from "react-router-dom";

import { ContactSection, PortfolioLayout } from "../components/portfolio/PortfolioLayout.jsx";
import { PageHero, WorkIndex } from "../components/portfolio/WorkPages.jsx";
import { logos } from "../data/logos.js";

export default function LogosPage() {
  return (
    <PortfolioLayout>
      <PageHero title="Logos" copy="Marks and wordmarks for clients, concepts and experiments." />

      <section className="portfolio-section" aria-label="Logos">
        <ul className="tc-logo-grid">
          {logos.map((logo) => (
            <li key={logo.name} className="portfolio-reveal">
              <LogoTile logo={logo} />
            </li>
          ))}
        </ul>
      </section>

      <WorkIndex current="/logos" />
      <ContactSection />
    </PortfolioLayout>
  );
}

function LogoTile({ logo }) {
  const content = (
    <>
      <div className="tc-logo-tile-media" style={{ background: logo.background }}>
        <img src={logo.src} alt={`${logo.name} logo`} loading="lazy" decoding="async" />
      </div>
      <div className="tc-logo-tile-meta">
        <h3>{logo.name}</h3>
        <p>{logo.note}</p>
      </div>
    </>
  );

  return logo.href ? (
    <Link to={logo.href} className="tc-logo-tile">
      {content}
    </Link>
  ) : (
    <div className="tc-logo-tile">{content}</div>
  );
}
