import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

// Scroll-driven motion for the site. Everything here reads scroll position
// through Motion values (no React state per frame), and each piece renders a
// still version when the visitor has reduced motion turned on.

const SPRING = { stiffness: 140, damping: 26, mass: 0.6 };

// Hero: as the page scrolls, the copy lifts and fades while the dot field
// drifts more slowly behind it, so the two separate in depth.
export function HeroParallax({ field, children, className = "", ...rest }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const copyScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const fieldY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section ref={ref} className={className} {...rest}>
      <motion.div className="tc-parallax-field" style={reduce ? undefined : { y: fieldY }}>
        {field}
      </motion.div>
      <motion.div
        className="tc-wave-hero-inner"
        style={reduce ? undefined : { y: copyY, opacity: copyOpacity, scale: copyScale, transformOrigin: "0% 100%" }}
      >
        {children}
      </motion.div>
    </section>
  );
}

// The opening project: a framed image that grows to fill the screen as you
// scroll into it, then its title rises in over the photo.
export function ShowcaseReveal({ project, image, alt, to, label }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const p = useSpring(scrollYProgress, SPRING);
  const scale = useTransform(p, [0, 0.62], [0.74, 1]);
  const radius = useTransform(p, [0, 0.62], [36, 0]);
  const imageScale = useTransform(p, [0, 1], [1.18, 1]);
  const captionOpacity = useTransform(p, [0.55, 0.8], [0, 1]);
  const captionY = useTransform(p, [0.55, 0.85], [40, 0]);

  if (reduce) {
    return (
      <section ref={ref} className="tc-showcase is-static" aria-label={`Featured project: ${project}`}>
        <Link to={to} className="tc-showcase-frame">
          <img src={image} alt={alt} decoding="async" />
          <span className="tc-showcase-caption">
            <span className="tc-showcase-label">{label}</span>
            <span className="tc-showcase-title">
              {project}
              <span className="tc-dot">.</span>
            </span>
          </span>
        </Link>
      </section>
    );
  }

  return (
    <section ref={ref} className="tc-showcase" aria-label={`Featured project: ${project}`}>
      <div className="tc-showcase-sticky">
        <motion.div className="tc-showcase-frame" style={{ scale, borderRadius: radius }}>
          <Link to={to} className="tc-showcase-link">
            <motion.img src={image} alt={alt} decoding="async" style={{ scale: imageScale }} />
            <motion.span className="tc-showcase-caption" style={{ opacity: captionOpacity, y: captionY }}>
              <span className="tc-showcase-label">{label}</span>
              <span className="tc-showcase-title">
                {project}
                <span className="tc-dot">.</span>
              </span>
              <span className="tc-showcase-cta">View the case study</span>
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// A statement that lights up one word at a time as it scrolls through the
// middle of the screen. Screen readers get the plain sentence.
export function ScrollWords({ text, as: Tag = "p", className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const words = text.split(" ");

  if (reduce) {
    return (
      <Tag ref={ref} className={className}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, index) => {
        const start = index / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={`${word}-${index}`} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </Tag>
  );
}

function Word({ progress, range, children }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <span className="tc-word" aria-hidden="true">
      <motion.span style={{ opacity }}>{children}</motion.span>{" "}
    </span>
  );
}

// Media that drifts inside its frame as the frame scrolls past, so the frame
// reads as a window onto the image.
export function ParallaxMedia({ children, distance = 7, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${distance}%`, `${distance}%`]);

  return (
    <div ref={ref} className={`tc-parallax-media ${className}`.trim()}>
      <motion.div className="tc-parallax-inner" style={reduce ? undefined : { y, scale: 1 + (distance * 2.4) / 100 }}>
        {children}
      </motion.div>
    </div>
  );
}

// A gentle pull toward the cursor on primary buttons. Mouse and trackpad
// only: touch screens and reduced motion get the plain button.
export function Magnetic({ children, strength = 0.28 }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  if (reduce) return children;

  const onMove = (event) => {
    if (event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (box.left + box.width / 2)) * strength);
    y.set((event.clientY - (box.top + box.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span className="tc-magnetic" style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.span>
  );
}

// Case-study cover: starts slightly inset and settles to full width as it
// scrolls up, with the image easing back inside it.
export function CaseCover({ children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.25"] });
  const p = useSpring(scrollYProgress, SPRING);
  const scale = useTransform(p, [0, 1], [0.92, 1]);
  const inner = useTransform(p, [0, 1], [1.12, 1]);

  return (
    <motion.section ref={ref} className="portfolio-case-hero tc-case-cover" style={reduce ? undefined : { scale }}>
      <div className="tc-case-cover-clip">
        <motion.div className="tc-case-cover-inner" style={reduce ? undefined : { scale: inner }}>
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
}

// Thin progress line under the header on long case studies.
export function ReadingProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  if (reduce) return null;
  return <motion.div className="tc-reading-progress" style={{ scaleX }} aria-hidden="true" />;
}
