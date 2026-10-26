import { useEffect } from "react";

// Everything that rises in as it scrolls into view. Elements nested inside an
// already-revealing element are skipped so nothing animates twice.
const CANDIDATES = [
  ".portfolio-reveal",
  ".tc-strip-card",
  ".tc-project-card",
  ".tc-service",
  ".tc-h2",
  ".portfolio-case-hero",
  ".portfolio-gallery-item",
  ".portfolio-guided-visual-grid > *",
  ".portfolio-asset-grid > *",
  ".portfolio-asset-strip > *",
  ".portfolio-two-up > *",
  ".portfolio-mini-card",
  ".portfolio-metric-card",
  ".portfolio-poster-card",
  ".tc-experiment-card",
  ".portfolio-yellow-survey-card",
  ".portfolio-email-frame",
  ".portfolio-prototype-frame",
  ".portfolio-campaign-gallery-group",
  ".tc-footer-inner",
].join(",");

const ATTR = "data-tc-reveal";
const STAGGER_MS = 70;
const MAX_STAGGER = 6;

/**
 * Site-wide scroll reveal. Watches the app for newly rendered content (route
 * changes, "view more" buttons), tags reveal candidates before they paint, and
 * reveals them with a short stagger as they enter the viewport. Waits for the
 * logo intro to finish on first load. Does nothing under reduced motion, so
 * content is never hidden for those visitors.
 */
export function useScrollReveal() {
  useEffect(() => {
    const root = document.getElementById("root");
    const html = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!root || reduce || !("IntersectionObserver" in window)) return undefined;

    html.classList.add("tc-motion");
    let introDone = !html.classList.contains("tc-intro-on");
    const pending = new Set();

    const reveal = (el, delay = 0) => {
      if (delay) {
        el.style.transitionDelay = `${delay}ms`;
        el.addEventListener(
          "transitionend",
          () => {
            el.style.transitionDelay = "";
          },
          { once: true },
        );
      }
      el.classList.add("is-in");
    };

    const io = new IntersectionObserver(
      (entries) => {
        let order = 0;
        entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
          .forEach((entry) => {
            io.unobserve(entry.target);
            reveal(entry.target, Math.min(order, MAX_STAGGER) * STAGGER_MS);
            order += 1;
          });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );

    const scan = () => {
      root.querySelectorAll(CANDIDATES).forEach((el) => {
        if (el.hasAttribute(ATTR) || !el.closest(".tc-brand")) return;
        if (el.parentElement?.closest(`[${ATTR}]`)) return;
        el.setAttribute(ATTR, "");
        if (introDone) io.observe(el);
        else pending.add(el);
      });
    };

    const onIntroDone = () => {
      if (introDone) return;
      introDone = true;
      pending.forEach((el) => io.observe(el));
      pending.clear();
    };

    // MutationObserver callbacks run before the next paint, so new content is
    // tagged (hidden) before it can flash on screen.
    const mo = new MutationObserver(scan);
    mo.observe(root, { childList: true, subtree: true });
    window.addEventListener("tc:intro-done", onIntroDone);
    scan();
    // Failsafe: if the intro never reports in, start revealing anyway.
    const failsafe = window.setTimeout(onIntroDone, 10000);

    return () => {
      mo.disconnect();
      io.disconnect();
      window.clearTimeout(failsafe);
      window.removeEventListener("tc:intro-done", onIntroDone);
      html.classList.remove("tc-motion");
      root.querySelectorAll(`[${ATTR}]`).forEach((el) => el.classList.add("is-in"));
    };
  }, []);
}
