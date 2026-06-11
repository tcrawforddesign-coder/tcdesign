import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";

import StickyNav from "../animations/StickyNav.jsx";

export default function StudioHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "America/Chicago",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    };
    update();
    const interval = window.setInterval(update, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <StickyNav className="pointer-events-none fixed left-gutter right-gutter top-12 z-999 grid grid-cols-16 items-center gap-x-gutter tabular-nums">
      <div className="pointer-events-auto fixed left-gutter top-9 col-start-1 col-end-3 mx-auto flex aspect-square w-20 rounded-[1.75rem] bg-cloud-dancer-lighter/70 shadow-2xl backdrop-blur-md squircle md:relative md:left-auto md:top-auto md:w-24 md:max-w-full">
        <Link to="/" className="relative m-auto flex size-14 max-h-15/24 max-w-15/24 items-center justify-center rounded-full font-bold" aria-label="Travis Crawford home" data-cursor="default">
          TC
        </Link>
        <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-linear-to-br from-white via-cloud-dancer-light/0 to-cloud-dancer p-px text-white squircle" aria-hidden />
      </div>
      <div className="hidden col-start-4 col-end-7 flex-row items-center gap-1.5 text-[0.875rem]/5 font-semibold opsz-16 tabular-nums lg:flex">
        San Antonio <span>{time}</span>
      </div>
      <div className="hidden col-start-7 col-end-10 text-[0.875rem]/5 font-semibold opsz-16 lg:block">
        <a href="mailto:tcrawford.design@gmail.com" className="pointer-events-auto" data-cursor="default">
          tcrawford.design@gmail.com
        </a>
      </div>
      <div id="site-header" className="relative col-start-1 col-end-17 flex flex-row justify-end md:col-start-10 md:pr-indent-05">
        {menuOpen ? <button className="pointer-events-auto fixed inset-0 z-10 bg-transparent" aria-label="Close navigation backdrop" type="button" onClick={() => setMenuOpen(false)} /> : null}
        <div className="pointer-events-auto relative flex max-w-full flex-row-reverse items-center rounded-[1.75rem] bg-cloud-dancer-lighter/70 px-2 shadow-2xl backdrop-blur-md squircle">
          <div className="flex md:hidden">
            <button type="button" className="pointer-events-auto my-2 grid h-10 w-10 place-items-center rounded-full" aria-label="Open navigation" onClick={() => setMenuOpen((value) => !value)} data-cursor="pointer">
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
          <nav className={`${menuOpen ? "flex" : "hidden"} z-20 flex-col items-start gap-1 overflow-hidden md:flex md:flex-row md:items-center md:gap-4`}>
            <Link to="/projects" className="mt-4 w-[calc(100lvw-2.5rem)] rounded-[1.75rem] px-gutter text-center text-lg font-bold opsz-lg squircle md:mt-2 md:w-auto md:px-4 md:ml-gutter" data-cursor="default" onClick={() => setMenuOpen(false)}>
              Projects
            </Link>
            <Link to="/posters" className="my-2 w-[calc(100lvw-2.5rem)] rounded-[1.75rem] px-gutter text-center text-lg font-bold opsz-lg squircle md:my-0 md:w-auto md:px-4" data-cursor="default" onClick={() => setMenuOpen(false)}>
              Posters
            </Link>
            <a href="/#about" className="my-2 w-[calc(100lvw-2.5rem)] rounded-[1.75rem] px-gutter text-center text-lg font-bold opsz-lg squircle md:my-0 md:w-auto md:px-4" data-cursor="default" onClick={() => setMenuOpen(false)}>
              Studio
            </a>
            <a href="mailto:tcrawford.design@gmail.com" className="my-2 mr-1 flex h-10 w-[calc(100lvw-2.5rem)] flex-row items-center justify-center gap-2 rounded-[1.75rem] bg-black pl-4 pr-3 text-lg font-bold text-stone-100 opsz-lg squircle md:my-0 md:w-auto" data-cursor="default">
              Hi! <ArrowUpRight className="h-4 w-4" />
            </a>
          </nav>
          <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-linear-to-br from-white via-cloud-dancer-light/0 to-cloud-dancer p-px text-white squircle" aria-hidden />
        </div>
      </div>
    </StickyNav>
  );
}
