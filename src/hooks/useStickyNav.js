import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function useStickyNav({ threshold = 72 } = {}) {
  const reduceMotion = useReducedMotion();
  const [state, setState] = useState({ condensed: false, hidden: false, scrollY: 0 });

  useEffect(() => {
    let previousY = window.scrollY;

    const update = () => {
      const nextY = window.scrollY;
      const scrollingDown = nextY > previousY;
      setState({
        condensed: nextY > threshold,
        hidden: !reduceMotion && scrollingDown && nextY > threshold * 2,
        scrollY: nextY,
      });
      previousY = nextY;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [reduceMotion, threshold]);

  return state;
}
