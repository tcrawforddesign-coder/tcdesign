import { splitProjectTitle } from "../../utils/studioText.js";
import StudioVisitPill from "./StudioVisitPill.jsx";

export default function StudioMetadataPanel({ project }) {
  const { primary } = splitProjectTitle(project.title ?? "");
  const client = project.client ?? primary;
  const collaborators = project.team?.length ? project.team.join(", ") : project.roles?.join(" · ");

  return (
    <section className="col-span-full -mx-3 mb-24 grid grid-cols-16 gap-gutter rounded-b-[1.75rem] bg-stone-200 px-3 pt-24 -mt-24 squircle">
      <aside className="col-start-2 -col-end-2 grid grid-cols-1 gap-gutter pb-24 text-xl font-bold opsz-xl md:grid-cols-2 lg:col-start-4 lg:-col-end-4">
        <div className="flex flex-col gap-gutter-2">
          <div className="flex flex-col gap-2">
            <div className="text-lg/tight font-bold text-stone-500 opsz-lg">Client</div>
            {client}
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg/tight font-bold text-stone-500 opsz-lg">Year</div>
            {project.timeframe ?? "2024"}
          </div>
          {collaborators ? (
            <div className="flex flex-col gap-2">
              <div className="text-lg/tight font-bold text-stone-500 opsz-lg">Collaborations</div>
              {collaborators}
            </div>
          ) : null}
          {project.href ? <StudioVisitPill href={project.href} className="mt-auto self-start" /> : null}
        </div>
        <div className="flex flex-col gap-gutter-2">
          {project.roles?.length ? (
            <div className="flex flex-col gap-2">
              <div className="text-lg/tight font-bold text-stone-500 opsz-lg">Role</div>
              {project.roles.join(", ")}
            </div>
          ) : null}
          {project.tools?.length ? (
            <div className="flex flex-col gap-2">
              <div className="text-lg/tight font-bold text-stone-500 opsz-lg">Tools</div>
              {project.tools.join(", ")}
            </div>
          ) : null}
        </div>
      </aside>
    </section>
  );
}
