export default function StudioVisitPill({ href, className = "", label = "Visit site" }) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex h-10 items-center gap-2.5 rounded-[1.25rem] bg-black pl-6 pr-4 text-lg font-semibold text-cloud-dancer opsz-lg squircle whitespace-nowrap ${className}`}
      data-cursor="default"
    >
      {label}
      <svg aria-hidden="true" viewBox="0 0 100 100" fill="currentColor" className="size-6">
        <path d="M48.95 13.50L37.95 24.50L66.85 24.50L12.15 79.20L20.65 87.70L75.25 33.10L75.25 62.20L86.45 51L86.45 13.50Z" />
      </svg>
    </a>
  );
}
