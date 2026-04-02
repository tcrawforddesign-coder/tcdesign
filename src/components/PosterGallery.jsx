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
  project = null,
}) {
  const curated = useMemo(() => normalizePosters(posters), [posters]);
  const [order, setOrder] = useState(curated);
  const [selected, setSelected] = useState(null);
  const [loadedPosterIds, setLoadedPosterIds] = useState(() => new Set());
  const [visibleCount, setVisibleCount] = useState(() => {
    const initial =
      variant === "expanded"
        ? Math.min(12, curated.length)
        : Math.min(8, curated.length);
    return initial || curated.length;
  });
  const loadMoreRef = useRef(null);
  const batchSize = variant === "expanded" ? 9 : 6;

  useEffect(() => {
    setOrder(curated);
  }, [curated]);

  useEffect(() => {
    setLoadedPosterIds(new Set());
  }, [curated]);

  useEffect(() => {
    setVisibleCount((prev) => {
      const base =
        variant === "expanded"
          ? Math.min(12, curated.length)
          : Math.min(8, curated.length);

      if (!base) return curated.length;
      if (prev > curated.length) {
        return curated.length;
      }
      if (prev < base) {
        return base;
      }
      return prev;
    });
  }, [curated.length, variant]);

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

  useEffect(() => {
    if (!loadMoreRef.current) return undefined;
    if (visibleCount >= order.length) return undefined;

    const element = loadMoreRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCount((count) =>
              Math.min(count + batchSize, order.length),
            );
          }
        });
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [batchSize, order.length, visibleCount]);

  const visiblePosters = useMemo(
    () => order.slice(0, visibleCount),
    [order, visibleCount],
  );

  const markPosterLoaded = (posterId) => {
    setLoadedPosterIds((prev) => {
      if (prev.has(posterId)) return prev;
      const next = new Set(prev);
      next.add(posterId);
      return next;
    });
  };

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
        {(visiblePosters.length && !project?.confidential) ? (
          <div className="poster-gallery__scroll" role="list">
            {visiblePosters.map((poster, index) => (
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
                  aria-label={`View poster ${index + 1}`}
                >
                  <div
                    className={`poster-gallery__image-placeholder ${
                      loadedPosterIds.has(poster.id) ? "poster-gallery__image-placeholder--hidden" : ""
                    }`}
                    aria-hidden
                  />
                  <img
                    src={poster.src}
                    alt={poster.title}
                    className={`poster-gallery__image ${loadedPosterIds.has(poster.id) ? "poster-gallery__image--loaded" : ""}`}
                    loading={index < 6 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={index < 2 ? "high" : "auto"}
                    onLoad={() => markPosterLoaded(poster.id)}
                    onError={() => markPosterLoaded(poster.id)}
                  />
                </button>
              </figure>
            ))}
          </div>
        ) : (
          <div className="poster-gallery__placeholder">
            <p className="poster-gallery__placeholder-label">
              {project?.confidentialMessage ?? "Assets redacted until launch."}
            </p>
          </div>
        )}
        {visibleCount < order.length ? (
          <div className="poster-gallery__load-more">
            <button
              type="button"
              className="poster-gallery__load-more-button"
              onClick={() =>
                setVisibleCount((count) =>
                  Math.min(count + batchSize, order.length),
                )
              }
            >
              Load more posters ({order.length - visibleCount} remaining)
            </button>
            <div ref={loadMoreRef} aria-hidden />
          </div>
        ) : null}
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
          <img src={poster.src} alt={poster.title} loading="lazy" decoding="async" />
        </div>
        <div className="poster-modal__info" aria-hidden>
          <span className="poster-modal__tag">
            Poster {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}


