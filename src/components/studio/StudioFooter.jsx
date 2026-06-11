import { Link } from "react-router-dom";

export default function StudioFooter() {
  return (
    <footer className="flex flex-col gap-12 bg-black pb-12 text-stone-400">
      <div className="h-7 rounded-b-[1.75rem] bg-stone-50 squircle" />
      <div className="col-span-full grid grid-cols-16 items-center gap-gutter px-gutter">
        <Link to="/" className="col-span-full mx-auto grid size-10 place-items-center rounded-full font-bold text-stone-100 lg:col-span-2" data-cursor="default">
          TC
        </Link>
        <div className="col-span-full mt-6 flex flex-col items-center gap-gutter-2 lg:col-start-3 lg:-col-end-2 lg:mt-0 lg:flex-row lg:gap-gutter-3">
          <Link to="/projects" className="font-bold opsz-lg lg:ml-auto" data-cursor="default">
            Projects
          </Link>
          <Link to="/posters" className="font-bold opsz-lg" data-cursor="default">
            Posters
          </Link>
          <a href="/#about" className="font-bold opsz-lg" data-cursor="default">
            Studio
          </a>
          <a href="mailto:tcrawford.design@gmail.com" className="font-bold opsz-lg text-stone-100" data-cursor="default">
            tcrawford.design@gmail.com
          </a>
        </div>
        <div className="col-start-3 -col-end-3 mt-6 text-center text-sm font-bold opsz-sm tabular-nums">© 2026 TC Design</div>
      </div>
    </footer>
  );
}
