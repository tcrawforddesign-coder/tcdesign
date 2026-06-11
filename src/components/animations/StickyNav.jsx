import { motion } from "framer-motion";
import { useStickyNav } from "../../hooks/useStickyNav.js";

export default function StickyNav({ children, className = "", threshold = 72 }) {
  const { condensed, hidden } = useStickyNav({ threshold });

  return (
    <motion.header
      className={className}
      data-condensed={condensed ? "true" : "false"}
      animate={{
        y: hidden ? "-120%" : "0%",
        scale: condensed ? 0.985 : 1,
      }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.header>
  );
}
