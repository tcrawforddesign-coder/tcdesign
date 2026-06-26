import { getProjectCover } from "../components/portfolio/PortfolioCards.jsx";
import { projects } from "../data/projects.js";

export const DEFAULT_OG_IMAGE = "/hero-logo.png";

const ROUTE_OG_IMAGES = {
  "/posters": "/images/poster-card-cover.png",
  "/experiments": "/images/experiments/isolate-poster.png",
  "/logo-questionnaire": "/hero-logo.png",
};

function isVideoSrc(src = "") {
  return /\.(mp4|webm|mov)(\?|$)/i.test(src);
}

function toAbsoluteUrl(src, siteOrigin) {
  if (!src) return `${siteOrigin}${DEFAULT_OG_IMAGE}`;
  if (/^https?:\/\//i.test(src)) return src;
  return `${siteOrigin}${src.startsWith("/") ? src : `/${src}`}`;
}

function firstImageSrc(...candidates) {
  return candidates.find((src) => src && !isVideoSrc(src));
}

export function resolveOgImage(pathname, siteOrigin) {
  const projectMatch = pathname.match(/^\/projects\/([^/]+)$/);
  if (projectMatch) {
    const project = projects.find((entry) => entry.slug === projectMatch[1]);
    if (project) {
      const imageSrc = firstImageSrc(getProjectCover(project), project.heroImage, project.cover);
      return toAbsoluteUrl(imageSrc, siteOrigin);
    }
  }

  const routeImage = ROUTE_OG_IMAGES[pathname] ?? DEFAULT_OG_IMAGE;
  return toAbsoluteUrl(routeImage, siteOrigin);
}
