import RevealOnScroll from "../animations/RevealOnScroll.jsx";
import ParallaxImage from "../animations/ParallaxImage.jsx";

export default function StudioFeatureSplit({ title, copy, image, imageAlt = "", reverse = false }) {
  if (!title && !copy && !image) return null;

  return (
    <RevealOnScroll className="col-span-full mb-24 grid grid-cols-16 gap-gutter bg-linear-to-b from-stone-200 to-stone-50 px-gutter pt-24" preset="section">
      <div className={`col-start-2 -col-end-2 flex flex-col justify-center gap-9 self-start pb-12 lg:col-span-6 lg:min-h-lvh lg:pl-indent-1 lg:pb-0 ${reverse ? "lg:col-start-11" : "lg:col-start-1"}`}>
        {title ? <h2 className="text-[2.5rem]/11 font-bold opsz-24">{title}</h2> : null}
        {copy ? <p className="text-[1.25rem]/7 font-bold text-stone-500 opsz-20 md:text-[1.5rem]/8 lg:text-[1.75rem]/9">{copy}</p> : null}
      </div>
      {image ? (
        <div className={`col-span-full lg:col-span-10 ${reverse ? "-ml-gutter lg:col-start-1" : "-mr-gutter"}`}>
          <div className="relative origin-right overflow-hidden rounded-l-[1.75rem] shadow-xl squircle">
            <ParallaxImage src={image} alt={imageAlt} className="w-full" speed={24} />
            <div className="pointer-events-none absolute inset-0 rounded-l-[1.75rem] bg-linear-to-br from-current/20 via-current/0 to-current/20 p-px text-white squircle" aria-hidden />
          </div>
        </div>
      ) : null}
    </RevealOnScroll>
  );
}
