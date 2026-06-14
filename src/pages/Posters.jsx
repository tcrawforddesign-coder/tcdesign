import { useEffect, useState } from "react";

import { PosterCard } from "../components/portfolio/PortfolioCards.jsx";
import { ContactSection, PortfolioLayout, PortfolioReveal } from "../components/portfolio/PortfolioLayout.jsx";
import { posterEntries } from "../data/posters.js";

export default function PostersPage() {
  const [activePoster, setActivePoster] = useState(null);

  useEffect(() => {
    if (!activePoster) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActivePoster(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePoster]);

  return (
    <PortfolioLayout>
      <section className="portfolio-hero portfolio-section portfolio-subpage-hero">
        <PortfolioReveal className="portfolio-hero-kicker">Poster Work / Visual Experiments</PortfolioReveal>
        <PortfolioReveal as="h1" className="portfolio-hero-title">
          Where typography, composition, and mood get more expressive.
        </PortfolioReveal>
        <PortfolioReveal as="p" className="portfolio-hero-copy">
          Posters are where I push scale, contrast, and visual rhythm. They give the portfolio a sharper edge and show how I think through
          hierarchy, atmosphere, and composition in a single frame.
        </PortfolioReveal>
      </section>

      <section className="portfolio-section portfolio-work-section">
        <div className="portfolio-poster-grid">
          {posterEntries.map((poster) => (
            <PosterCard key={poster.id} poster={poster} onSelect={setActivePoster} />
          ))}
        </div>
      </section>

      <ContactSection />

      {activePoster ? (
        <div className="portfolio-poster-lightbox" role="dialog" aria-modal="true" aria-label={`${activePoster.title} poster preview`}>
          <button className="portfolio-poster-lightbox-backdrop" type="button" aria-label="Close poster preview" onClick={() => setActivePoster(null)} />
          <div className="portfolio-poster-lightbox-content">
            <button className="portfolio-poster-lightbox-close" type="button" aria-label="Close poster preview" onClick={() => setActivePoster(null)}>
              X
            </button>
            <img src={activePoster.src} alt={activePoster.title} />
          </div>
        </div>
      ) : null}
    </PortfolioLayout>
  );
}
