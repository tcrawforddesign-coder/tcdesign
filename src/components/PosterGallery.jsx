import { useEffect, useMemo, useRef, useState } from "react";

function normalizePosters(posters) {
  return posters
    .filter(Boolean)
    .map((poster, index) => {
      if (typeof poster === "string") {
        return {
          id: `poster-${index + 1}`,
          src: poster,
          title: `Poster ${index + 1}`,
          year: undefined,
          colorMode: undefined,
        };
      }
      return {
        id: poster.id ?? `poster-${index + 1}`,
        src: poster.src,
        title: poster.title ?? `Poster ${index + 1}`,
        year: poster.year,
        colorMode: poster.colorMode,
      };
    })
    .filter((poster) => Boolean(poster.src));
}

export default function PosterGallery({
  posters = [],
  title = "Poster archive",
  enableShuffle = true,
  variant = "compact",
}) {
  const curated = useMemo(() => normalizePosters(posters), [posters]);
  const [order, setOrder] = useState(curated);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setOrder(curated);
  }, [curated]);

  const rotations = useMemo(() => [-4.5, 2.5, 1.5, -2.5, 0.75], []);

  const shufflePosters = () => {
    setOrder((prev) => {
      const next = [...prev];
      for (let i = next.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
      }
      return next;
    });
  };

  useEffect(() => {
    if (selected) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
    return undefined;
  }, [selected]);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") {
        setSelected(null);
      }
    };
    if (selected) {
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
    return undefined;
  }, [selected]);

  return (
    <>
      <section className={`poster-gallery ${variant === "expanded" ? "poster-gallery--expanded" : ""}`}>
        <header className="poster-gallery__header">
          <div className="poster-gallery__title">
            {title}
            <span>{String(order.length).padStart(2, "0")} pieces</span>
          </div>
          {enableShuffle ? (
            <button type="button" className="poster-gallery__shuffle" onClick={shufflePosters}>
              Shuffle
            </button>
          ) : null}
        </header>
        <div className="poster-gallery__scroll" role="list">
          {order.map((poster, index) => (
            <figure
              key={poster.id}
              role="listitem"
              className="poster-gallery__item"
              style={{ "--poster-rotation": `${rotations[index % rotations.length]}deg` }}
            >
              <button
                type="button"
                className="poster-gallery__button"
                onClick={() => setSelected({ poster, index })}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelected({ poster, index });
                  }
                }}
                aria-label={`View ${poster.title ?? `poster ${index + 1}`}`}
              >
                <img src={poster.src} alt={poster.title ?? `Poster ${index + 1}`} loading="lazy" decoding="async" />
              </button>
            </figure>
          ))}
        </div>
      </section>
      {selected ? (
        <PosterLightbox
          poster={selected.poster}
          index={selected.index}
          total={order.length}
          onClose={() => setSelected(null)}
        />
      ) : null}
    </>
  );
}

function PosterLightbox({ poster, onClose, index, total }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();
    return () => {
      if (previouslyFocused && previouslyFocused.focus) {
        previouslyFocused.focus();
      }
    };
  }, []);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="poster-modal" role="dialog" aria-modal="true" onClick={handleBackdropClick}>
      <div className="poster-modal__backdrop" />
      <div className="poster-modal__content">
        <button
          type="button"
          className="poster-modal__close poster-modal__close--floating"
          onClick={onClose}
          ref={closeButtonRef}
          aria-label="Close poster"
        >
          Close
        </button>
        <div className="poster-modal__image">
          <img src={poster.src} alt={poster.title ?? "Poster detail"} loading="lazy" decoding="async" />
        </div>
        <div className="poster-modal__info">
          <span className="poster-modal__tag">
            Poster {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>
          <span className="poster-modal__caption">
            {poster.title}
            {poster.year ? ` — ${poster.year}` : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

