import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { animate, motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Static ads on a slowly turning ring. Hover pushes an ad toward you, drag or
// the arrows turn the ring, the set chips jump to a campaign, and a click
// opens the ad up close in the middle of the screen.

const DRIFT_DEG_PER_SEC = 3.2;

function flatten(groups) {
  return groups.flatMap((group) =>
    (group.items ?? []).map((item, index) => {
      const src = typeof item === "string" ? item : item.preview ?? item.src ?? item.full;
      const full = typeof item === "string" ? item : item.full ?? src;
      const alt = (typeof item === "string" ? "" : item.alt) || `${group.title}, ad ${index + 1}`;
      return { src, full, alt, set: group.title };
    }),
  );
}

function useCardWidth() {
  const [width, setWidth] = useState(() => (typeof window !== "undefined" && window.innerWidth < 720 ? 150 : 230));
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth < 720 ? 150 : 230);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return width;
}

export default function AdRing({ groups, title }) {
  const ads = useMemo(() => flatten(groups), [groups]);
  const sets = useMemo(() => groups.map((group) => group.title), [groups]);
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(null);

  return (
    <section className="tc-adring-section" aria-labelledby="tc-adring-title">
      <div className="tc-adring-head">
        <h2 id="tc-adring-title" className="tc-h2">
          {title}
        </h2>
        <p className="tc-adring-hint">{reduce ? "Select an ad to see it up close." : "Drag to turn. Click an ad to see it up close."}</p>
      </div>
      {reduce ? (
        <ul className="tc-adring-flat">
          {ads.map((ad, index) => (
            <li key={ad.src + index}>
              <button type="button" className="tc-adring-card" onClick={() => setOpen(index)} aria-label={`Open ${ad.alt}`}>
                <img src={ad.src} alt="" loading="lazy" decoding="async" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <Ring ads={ads} sets={sets} onOpen={setOpen} paused={open !== null} />
      )}
      <Viewer ads={ads} index={open} setIndex={setOpen} />
    </section>
  );
}

function Ring({ ads, sets, onOpen, paused }) {
  const count = ads.length;
  const step = 360 / count;
  const cardWidth = useCardWidth();
  const gap = cardWidth * 0.14;
  const radius = Math.round((cardWidth + gap) / (2 * Math.tan(Math.PI / count)));
  const rotation = useMotionValue(0);
  const transform = useTransform(rotation, (deg) => `translateZ(${-radius}px) rotateY(${deg}deg)`);
  const hovering = useRef(false);
  const drag = useRef(null);
  const justDragged = useRef(false);
  const [activeSet, setActiveSet] = useState(sets[0]);
  const trackRef = useRef(null);

  // Ads round the back of the ring fade out, so only the front arc shows.
  useEffect(() => {
    const paint = (deg) => {
      const items = trackRef.current?.children;
      if (!items) return;
      for (let i = 0; i < items.length; i += 1) {
        const facing = Math.cos(((i * step + deg) * Math.PI) / 180);
        const opacity = Math.min(1, Math.max(0, (facing - 0.35) / 0.3));
        items[i].style.opacity = opacity.toFixed(3);
        items[i].style.visibility = opacity === 0 ? "hidden" : "visible";
      }
    };
    paint(rotation.get());
    return rotation.on("change", paint);
  }, [rotation, step]);

  // Slow drift while nobody is interacting.
  useAnimationFrame((_, delta) => {
    if (paused || hovering.current || drag.current) return;
    rotation.set(rotation.get() - (DRIFT_DEG_PER_SEC * delta) / 1000);
  });

  // Which set sits at the front, for the chips.
  useEffect(
    () =>
      rotation.on("change", (deg) => {
        const front = (((Math.round(-deg / step) % count) + count) % count);
        const set = ads[front]?.set;
        if (set) setActiveSet((current) => (current === set ? current : set));
      }),
    [rotation, step, count, ads],
  );

  const turnTo = useCallback(
    (index) => {
      // Shortest way round to bring this ad to the front.
      const current = rotation.get();
      const target = -index * step;
      const diff = ((((target - current) % 360) + 540) % 360) - 180;
      animate(rotation, current + diff, { type: "spring", stiffness: 70, damping: 18 });
    },
    [rotation, step],
  );

  const nudge = (direction) => {
    const front = Math.round(-rotation.get() / step);
    turnTo((((front + direction) % count) + count) % count);
  };

  const onPointerDown = (event) => {
    drag.current = { x: event.clientX, start: rotation.get(), moved: false, id: event.pointerId };
  };
  const onPointerMove = (event) => {
    if (!drag.current) return;
    const dx = event.clientX - drag.current.x;
    if (Math.abs(dx) > 6 && !drag.current.moved) {
      drag.current.moved = true;
      event.currentTarget.setPointerCapture?.(drag.current.id);
    }
    if (drag.current.moved) rotation.set(drag.current.start + dx * (180 / (Math.PI * radius)));
  };
  const onPointerUp = () => {
    const wasDrag = Boolean(drag.current?.moved);
    drag.current = null;
    justDragged.current = wasDrag;
    if (wasDrag) {
      // Settle on the nearest ad.
      const front = Math.round(-rotation.get() / step);
      animate(rotation, -front * step, { type: "spring", stiffness: 90, damping: 20 });
    }
    return wasDrag;
  };

  return (
    <div className="tc-adring">
      <div className="tc-adring-sets" role="group" aria-label="Ad sets">
        {sets.map((set) => (
          <button
            key={set}
            type="button"
            className={`tc-adring-chip ${set === activeSet ? "is-active" : ""}`}
            aria-pressed={set === activeSet}
            onClick={() => turnTo(ads.findIndex((ad) => ad.set === set))}
          >
            {set.replace(/ ad set$| set$/i, "")}
          </button>
        ))}
      </div>

      <div
        className="tc-adring-stage"
        style={{ "--card-w": `${cardWidth}px` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerEnter={() => (hovering.current = true)}
        onPointerLeave={() => {
          hovering.current = false;
          if (drag.current) onPointerUp();
        }}
      >
        <motion.ul ref={trackRef} className="tc-adring-track" style={{ transform }}>
          {ads.map((ad, index) => (
            <li
              key={ad.src + index}
              className="tc-adring-item"
              style={{ "--a": `${index * step}deg`, "--r": `${radius}px` }}
            >
              <button
                type="button"
                className="tc-adring-card"
                aria-label={`Open ${ad.alt}`}
                onFocus={(event) => {
                  if (event.currentTarget.matches(":focus-visible")) turnTo(index);
                }}
                onClick={() => {
                  if (justDragged.current) {
                    justDragged.current = false;
                    return;
                  }
                  onOpen(index);
                }}
              >
                <img src={ad.src} alt="" loading="lazy" decoding="async" draggable="false" />
              </button>
            </li>
          ))}
        </motion.ul>
      </div>

      <div className="tc-adring-controls">
        <button type="button" className="tc-adring-arrow" onClick={() => nudge(-1)} aria-label="Previous ad">
          <ChevronLeft aria-hidden="true" />
        </button>
        <button type="button" className="tc-adring-arrow" onClick={() => nudge(1)} aria-label="Next ad">
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

// The ad up close, in the middle of the screen.
function Viewer({ ads, index, setIndex }) {
  const isOpen = index !== null;
  const closeRef = useRef(null);
  const returnFocus = useRef(null);
  const reduce = useReducedMotion();

  const go = useCallback(
    (direction) => setIndex((current) => (current === null ? current : (current + direction + ads.length) % ads.length)),
    [ads.length, setIndex],
  );

  useEffect(() => {
    if (!isOpen) return undefined;
    returnFocus.current = document.activeElement;
    const root = document.documentElement;
    root.classList.add("tc-viewer-open");
    window.__studioLenis?.stop?.();
    closeRef.current?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") setIndex(null);
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      root.classList.remove("tc-viewer-open");
      window.__studioLenis?.start?.();
      returnFocus.current?.focus?.({ preventScroll: true });
    };
  }, [isOpen, go, setIndex]);

  if (typeof document === "undefined") return null;
  const ad = isOpen ? ads[index] : null;

  return createPortal(
    <AnimatePresence>
      {ad ? (
        <motion.div
          className="tc-viewer tc-brand"
          role="dialog"
          aria-modal="true"
          aria-label={ad.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) setIndex(null);
          }}
        >
          <button ref={closeRef} type="button" className="tc-viewer-close" onClick={() => setIndex(null)} aria-label="Close">
            <X aria-hidden="true" />
          </button>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.figure
              key={ad.full}
              className="tc-viewer-figure"
              initial={reduce ? false : { opacity: 0, scale: 0.86, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
            >
              <img src={ad.full} alt={ad.alt} />
              <figcaption>
                <span>{ad.set}</span>
                <span>
                  {index + 1} / {ads.length}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
          <button type="button" className="tc-viewer-nav is-prev" onClick={() => go(-1)} aria-label="Previous ad">
            <ChevronLeft aria-hidden="true" />
          </button>
          <button type="button" className="tc-viewer-nav is-next" onClick={() => go(1)} aria-label="Next ad">
            <ChevronRight aria-hidden="true" />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
