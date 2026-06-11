import RevealOnScroll from "../animations/RevealOnScroll.jsx";
import ParallaxImage from "../animations/ParallaxImage.jsx";

function normalizeItem(item, fallbackAlt) {
  if (!item) return null;
  if (typeof item === "string") return { src: item, alt: fallbackAlt };
  const src = item.preview ?? item.src ?? item.full;
  if (!src) return null;
  return { src, alt: item.alt ?? fallbackAlt };
}

export default function StudioGalleryTiles({ items = [], title = "Gallery" }) {
  const normalized = items.map((item, index) => normalizeItem(item, `${title} ${index + 1}`)).filter(Boolean);
  if (!normalized.length) return null;

  return (
    <RevealOnScroll className="relative col-start-1 -col-end-1 mb-24 grid grid-cols-4 gap-gutter lg:col-start-3 lg:-col-end-3" preset="section">
      <h2 className="sr-only">{title}</h2>
      <div className="absolute left-1/2 top-1/2 aspect-square h-[80%] w-auto -translate-1/2 rounded-full bg-stone-200 blur-md" aria-hidden />
      {normalized.map((item, index) => {
        const span = index === 0 ? "col-span-2 row-span-2" : index % 5 === 3 ? "col-span-2" : "col-span-1";
        return (
          <div key={`${item.src}-${index}`} className={`relative aspect-square overflow-hidden rounded-[1.75rem] squircle ${span}`}>
            <ParallaxImage src={item.src} alt={item.alt} className="size-full" speed={20 + (index % 3) * 8} reveal={index < 4} />
            <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-linear-to-br from-current/20 via-current/0 to-current/20 p-px text-white squircle" aria-hidden />
          </div>
        );
      })}
    </RevealOnScroll>
  );
}
