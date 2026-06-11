import RevealOnScroll from "../animations/RevealOnScroll.jsx";

export default function StudioHeroMedia({ project }) {
  const media = project.heroVideo ?? project.heroImage ?? project.cover;

  return (
    <RevealOnScroll className="col-span-full my-24" preset="image">
      <div className="relative grid grid-cols-16 gap-gutter bg-linear-to-b from-stone-200/0 to-stone-200 px-gutter">
        <div className="relative col-start-2 -col-end-2 aspect-[1.85294] overflow-hidden rounded-[1.75rem] shadow-2xl squircle">
          {project.heroVideo ? (
            <video className="absolute inset-0 size-full object-cover" autoPlay muted loop playsInline>
              <source src={project.heroVideo} type="video/mp4" />
            </video>
          ) : media ? (
            <img src={media} alt={`${project.title} hero`} className="absolute inset-0 size-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-stone-300" aria-hidden />
          )}
          <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-linear-to-br from-current/20 via-current/0 to-current/20 p-px text-white squircle" aria-hidden />
        </div>
      </div>
    </RevealOnScroll>
  );
}
