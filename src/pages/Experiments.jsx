import { useEffect, useState } from "react";

import { ContactSection, PortfolioLayout, PortfolioReveal, SectionHeading } from "../components/portfolio/PortfolioLayout.jsx";
import { experimentEntries } from "../data/experiments.js";

export default function ExperimentsPage() {
  const [activeExperiment, setActiveExperiment] = useState(null);
  const [leadExperiment, ...supportingExperiments] = experimentEntries;

  useEffect(() => {
    if (!activeExperiment) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveExperiment(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeExperiment]);

  return (
    <PortfolioLayout>
      <section className="portfolio-hero portfolio-section portfolio-subpage-hero">
        <PortfolioReveal className="portfolio-hero-kicker">Experiments / Abandoned Directions</PortfolioReveal>
        <PortfolioReveal as="h1" className="portfolio-hero-title">
          One-offs, strange starts, and ideas that still have a pulse.
        </PortfolioReveal>
        <PortfolioReveal as="p" className="portfolio-hero-copy">
          A loose archive of visual directions, poster studies, unused identities, spec pieces, and experiments that usually stay tucked away.
        </PortfolioReveal>
      </section>

      <section className="portfolio-section portfolio-work-section tc-experiments-section">
        <SectionHeading eyebrow="Unreleased Work" title="Some of the side roads are where the most interesting visual decisions happen." />

        <div className="tc-experiment-feature">
          <ExperimentCard experiment={leadExperiment} onSelect={setActiveExperiment} isFeature />
          <PortfolioReveal className="tc-experiment-note">
            <p>Not every direction needs to become a full case study to say something useful.</p>
            <p>
              This page gives those loose pieces a place to live: quick ideas, visual moods, identity sketches, abandoned concepts, and design exercises
              that show range without pretending every piece was a finished client project.
            </p>
          </PortfolioReveal>
        </div>

        <div className="tc-experiment-grid">
          {supportingExperiments.map((experiment) => (
            <ExperimentCard key={experiment.id} experiment={experiment} onSelect={setActiveExperiment} />
          ))}
        </div>
      </section>

      <ContactSection />

      {activeExperiment ? (
        <div className="portfolio-poster-lightbox" role="dialog" aria-modal="true" aria-label={`${activeExperiment.title} preview`}>
          <button className="portfolio-poster-lightbox-backdrop" type="button" aria-label="Close experiment preview" onClick={() => setActiveExperiment(null)} />
          <div className="portfolio-poster-lightbox-content tc-experiment-lightbox-content">
            <button className="portfolio-poster-lightbox-close" type="button" aria-label="Close experiment preview" onClick={() => setActiveExperiment(null)}>
              X
            </button>
            <ExperimentMedia experiment={activeExperiment} isPreview />
          </div>
        </div>
      ) : null}
    </PortfolioLayout>
  );
}

function ExperimentCard({ experiment, onSelect, isFeature = false }) {
  if (!experiment) return null;

  return (
    <article className={`tc-experiment-card tc-tone-${experiment.tone} ${isFeature ? "tc-experiment-card-feature" : ""} portfolio-reveal`}>
      <button type="button" onClick={() => onSelect(experiment)} aria-label={`View ${experiment.title}`}>
        <ExperimentMedia experiment={experiment} isFeature={isFeature} />
      </button>
      <div>
        <span>{experiment.label}</span>
        <h3>{experiment.title}</h3>
      </div>
    </article>
  );
}

function ExperimentMedia({ experiment, isFeature = false, isPreview = false }) {
  if (experiment.mediaType === "video") {
    return (
      <video
        src={experiment.src}
        aria-label={experiment.title}
        autoPlay
        muted
        loop
        playsInline
        controls={isPreview}
        preload={isFeature || isPreview ? "auto" : "metadata"}
      />
    );
  }

  return <img src={experiment.src} alt={experiment.title} loading={isFeature ? "eager" : "lazy"} decoding="async" />;
}
