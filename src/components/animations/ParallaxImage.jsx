import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function ParallaxImage({
  src,
  alt = "",
  className = "",
  imgClassName = "",
  loading = "lazy",
  speed = 44,
  reveal = true,
}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-speed, speed]);
  const scale = reveal ? 1.12 : 1.06;

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={reveal && !reduceMotion ? { clipPath: "inset(9% round 1.75rem)", opacity: 0 } : false}
      whileInView={{ clipPath: "inset(0% round 1.75rem)", opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.img
        src={src}
        alt={alt}
        className={`absolute inset-0 h-[116%] w-full object-cover ${imgClassName}`}
        style={{ y }}
        initial={reveal && !reduceMotion ? { scale } : false}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        loading={loading}
        decoding="async"
      />
    </motion.div>
  );
}
