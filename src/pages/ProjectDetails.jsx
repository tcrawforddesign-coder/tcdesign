import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { ContactSection, PortfolioLayout, PortfolioReveal, SectionHeading } from "../components/portfolio/PortfolioLayout.jsx";
import { splitProjectTitle } from "../components/portfolio/PortfolioCards.jsx";
import { findProjectBySlug, getAdjacentProjects } from "../data/projects.js";

export default function ProjectDetailsPage() {
  const { slug } = useParams();
  const project = useMemo(() => findProjectBySlug(slug), [slug]);
  const { prev, next } = useMemo(() => getAdjacentProjects(slug), [slug]);

  if (!project) {
    return (
      <PortfolioLayout>
        <section className="portfolio-section portfolio-contact-section">
          <PortfolioReveal as="p">Project not found</PortfolioReveal>
          <PortfolioReveal as="h1" className="portfolio-contact-link">
            This case study has moved off the grid.
          </PortfolioReveal>
          <PortfolioReveal>
            <Link to="/projects" className="portfolio-button portfolio-primary">
              Back to projects
            </Link>
          </PortfolioReveal>
        </section>
      </PortfolioLayout>
    );
  }

  const { primary } = splitProjectTitle(project.title ?? "");
  const galleryItems = collectGalleryItems(project);
  const heroImage = project.heroImage ?? project.cover;
  const isThreeSixty = project.slug === "3sixty-integrated-marketing";

  return (
    <PortfolioLayout>
      <section className="portfolio-hero portfolio-section portfolio-subpage-hero">
        <PortfolioReveal className="portfolio-hero-kicker">{project.tag} / {project.timeframe}</PortfolioReveal>
        <PortfolioReveal as="h1" className="portfolio-hero-title">
          {primary}
        </PortfolioReveal>
      </section>

      <section className="portfolio-case-hero">
        {project.heroVideo ? (
          <video autoPlay muted loop playsInline>
            <source src={project.heroVideo} type="video/mp4" />
          </video>
        ) : heroImage ? (
          <img src={heroImage} alt={`${project.title} hero`} />
        ) : null}
      </section>

      <section className="portfolio-section portfolio-case-meta-section">
        <div className="portfolio-case-meta portfolio-reveal">
          <div>
            <span>Role</span>
            <p>{project.roles?.join(", ")}</p>
          </div>
          <div>
            <span>Tools</span>
            <p>{project.tools?.join(", ")}</p>
          </div>
          <div>
            <span>Timeline</span>
            <p>{project.timeframe}</p>
          </div>
          <div>
            <span>Team</span>
            <p>{project.team?.join(", ") || "Solo designer"}</p>
          </div>
        </div>
      </section>

      <section className="portfolio-section portfolio-split-section">
        <PortfolioReveal className="portfolio-sticky-label">
          <p>Overview</p>
        </PortfolioReveal>
        <PortfolioReveal className="portfolio-split-content">
          <h2>{project.summary}</h2>
        </PortfolioReveal>
      </section>

      {project.challenge ? <CopySection block={project.challenge} /> : null}
      {project.approach ? <CopySection block={project.approach} /> : null}
      {isThreeSixty ? <ThreeSixtyMarketingSections project={project} /> : null}

      {project.highlights?.length ? (
        <section className="portfolio-section portfolio-work-section">
          <SectionHeading eyebrow="System Highlights" title="A closer look at the thinking behind the work." />
          <div className="portfolio-mini-card-grid">
            {project.highlights.map((item) => (
              <article key={item.title} className="portfolio-mini-card portfolio-reveal">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {!isThreeSixty && (galleryItems.length || project.galleryGroups?.length) ? <ProjectVisuals project={project} galleryItems={galleryItems} /> : null}

      {project.outcomes ? <CopySection block={project.outcomes} /> : null}

      <section className="portfolio-section portfolio-next-section">
        <Link to={prev ? `/projects/${prev.slug}` : "/projects"} className="portfolio-button portfolio-secondary">
          Previous
        </Link>
        <Link to={next ? `/projects/${next.slug}` : "/projects"} className="portfolio-button portfolio-primary">
          Next Project
        </Link>
      </section>

      <ContactSection />
    </PortfolioLayout>
  );
}

function CopySection({ block }) {
  return (
    <section className="portfolio-section portfolio-split-section">
      <PortfolioReveal className="portfolio-sticky-label">
        <p>{block.kicker}</p>
      </PortfolioReveal>
      <PortfolioReveal className="portfolio-split-content">
        <h2>{block.title}</h2>
        {block.paragraphs?.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </PortfolioReveal>
    </section>
  );
}

function ProjectVisuals({ project, galleryItems }) {
  if (project.slug === "atlas-coffee-club" && project.galleryGroups?.length) {
    return (
      <section className="portfolio-section portfolio-work-section">
        <SectionHeading eyebrow="Selected Visuals" title="Static ad work grouped by campaign and concept set." />
        <div className="portfolio-campaign-gallery">
          {project.galleryGroups.map((group) => {
            const items = (group.items ?? []).map(normalizeMediaItem).filter(Boolean);
            if (!items.length) return null;

            return (
              <section key={group.title} className="portfolio-campaign-gallery-group portfolio-reveal">
                <div className="portfolio-campaign-gallery-heading">
                  <p>{group.title}</p>
                  {group.description ? <span>{group.description}</span> : null}
                </div>
                <div className="portfolio-gallery-grid portfolio-gallery-grid--campaign">
                  {items.map((media, index) => (
                    <figure key={`${group.title}-${media.src}-${index}`} className="portfolio-gallery-item">
                      <img src={media.src} alt={media.alt || `${group.title} visual ${index + 1}`} loading="lazy" decoding="async" />
                    </figure>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className="portfolio-section portfolio-work-section">
      <SectionHeading eyebrow="Selected Visuals" title="Project frames, campaign assets, and supporting material." />
      <div className="portfolio-gallery-grid">
        {galleryItems.map((item, index) => {
          const media = normalizeMediaItem(item);
          if (!media) return null;
          return (
            <figure key={`${media.src}-${index}`} className="portfolio-gallery-item portfolio-reveal">
              <img src={media.src} alt={media.alt || `${project.title} visual ${index + 1}`} loading="lazy" decoding="async" />
            </figure>
          );
        })}
      </div>
    </section>
  );
}

function ThreeSixtyMarketingSections({ project }) {
  const communication = project.communicationStrategyExecution ?? {};
  const socialStrategy = project.socialStrategy ?? {};
  const thoughtLeadership = project.thoughtLeadershipSeries ?? {};
  const pricingCampaign = project.securityPricingCampaign ?? {};
  const emailCampaign = project.emailCampaignMockup ?? {};
  const technical = project.technicalTranslationStorytelling ?? {};
  const sales = project.salesEnablementBusinessCommunication ?? {};
  const salesLibrary = project.salesEnablementLibrary ?? {};
  const internal = project.internalCommunicationsEngagement ?? {};
  const operations = project.operationsPlanningCoordination ?? {};
  const designExecution = project.designContentExecution ?? {};

  return (
    <>
      <PerformanceSnapshot snapshot={project.performanceSnapshot} />

      <MarketingSection eyebrow="What I do" title="Marketing communication that connects strategy, creative, and execution.">
        <BulletList items={project.whatIDo} />
      </MarketingSection>

      <MarketingSection eyebrow="Communication Strategy and Campaign Execution" title="Campaign planning built around clear messaging and business goals.">
        <p>{communication.statement}</p>
        <BulletList items={communication.examples} />
        <AssetStrip title={pricingCampaign.title} copy={pricingCampaign.copy} items={pricingCampaign.assets} />
        {emailCampaign.title ? (
          <div className="portfolio-campaign-feature">
            <h3>{emailCampaign.title}</h3>
            <p>{emailCampaign.subtitle}</p>
            {emailCampaign.iframeSrc ? (
              <div className="portfolio-email-frame">
                <iframe src={emailCampaign.iframeSrc} title={`${emailCampaign.title} email mockup`} loading="lazy" />
              </div>
            ) : null}
          </div>
        ) : null}
      </MarketingSection>

      <MarketingSection eyebrow="Social Strategy" title={socialStrategy.title}>
        <p>{socialStrategy.copy}</p>
        <BulletList items={socialStrategy.pillars} />
        <AssetStrip title={thoughtLeadership.title} copy={thoughtLeadership.copy} items={thoughtLeadership.images} />
        <AssetStrip
          title="Social media content system"
          copy="A set of social posts showing how educational, promotional, and urgency-focused content stays visually consistent across the 3Sixty feed."
          items={getFeaturedSocialPosts(project.socialPosts)}
          initialVisible={8}
        />
      </MarketingSection>

      <section className="portfolio-section portfolio-work-section">
        <SectionHeading eyebrow="Technical Translation and Sales Enablement" title="Turning operational complexity into clearer sales and client communication." />
        <div className="portfolio-mini-card-grid portfolio-two-up">
          <article className="portfolio-mini-card portfolio-reveal">
            <h3>Technical Translation</h3>
            <p>{technical.statement}</p>
            <BulletList items={technical.examples} />
          </article>
          <article className="portfolio-mini-card portfolio-reveal">
            <h3>Sales Enablement</h3>
            <p>{sales.statement}</p>
            <BulletList items={sales.examples} />
          </article>
        </div>
      </section>

      <MarketingSection eyebrow={salesLibrary.title ?? "Sales Enablement Library"} title="Reusable leave-behind assets for faster sales conversations.">
        <p>{salesLibrary.copy}</p>
        <AssetGrid items={salesLibrary.assets} title={salesLibrary.title} />
      </MarketingSection>

      <MarketingSection eyebrow="Internal Communications and Engagement" title="Internal communication that keeps teams informed and aligned.">
        <p>{internal.statement}</p>
        <BulletList items={internal.examples} />
      </MarketingSection>

      <section className="portfolio-section portfolio-work-section">
        <SectionHeading eyebrow="Operations and Execution" title="Planning, coordination, and design production across active initiatives." />
        <div className="portfolio-mini-card-grid portfolio-two-up">
          <article className="portfolio-mini-card portfolio-reveal">
            <h3>Operations, Planning and Coordination</h3>
            <p>{operations.statement}</p>
            <BulletList items={operations.examples} />
          </article>
          <article className="portfolio-mini-card portfolio-reveal">
            <h3>Design and Content Execution</h3>
            <p>{designExecution.statement}</p>
            <BulletList items={designExecution.examples} />
          </article>
        </div>
      </section>

      <MarketingSection eyebrow="Impact" title="A communication system supporting campaigns, sales, and internal initiatives.">
        <BulletList items={project.impact} />
      </MarketingSection>
    </>
  );
}

function MarketingSection({ eyebrow, title, children }) {
  if (!title && !children) return null;

  return (
    <section className="portfolio-section portfolio-split-section">
      <PortfolioReveal className="portfolio-sticky-label">
        <p>{eyebrow}</p>
      </PortfolioReveal>
      <PortfolioReveal className="portfolio-split-content portfolio-rich-content">
        {title ? <h2>{title}</h2> : null}
        {children}
      </PortfolioReveal>
    </section>
  );
}

function PerformanceSnapshot({ snapshot }) {
  if (!snapshot?.groups?.length) return null;

  return (
    <section className="portfolio-section portfolio-work-section">
      <SectionHeading eyebrow="Performance snapshot" title="Directional lift across channels I led or co-owned." />
      <PortfolioReveal as="p" className="portfolio-section-intro">
        {snapshot.intro}
      </PortfolioReveal>
      <div className="portfolio-metric-grid">
        {snapshot.groups.flatMap((group) =>
          group.metrics.map((metric) => (
            <article key={`${group.title}-${metric.label}`} className="portfolio-metric-card portfolio-reveal">
              <span>{group.title}</span>
              <h3>{metric.value}</h3>
              <p>{metric.label}</p>
              {metric.comparison ? <small>{metric.comparison}</small> : null}
            </article>
          )),
        )}
      </div>
      {snapshot.footnote ? <p className="portfolio-footnote">{snapshot.footnote}</p> : null}
    </section>
  );
}

function BulletList({ items = [] }) {
  if (!items.length) return null;

  return (
    <ul className="portfolio-bullet-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function AssetStrip({ title, copy, items = [], initialVisible }) {
  const [expanded, setExpanded] = useState(false);
  const normalized = items.map(normalizeMediaItem).filter(Boolean);
  if (!title && !copy && !normalized.length) return null;
  const hasToggle = initialVisible && normalized.length > initialVisible;
  const visibleItems = hasToggle && !expanded ? normalized.slice(0, initialVisible) : normalized;

  return (
    <div className="portfolio-campaign-feature">
      {title ? <h3>{title}</h3> : null}
      {copy ? <p>{copy}</p> : null}
      {normalized.length ? (
        <div className="portfolio-asset-strip">
          {visibleItems.map((item, index) => (
            <img key={`${item.src}-${index}`} src={item.src} alt={item.alt || `${title ?? "Marketing asset"} ${index + 1}`} loading="lazy" decoding="async" />
          ))}
        </div>
      ) : null}
      {hasToggle ? (
        <button type="button" className="portfolio-view-more-button" onClick={() => setExpanded((current) => !current)}>
          {expanded ? "Show fewer" : `View more (${normalized.length - initialVisible})`}
        </button>
      ) : null}
    </div>
  );
}

function getFeaturedSocialPosts(posts = []) {
  const preferred = [
    "1751997917122",
    "1752166685026",
    "1753125856967",
    "1754451545290",
    "1757425395881",
    "1759161916665",
    "1766530556230",
    "1772635628723",
  ];
  const seen = new Set();
  const featured = preferred
    .map((token) => posts.find((src) => src.includes(token)))
    .filter(Boolean);
  const ordered = [...featured, ...posts].filter((src) => {
    if (!src || seen.has(src)) return false;
    seen.add(src);
    return true;
  });

  return ordered;
}

function AssetGrid({ items = [], title = "Asset" }) {
  const normalized = items.map(normalizeMediaItem).filter(Boolean);
  if (!normalized.length) return null;

  return (
    <div className="portfolio-asset-grid">
      {normalized.map((item, index) => (
        <img key={`${item.src}-${index}`} src={item.src} alt={item.alt || `${title} ${index + 1}`} loading="lazy" decoding="async" />
      ))}
    </div>
  );
}

function collectGalleryItems(project) {
  const direct = [
    project.textureImage,
    project.flowImage,
    project.eventChallengesFlowImage,
    project.paperPrototypeImage,
    project.existingLogoImage,
    project.proposedLogoImage,
    ...(project.socialPosts ?? []).slice(0, 8),
    ...(project.securityPricingCampaign?.assets ?? []).map((asset) => asset.src),
    ...(project.salesEnablementLibrary?.assets ?? []).slice(0, 4),
    ...(project.communitySections ?? []).map((item) => item.image),
  ].filter(Boolean);

  if (project.gallery?.length) return [...project.gallery, ...direct];
  if (project.galleryGroups?.length) {
    return [...project.galleryGroups.flatMap((group) => group.items ?? []), ...direct];
  }
  return direct;
}

function normalizeMediaItem(item) {
  if (!item) return null;
  if (typeof item === "string") return { src: item, alt: "" };
  const src = item.preview ?? item.src ?? item.full;
  if (!src) return null;
  return { src, alt: item.alt ?? "" };
}
