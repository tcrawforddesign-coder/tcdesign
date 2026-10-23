import { useEffect, useState } from "react";

import HalftoneMark from "./HalftoneMark.jsx";

const SEEN_KEY = "tc-intro-seen";
const HOLD_MS = 1750; // logo builds, red point lands, name appears
const EXIT_MS = 550;

function shouldPlay() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return window.sessionStorage.getItem(SEEN_KEY) !== "1";
  } catch {
    return true;
  }
}

// Plays once per visit: the halftone mark builds itself in the middle of the
// screen, then the cover lifts and the page rises in behind it. Any click or
// key skips it.
export default function IntroOverlay() {
  const [stage, setStage] = useState(() => (shouldPlay() ? "in" : "done"));

  // Runs once on mount, only when the intro is playing.
  useEffect(() => {
    if (stage !== "in") return undefined;
    const root = document.documentElement;
    root.classList.add("tc-intro-active");
    try {
      window.sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* private mode: the intro may replay, which is fine */
    }

    const leave = () => setStage((current) => (current === "in" ? "out" : current));
    const holdTimer = window.setTimeout(leave, HOLD_MS);
    window.addEventListener("pointerdown", leave, { once: true });
    window.addEventListener("keydown", leave, { once: true });
    return () => {
      window.clearTimeout(holdTimer);
      window.removeEventListener("pointerdown", leave);
      window.removeEventListener("keydown", leave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (stage !== "out") return undefined;
    // Let the page rise as the cover lifts.
    document.documentElement.classList.remove("tc-intro-active");
    const exitTimer = window.setTimeout(() => setStage("done"), EXIT_MS);
    return () => window.clearTimeout(exitTimer);
  }, [stage]);

  if (stage === "done") return null;

  return (
    <div className={`tc-intro ${stage === "out" ? "is-leaving" : ""}`} aria-hidden="true">
      <div className="tc-intro-lockup">
        <HalftoneMark size={132} animated />
        <span className="tc-intro-word">
          Travis Crawford<span className="tc-dot">.</span>
        </span>
      </div>
    </div>
  );
}
