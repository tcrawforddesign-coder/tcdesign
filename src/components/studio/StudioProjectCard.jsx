import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";

import ParallaxImage from "../animations/ParallaxImage.jsx";
import ProjectCardHover from "../animations/ProjectCardHover.jsx";
import { splitProjectTitle } from "../../utils/studioText.js";

export default function StudioProjectCard({ project, className = "", index = 0, maxTilt = 8 }) {
  const reduceMotion = useReducedMotion();
  const { primary, secondary } = splitProjectTitle(project.title ?? "");
  const linkTarget = project.href ?? (project.slug ? `/projects/${project.slug}` : "#");

  return (
    <ProjectCardHover
      as="article"
      className={`group relative grid aspect-square select-none grid-cols-1 overflow-hidden rounded-[1.75rem] text-base/6 font-semibold squircle ${className}`}
      maxTilt={maxTilt}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.15 }}
    >
      {project.cover ? (
        <ParallaxImage
          src={project.cover}
          className="absolute inset-0 h-full w-full"
          loading={index === 0 ? "eager" : "lazy"}
          speed={index === 0 || index === 3 ? 22 : 36}
          reveal={false}
        />
      ) : (
        <div className="absolute inset-0 bg-stone-300" aria-hidden />
      )}
      <div className="absolute -inset-2 flex flex-col justify-between bg-linear-to-b from-black/40 via-black/0 to-black/40 px-10 py-8">
        <h3>
          <Link to={linkTarget} className="after:absolute after:inset-0" data-cursor="default">
            {primary}
          </Link>
        </h3>
        <div className="overflow-hidden text-ellipsis whitespace-nowrap">{secondary || project.tag}</div>
      </div>
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-white/0 via-white/10 to-white/0 transition duration-700 group-hover:translate-x-full" aria-hidden />
    </ProjectCardHover>
  );
}
