import { motion, useReducedMotion } from "framer-motion";

const presets = {
  text: {
    hidden: { opacity: 0, y: 24, filter: "blur(0.35rem)" },
    visible: { opacity: 1, y: 0, filter: "blur(0rem)" },
  },
  image: {
    hidden: { opacity: 0, scale: 1.06, clipPath: "inset(10% round 1.75rem)", filter: "blur(0.35rem)" },
    visible: { opacity: 1, scale: 1, clipPath: "inset(0% round 1.75rem)", filter: "blur(0rem)" },
  },
  section: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
};

export default function RevealOnScroll({
  children,
  className = "",
  preset = "section",
  delay = 0,
  duration = 0.72,
  once = true,
  amount = 0.22,
}) {
  const reduceMotion = useReducedMotion();
  const variants = presets[preset] ?? presets.section;

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once, amount, margin: "-8% 0px" }}
      variants={variants}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
