import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export default function PageTransition({ children, routeKey }) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={routeKey}
          className="min-h-full"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, filter: "blur(0.18rem)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0rem)" }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, filter: "blur(0.18rem)" }}
          transition={{ duration: 0.28, ease }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      {!reduceMotion ? (
        <motion.div
          key={`swipe-${routeKey}`}
          aria-hidden
          className="route-blur-swipe"
          initial={{ y: "-45vh", opacity: 0 }}
          animate={{ y: "115vh", opacity: [0, 1, 0] }}
          transition={{ duration: 0.82, ease }}
        />
      ) : null}
    </>
  );
}
