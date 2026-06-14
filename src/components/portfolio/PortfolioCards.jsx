import { useRef } from "react";
import { Link } from "react-router-dom";

function splitTitle(title = "") {
  const [primary, ...rest] = title.split(/—|-/).map((part) => part.trim()).filter(Boolean);
  return {
    primary: primary || title,
    secondary: rest.join(" — "),
  };
}

function useDeskHover() {
  const ref = useRef(null);

  const handlePointerMove = (event) => {
    const card = ref.current;
    if (!card) return;

    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    card.style.setProperty("--desk-rotate-x", `${(-y * 4).toFixed(2)}deg`);
    card.style.setProperty("--desk-rotate-y", `${(x * 5).toFixed(2)}deg`);
    card.style.setProperty("--desk-shadow-x", `${(-x * 18).toFixed(1)}px`);
    card.style.setProperty("--desk-shadow-y", `${(22 - y * 12).toFixed(1)}px`);
    card.style.setProperty("--desk-glow-x", `${((x + 0.5) * 100).toFixed(1)}%`);
    card.style.setProperty("--desk-glow-y", `${((y + 0.5) * 100).toFixed(1)}%`);
  };

  const handlePointerLeave = () => {
    const card = ref.current;
    if (!card) return;

    card.style.setProperty("--desk-rotate-x", "0deg");
    card.style.setProperty("--desk-rotate-y", "0deg");
    card.style.setProperty("--desk-shadow-x", "0px");
    card.style.setProperty("--desk-shadow-y", "18px");
    card.style.setProperty("--desk-glow-x", "50%");
    card.style.setProperty("--desk-glow-y", "50%");
  };

  return { ref, onPointerMove: handlePointerMove, onPointerLeave: handlePointerLeave };
}

export function PortfolioProjectCard({ project, to, eyebrow, year, title, copy, image, imageClass = "" }) {
  const deskHover = useDeskHover();
  const alternateImage = getProjectAlternateCover(project, title);
  const displayTitle = splitTitle(title).primary;
  const content = (
    <>
      <div className={`portfolio-project-image ${alternateImage ? "has-desk-alt" : ""} ${imageClass}`}>
        {image ? <img className="portfolio-desk-image-primary" src={image} alt="" loading="lazy" decoding="async" /> : null}
        {alternateImage ? <img className="portfolio-desk-image-alt" src={alternateImage} alt="" loading="lazy" decoding="async" /> : null}
      </div>
      <div className="portfolio-project-meta">
        <span>{eyebrow}</span>
        <span>{year}</span>
      </div>
      <h3>{displayTitle}</h3>
      <p>{copy}</p>
    </>
  );

  if (to) {
    return (
      <Link to={to} className="portfolio-project-card portfolio-desk-card portfolio-reveal" {...deskHover}>
        {content}
      </Link>
    );
  }

  if (project?.href || project?.slug) {
    return (
      <Link to={project.href ?? `/projects/${project.slug}`} className="portfolio-project-card portfolio-desk-card portfolio-reveal" {...deskHover}>
        {content}
      </Link>
    );
  }

  return <article className="portfolio-project-card portfolio-desk-card portfolio-reveal" {...deskHover}>{content}</article>;
}

export function PortfolioProjectCarousel({ children, label = "Projects" }) {
  const rowRef = useRef(null);

  const scrollProjects = (direction) => {
    const row = rowRef.current;
    if (!row) return;

    row.scrollBy({
      left: direction * Math.max(row.clientWidth * 0.82, 320),
      behavior: "smooth",
    });
  };

  return (
    <div className="portfolio-project-carousel">
      <div className="portfolio-project-carousel-controls" aria-label={`${label} carousel controls`}>
        <button type="button" onClick={() => scrollProjects(-1)} aria-label={`Previous ${label.toLowerCase()}`}>
          ←
        </button>
        <button type="button" onClick={() => scrollProjects(1)} aria-label={`Next ${label.toLowerCase()}`}>
          →
        </button>
      </div>
      <div ref={rowRef} className="portfolio-project-row">
        {children}
      </div>
    </div>
  );
}

export function ProjectDataCard({ project }) {
  return (
    <PortfolioProjectCard
      project={project}
      eyebrow={project.tag}
      year={project.timeframe}
      title={project.title}
      copy={project.summary}
      image={getProjectCover(project)}
    />
  );
}

export function PosterCard({ poster, onSelect }) {
  const deskHover = useDeskHover();

  return (
    <article className="portfolio-poster-card portfolio-desk-card portfolio-reveal" {...deskHover}>
      <button type="button" onClick={() => onSelect?.(poster)} aria-label={`View ${poster.title} poster`}>
        <img src={poster.src} alt={poster.title} loading="lazy" decoding="async" />
      </button>
    </article>
  );
}

export function splitProjectTitle(title = "") {
  return splitTitle(title);
}

export function getProjectCover(project = {}) {
  const preferredCovers = {
    "3sixty-integrated-marketing": "/images/3Sixty Socials /1768231836946.jpeg",
    "yellow-bike": "/images/yellow-bike-card-cover.png",
    "civil-goat-coffee": "/images/civil-goat-card-cover.png",
    "atlas-coffee-club": "/images/atlas-card-cover.png",
    "barbican-refresh": "/images/barbican-card-cover.mp4",
    "aluma-skincare": "/images/A_1.png",
    "data-dog-analytics": "/images/DD_6.jpg",
    "ritual-coffee": "/images/Instagram post - 12.png",
    "poster-archive": "/images/poster-card-cover.png",
  };

  return preferredCovers[project.slug] ?? project.heroImage ?? project.cover;
}

function getProjectAlternateCover(project = {}, title = "") {
  const alternateCovers = {
    "3sixty-integrated-marketing": "/images/3Sixty Socials /1755111849129.jpeg",
    "yellow-bike": "/images/yellow-bike-onboarding-flow.png",
    "civil-goat-coffee": "/images/CG_9.png",
    "atlas-coffee-club": "/images/Flavor_Journey_Ad2_1080x1350.png",
    "barbican-refresh": "/images/B_1.png",
    "aluma-skincare": "/images/A_2.png",
    "data-dog-analytics": "/images/DD_12.png",
    "ritual-coffee": "/images/Instagram post - 10.png",
    "poster-archive": "/images/Poster_1.png",
  };

  if (title === "Poster Archive") return "/images/Poster_1.png";

  return alternateCovers[project.slug];
}
