import { useCallback } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export default function ProjectCardHover({ children, className = "", maxTilt = 8, as = "article", ...props }) {
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), { stiffness: 320, damping: 34 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 320, damping: 34 });
  const x = useSpring(useMotionValue(0), { stiffness: 320, damping: 34 });
  const y = useSpring(useMotionValue(0), { stiffness: 320, damping: 34 });
  const MotionTag = motion[as] ?? motion.div;

  const handleMove = useCallback(
    (event) => {
      if (reduceMotion) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      rotateX.set(maxTilt * (0.5 - py));
      rotateY.set(maxTilt * (px - 0.5));
      x.set((px - 0.5) * rect.width * 0.018);
      y.set((py - 0.5) * rect.height * 0.018);
    },
    [maxTilt, reduceMotion, rotateX, rotateY, x, y],
  );

  const reset = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    x.set(0);
    y.set(0);
  }, [rotateX, rotateY, x, y]);

  return (
    <MotionTag
      className={className}
      data-cursor-zone="tilt-card"
      style={{ transformPerspective: 700, rotateX, rotateY, x, y }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
