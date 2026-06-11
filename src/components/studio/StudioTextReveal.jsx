import { motion } from "framer-motion";
import { tokenIsInPhrases } from "../../utils/studioText.js";

export function StudioLineReveal({ lines, highlights = [], serifHighlights = [], immediate = false }) {
  return (
    <>
      {lines.map((line, index) => (
        <div key={`${line}-${index}`} className={index === 0 ? "indent-[2.5rem] sm:indent-[3rem]" : ""}>
          <StudioTextReveal text={line} highlights={highlights} serifHighlights={serifHighlights} immediate={immediate && index === 0} />
        </div>
      ))}
    </>
  );
}

export function StudioTextReveal({ text, highlights = [], serifHighlights = [], immediate = false }) {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <p className="m-0">
      {words.map((word, index) => {
        const serif = tokenIsInPhrases(words, serifHighlights, index);
        return (
          <motion.span
            key={`${word}-${index}`}
            className={`${serif ? "font-serif italic" : ""} inline-block`}
            initial={immediate ? { opacity: 0, y: "0.35em", filter: "blur(0.25rem)" } : { opacity: 0.12 }}
            animate={immediate ? { opacity: 1, y: 0, filter: "blur(0rem)" } : undefined}
            whileInView={immediate ? undefined : { opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.55, delay: Math.min(index * 0.018, 0.4), ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {index < words.length - 1 ? "\u00a0" : ""}
          </motion.span>
        );
      })}
    </p>
  );
}

export function StudioScrollWords({ text, serifHighlights = [] }) {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className={`${tokenIsInPhrases(words, serifHighlights, index) ? "font-serif italic" : ""} inline-block mr-[0.22em]`}
          initial={{ opacity: 0.12 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-5% 0px" }}
          transition={{ duration: 0.35, delay: Math.min(index * 0.012, 0.35) }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}
