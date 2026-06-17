const CIVIL_GOAT_PORTRAIT_SRCS = new Set([
  "/images/Ad_1.png",
  "/images/Ad_2.png",
  "/images/Ad_3.png",
]);

export function normalizeMediaItem(item, projectSlug) {
  if (!item) return null;

  if (typeof item === "string") {
    return { src: item, alt: "", ...resolveMediaPresentation(item, projectSlug, item) };
  }

  const src = item.preview ?? item.src ?? item.full;
  if (!src) return null;

  return { src, alt: item.alt ?? "", ...resolveMediaPresentation(src, projectSlug, item) };
}

export function getProjectGalleryVariant(project) {
  if (project.galleryLayout === "meta" || project.galleryLayout === "social") {
    return project.galleryLayout;
  }

  if (project.galleryLayout === "contain") {
    return "adaptive";
  }

  return "adaptive";
}

export function getGroupGalleryVariant(project, group = {}) {
  if (group.layout) return group.layout;
  if (project.galleryLayout === "meta") return "meta";
  if (/instagram|social/i.test(group.title ?? "")) return "square";
  return "adaptive";
}

export function resolveMediaPresentation(src, projectSlug, item = {}) {
  if (item.orientation === "square" || item.aspectRatio === "1 / 1") {
    return { orientation: "square", aspectRatio: "1 / 1", objectFit: item.objectFit ?? "cover" };
  }

  if (item.orientation === "portrait" || item.aspectRatio === "4 / 5") {
    return { orientation: "portrait", aspectRatio: "4 / 5", objectFit: item.objectFit ?? "cover" };
  }

  if (item.orientation === "story" || item.aspectRatio === "9 / 16") {
    return { orientation: "story", aspectRatio: "9 / 16", objectFit: item.objectFit ?? "cover" };
  }

  if (item.orientation === "landscape" || item.aspectRatio === "16 / 9") {
    return { orientation: "landscape", aspectRatio: "16 / 9", objectFit: item.objectFit ?? "cover" };
  }

  if (item.orientation === "natural") {
    return { orientation: "natural", objectFit: item.objectFit ?? "contain" };
  }

  if (projectSlug === "civil-goat-coffee" && CIVIL_GOAT_PORTRAIT_SRCS.has(src)) {
    return { orientation: "portrait", aspectRatio: "4 / 5", objectFit: "cover" };
  }

  if (projectSlug === "atlas-coffee-club") {
    return { orientation: "portrait", aspectRatio: "4 / 5", objectFit: item.objectFit ?? "cover" };
  }

  return inferMediaPresentation(src);
}

function inferMediaPresentation(src) {
  const normalized = src.toLowerCase();

  if (/\b1080x1920\b|_9x16|story/.test(normalized)) {
    return { orientation: "story", aspectRatio: "9 / 16", objectFit: "cover" };
  }

  if (/\b1080x1350\b|_4x5|\/ad_\d|\/9pm_coffee_ad/.test(normalized)) {
    return { orientation: "portrait", aspectRatio: "4 / 5", objectFit: "cover" };
  }

  if (/instagram post|\/smile\.png|\/frown\.png/.test(normalized)) {
    return { orientation: "square", aspectRatio: "1 / 1", objectFit: "cover" };
  }

  if (/\/hdh\d*\.png|\/hdh\.png/.test(normalized)) {
    return { orientation: "landscape", aspectRatio: "16 / 9", objectFit: "contain" };
  }

  if (/\/(cg_|b_|dd_|a_)\d|dd_\d+\./.test(normalized)) {
    return { orientation: "landscape", aspectRatio: "16 / 9", objectFit: "cover" };
  }

  if (/gallery-2|gallery-3|alena-stepanova/.test(normalized)) {
    return { orientation: "portrait", aspectRatio: "3 / 4", objectFit: "cover" };
  }

  if (/gallery-\d|unsplash|texture\.jpg|community-\d|existing logo|proposed logo/.test(normalized)) {
    return { orientation: "landscape", aspectRatio: "3 / 2", objectFit: "cover" };
  }

  if (/yellow-bike-(onboarding|event-challenges)/.test(normalized)) {
    return { orientation: "story", aspectRatio: "9 / 16", objectFit: "contain" };
  }

  if (/yellow-bike/.test(normalized)) {
    return { orientation: "landscape", aspectRatio: "16 / 9", objectFit: "contain" };
  }

  if (/3sixty socials|3fact\d|\.jpeg$/.test(normalized)) {
    return { orientation: "square", aspectRatio: "1 / 1", objectFit: "cover" };
  }

  return { orientation: "landscape", aspectRatio: "16 / 9", objectFit: "cover" };
}
