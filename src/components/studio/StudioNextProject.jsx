import { Link } from "react-router-dom";

import RevealOnScroll from "../animations/RevealOnScroll.jsx";
import ParallaxImage from "../animations/ParallaxImage.jsx";
import { splitProjectTitle } from "../../utils/studioText.js";

export default function StudioNextProject({ project }) {
  if (!project) return null;

  const { primary, secondary } = splitProjectTitle(project.title ?? "");
  const cover = project.cover ?? project.heroImage;

  return (
    <RevealOnScroll className="col-span-full overflow-hidden bg-linear-to-b from-stone-50 to-stone-200 px-gutter" preset="section">
      <aside className="relative grid grid-cols-16 gap-gutter">
        <div className="relative col-start-1 -col-end-1 overflow-hidden rounded-t-[1.75rem] bg-black lg:col-start-2 lg:-col-end-2 squircle">
          {cover ? <ParallaxImage src={cover} alt="" className="absolute inset-0 size-full opacity-50" speed={18} reveal={false} /> : null}
          <div className="absolute inset-0 bg-linear-to-b from-black/20 to-black/80" aria-hidden />
        </div>
        <Link
          to={`/projects/${project.slug}`}
          className="relative col-start-2 -col-end-2 row-start-1 self-end py-24 text-stone-100"
          data-cursor="default"
        >
          <div className="text-lg/tight font-bold text-stone-400 opsz-lg">Next project</div>
          <h2 className="mt-4 text-[2.5rem]/11 font-bold opsz-5xl md:text-[3rem]/13 lg:text-[3.625rem]/16">{primary}</h2>
          {secondary ? <p className="mt-2 text-[1.25rem]/7 font-bold text-stone-300 opsz-20">{secondary}</p> : null}
        </Link>
      </aside>
    </RevealOnScroll>
  );
}
