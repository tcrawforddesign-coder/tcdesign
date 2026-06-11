import { Linkedin, Mail } from "lucide-react";

export default function StudioContactBlock({ className = "" }) {
  return (
    <aside id="contact" className={`col-span-full mt-gutter grid grid-cols-16 gap-x-gutter gap-y-gutter-2 rounded-[1.75rem] bg-black py-28 text-stone-100 squircle ${className}`}>
      <div className="col-start-3 -col-end-3">
        <h2 className="text-[2.5rem]/11 font-bold opsz-5xl md:text-[3rem]/13 lg:text-[3.625rem]/16 xl:text-[4.5rem]/20">
          Let&apos;s work <span className="font-serif italic">together!</span>
        </h2>
      </div>
      <div className="col-start-3 -col-end-3 text-[1.25rem]/7 font-bold opsz-20 md:text-[1.5rem]/8 lg:col-end-9 lg:text-[1.75rem]/9">
        Have an idea, a launch, or just need thoughtful design help? <span className="font-serif italic">Drop me a note!</span>
      </div>
      <div className="col-start-3 -col-end-3 flex flex-col gap-gutter self-end lg:col-start-9 lg:flex-row lg:justify-end">
        <a href="mailto:tcrawford.design@gmail.com" className="pointer-events-auto flex flex-row items-center gap-gutter text-[1.25rem]/7 font-bold opsz-20 md:text-[1.5rem]/8 lg:text-[1.75rem]/9" data-cursor="default">
          tcrawford.design@gmail.com <Mail className="h-[1em] w-[1em]" />
        </a>
        <a href="https://www.linkedin.com/in/travis-crawford-67759b24a" className="pointer-events-auto flex flex-row items-center gap-gutter text-[1.25rem]/7 font-bold opsz-20 md:text-[1.5rem]/8 lg:text-[1.75rem]/9" data-cursor="default">
          LinkedIn <Linkedin className="h-[1em] w-[1em]" />
        </a>
      </div>
    </aside>
  );
}
