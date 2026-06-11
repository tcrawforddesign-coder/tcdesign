import RevealOnScroll from "../animations/RevealOnScroll.jsx";

export default function StudioCopyBlock({ kicker, title, paragraphs = [], className = "" }) {
  if (!title && !paragraphs.length) return null;

  return (
    <RevealOnScroll className={`col-start-2 -col-end-2 lg:col-start-4 lg:-col-end-4 ${className}`} preset="text">
      {kicker ? <div className="mb-3 text-lg/tight font-bold text-stone-500 opsz-lg">{kicker}</div> : null}
      {title ? <h2 className="text-[2.5rem]/11 font-bold opsz-24">{title}</h2> : null}
      {paragraphs.length ? (
        <div className="mt-6 space-y-4 text-[1.25rem]/7 font-bold text-stone-500 opsz-20 md:text-[1.5rem]/8 lg:text-[1.75rem]/9">
          {paragraphs.map((paragraph, index) => (
            <p key={`${paragraph.slice(0, 24)}-${index}`} className="m-0 first-letter:pl-indent-2 [&>em]:font-serif [&>em]:italic [&>em]:text-black">
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}
    </RevealOnScroll>
  );
}
