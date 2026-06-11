import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

export function useSmoothScroll() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return undefined;

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 0.4,
      autoRaf: false,
      easing: (value) => (value === 1 ? 1 : 1 - Math.pow(2, -10 * value)),
    });

    let frameId = 0;
    window.__studioLenis = lenis;
    document.documentElement.classList.add("lenis");

    const raf = (time) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      if (window.__studioLenis === lenis) {
        delete window.__studioLenis;
      }
      document.documentElement.classList.remove("lenis");
    };
  }, [reduceMotion]);
}
