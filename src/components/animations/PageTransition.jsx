import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useAnimate, useReducedMotion } from "framer-motion";

import HalftoneMark from "../../brand/HalftoneMark.jsx";

const ease = [0.76, 0, 0.24, 1];
const COVER = 0.45;
const UNCOVER = 0.6;

/**
 * Route transition: a brand curtain (paper, soft sky glow, the halftone mark)
 * rises over the outgoing page, the route swaps and scroll resets while it is
 * covered, then the curtain lifts away as the new page rises in.
 * Reduced motion gets a short crossfade and no curtain.
 */
export default function PageTransition({ children, routeKey, onSwap }) {
  const reduce = useReducedMotion();
  const [scope, animate] = useAnimate();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (reduce || !scope.current) return;
    animate(scope.current, { y: ["100%", "0%"] }, { duration: COVER, ease });
  }, [routeKey, reduce, animate, scope]);

  const handleExitComplete = () => {
    onSwap?.();
    if (reduce || !scope.current) return;
    animate(scope.current, { y: ["0%", "-100%"] }, { duration: UNCOVER, ease, delay: 0.05 }).then(() => {
      if (scope.current) scope.current.style.transform = "translateY(100%)";
    });
  };

  return (
    <>
      <AnimatePresence mode="wait" initial={false} onExitComplete={handleExitComplete}>
        <motion.div
          key={routeKey}
          className="min-h-full"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0, transition: { duration: reduce ? 0.2 : 0.7, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : 0.2 } }}
          exit={reduce ? { opacity: 0, transition: { duration: 0.15 } } : { opacity: 0.5, y: -32, transition: { duration: COVER, ease } }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <div ref={scope} className="tc-curtain" aria-hidden="true">
        <HalftoneMark size={72} weight="light" tone="soft" />
      </div>
    </>
  );
}
