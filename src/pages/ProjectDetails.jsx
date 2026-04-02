import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Github, Linkedin, Mail, Menu, X, Megaphone, Camera, PenTool, Cpu } from "lucide-react";

import { findProjectBySlug, getAdjacentProjects } from "../data/projects.js";
const MotionHeading = motion.h1;
const MotionFigure = motion.figure;

const iconComponents = {
  PenTool,
  Cpu,
  Camera,
  Megaphone,
};

function splitProjectTitle(title = "") {
  const segments = title.split("—").map((segment) => segment.trim()).filter(Boolean);
  if (segments.length <= 1) {
    return { primary: title.trim(), secondary: "" };
  }
  return {
    primary: segments[0],
    secondary: segments.slice(1).join(" — "),
  };
}

function getReadableTextColor(hex) {
  if (!hex) return "#0b0b0b";
  const stripped = hex.replace("#", "");
  const bigint = parseInt(stripped, 16);
  if (Number.isNaN(bigint)) return "#0b0b0b";
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 160 ? "#1a1a1a" : "#f8f8f8";
}

export default function ProjectDetailsPage() {
  const { slug } = useParams();
  const project = useMemo(() => findProjectBySlug(slug), [slug]);
  const { prev, next } = useMemo(() => getAdjacentProjects(slug), [slug]);
  const [open, setOpen] = useState(false);
  const isCivilGoat = project?.slug === "civil-goat-coffee";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#050505] text-white font-mono grid place-items-center px-6">
        <div className="text-center space-y-6 max-w-md border-2 border-white/25 p-10 shadow-brut">
          <p className="text-[10px] font-bold uppercase tracking-[0.45em] text-white/45">Project not found</p>
          <h1 className="font-display text-2xl font-extrabold tracking-tight uppercase">
            The case study you’re looking for has been archived.
          </h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 border-2 border-white px-5 py-3 text-[10px] font-bold uppercase tracking-[0.28em] hover:bg-white hover:text-black transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to work
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="brutalist-project min-h-screen bg-[#050505] text-white font-mono">
      <header className="sticky top-0 z-40 border-b-2 border-white bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <Link to="/" className="font-display font-extrabold tracking-tighter text-lg md:text-xl uppercase">
              <span>Travis Crawford</span>
            </Link>

            <nav aria-label="Primary" className="hidden md:flex items-center gap-0 absolute left-1/2 -translate-x-1/2 divide-x divide-white/20 border border-white/25">
              {[
                { label: "Work", to: { pathname: "/", hash: "#work" } },
                { label: "Projects", to: "/projects" },
                { label: "Posters", to: "/posters" },
                { label: "About", to: { pathname: "/", hash: "#about" } },
                { label: "Contact", to: { pathname: "/", hash: "#contact" } },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.28em] text-white/85 hover:bg-white hover:text-black transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                to={{ pathname: "/", hash: "#contact" }}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 border-2 border-white bg-white text-black text-[10px] font-bold uppercase tracking-[0.22em] hover:bg-transparent hover:text-white transition-colors"
              >
                <ArrowUpRight className="w-4 h-4" /> Contact
              </Link>
              <button
                type="button"
                className="md:hidden p-2.5 border-2 border-white/30 hover:bg-white/10"
                aria-label="Open menu"
                onClick={() => setOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div role="dialog" aria-modal className="fixed inset-0 z-50 bg-black border-2 border-white">
            <div className="absolute top-4 right-4">
              <button
                type="button"
                className="p-2.5 border-2 border-white hover:bg-white hover:text-black"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="min-h-full grid place-items-center px-6">
              <ul className="space-y-4 text-center w-full max-w-sm">
                {[
                  { label: "Work", to: { pathname: "/", hash: "#work" } },
                  { label: "Projects", to: "/projects" },
                  { label: "Posters", to: "/posters" },
                  { label: "About", to: { pathname: "/", hash: "#about" } },
                  { label: "Contact", to: { pathname: "/", hash: "#contact" } },
                ].map((item) => (
                  <li key={item.label} className="border border-white/25">
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="block py-4 text-sm font-bold uppercase tracking-[0.35em] hover:bg-white hover:text-black transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </header>

      <Hero project={project} />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 space-y-16">
        <LongformCopy {...project.challenge} id="challenge" />
        <IconCards highlights={project.highlights} />
        <TextureBanner project={project} />
        {project.colorPalette ? <ColorPalette palette={project.colorPalette} /> : null}
        <LongformCopy {...project.approach} id="approach" />
        <Gallery
          project={project}
          socialSection={
            isCivilGoat && project.socialPosts ? <SocialFeedSection posts={project.socialPosts} projectName={project.title} /> : null
          }
        />
        <LongformCopy {...project.outcomes} id="outcomes" />
        <PrevNext prev={prev} next={next} />
      </div>
      <footer className="border-t-2 border-white/25 bg-black py-10 text-center text-[10px] uppercase tracking-[0.25em] text-white/45">
        © {new Date().getFullYear()} Travis Crawford — Portfolio
        <div className="mt-4 flex justify-center gap-6 text-white/55">
          <a href="mailto:tcrawford.design@gmail.com" className="inline-flex items-center gap-2 hover:text-white" target="_blank" rel="noreferrer">
            <Mail className="w-4 h-4" /> Email
          </a>
          <a href="https://www.linkedin.com/in/travis-crawford-67759b24a" className="inline-flex items-center gap-2 hover:text-white">
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}

function Hero({ project }) {
  const { primary, secondary } = splitProjectTitle(project.title ?? "");
  return (
    <header className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-8">
        <div className="flex items-center gap-3 mb-3 text-[11px] font-bold tracking-[0.35em] uppercase text-white/60">
          <span>{project.tag}</span>
          <span className="opacity-40">•</span>
          <span>{project.timeframe}</span>
        </div>
        <MotionHeading
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45 }}
          className="font-display text-5xl md:text-6xl font-extrabold tracking-tighter leading-[0.92] uppercase"
        >
          <span className="block">{primary}</span>
        </MotionHeading>
        {secondary ? (
          <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.4em] text-white/60">{secondary}</div>
        ) : null}
        <p className="mt-4 max-w-2xl text-sm text-white/70 leading-relaxed">{project.summary}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.roles.map((role) => (
            <span
              key={role}
              className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] border border-white/25 bg-black"
            >
              {role}
            </span>
          ))}
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] border border-white/25 bg-black"
            >
              {tool}
            </span>
          ))}
          <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] border border-white/25 bg-black">
            {project.timeframe}
          </span>
        </div>
      </div>
      <div className="relative">
        {project.heroVideo ? (
          <video
            className="w-full aspect-[16/6] object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={project.heroVideo} type="video/mp4" />
          </video>
        ) : project.heroImage ? (
          <img src={project.heroImage} alt="Project hero" className="w-full aspect-[16/6] object-cover" />
        ) : (
          <div className="w-full aspect-[16/6] bg-gradient-to-br from-[#090909] to-[#141414]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
      </div>
    </header>
  );
}

function HoverSpotlight({ className = "", children }) {
  return (
    <div
      className={`group/spot relative ${className}`}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
      }}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover/spot:opacity-100 transition-opacity"
        style={{ background: "radial-gradient(600px at var(--mx) var(--my), rgba(255,255,255,0.07), transparent 60%)" }}
      />
      <div className="absolute inset-0 rounded-xl ring-0 ring-white/0 group-hover/spot:ring-1 group-hover/spot:ring-white/10 transition-all" />
    </div>
  );
}

function LongformCopy({ id, kicker, title, paragraphs }) {
  return (
    <section id={id}>
      <div className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/55 mb-2">{kicker}</div>
      <HoverSpotlight className="border-2 border-white/20 bg-black p-6 md:p-8 shadow-brut-sm">
        <h2 className="font-display text-xl md:text-2xl font-extrabold tracking-tight uppercase">{title}</h2>
        <div className="mt-3 space-y-3 text-sm text-white/80 max-w-3xl leading-relaxed">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </HoverSpotlight>
    </section>
  );
}

function IconCards({ highlights }) {
  return (
    <section>
      <div className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/55 mb-2">System Highlights</div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {highlights.map(({ icon, title, copy }) => {
          const Icon = iconComponents[icon] ?? PenTool;
          return (
            <HoverSpotlight key={title} className="border-2 border-white/20 bg-black p-5 shadow-brut-sm">
              <div className="flex items-start gap-3">
                <div className="shrink-0 border border-white/30 p-2">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold tracking-tight uppercase">{title}</h3>
                  <p className="mt-1 text-sm text-white/70 leading-relaxed">{copy}</p>
                </div>
              </div>
            </HoverSpotlight>
          );
        })}
      </div>
    </section>
  );
}


function TextureBanner({ project }) {
  if (!project.textureImage && !project.textureCopy) {
    return null;
  }

  return (
    <HoverSpotlight className="overflow-hidden border-2 border-white/20 shadow-brut-sm">
      <div className="relative aspect-[21/9]">
        {project.textureImage ? (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${project.textureImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "contrast(105%) saturate(95%)",
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#090909] to-[#141414]" />
        )}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-black/40" />
        {project.textureCopy ? (
          <div className="absolute inset-0 p-6 md:p-8 flex items-end">
            <p className="max-w-3xl text-white/85 text-sm md:text-base">{project.textureCopy}</p>
          </div>
        ) : null}
      </div>
    </HoverSpotlight>
  );
}

function ColorPalette({ palette }) {
  return (
    <section>
      <div className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/55 mb-2">Color System</div>
      <HoverSpotlight className="relative border-2 border-white/20 bg-black p-6 md:p-8 overflow-hidden shadow-brut-sm">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
          <div className="lg:w-80 space-y-4">
            <h3 className="font-display text-xl font-bold tracking-tight uppercase text-white">Palette Fundamentals</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Foam, espresso, copper, walnut, and sage presented as straightforward swatches so you can read contrast and temperature without any animation getting in the way.
            </p>
          </div>
          <PalettePlayground palette={palette} />
        </div>
      </HoverSpotlight>
    </section>
  );
}

function PalettePlayground({ palette }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
      {palette.map((swatch) => (
        <div
          key={swatch.hex}
          className="flex flex-col gap-3 p-4 border-2 border-white/18 bg-black"
          style={{ boxShadow: "0 20px 55px -32px rgba(0,0,0,0.85)" }}
        >
          <div className="h-20 border border-white/15" style={{ backgroundColor: swatch.hex }} aria-hidden />
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.28em] text-white/60">
            <span>{swatch.name}</span>
            <span>{swatch.hex}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Gallery({ project, socialSection }) {
  const [activeMedia, setActiveMedia] = useState(null);

  useEffect(() => {
    if (!activeMedia) return undefined;
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setActiveMedia(null);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeMedia]);

  const handleOpen = (media) => {
    if (!media) return;
    setActiveMedia({ src: media.full ?? media.preview, alt: media.alt ?? "" });
  };

  const handleClose = () => setActiveMedia(null);

  const normalizeMediaItem = (item, altFallback) => {
    if (!item) return null;
    if (typeof item === "string") {
      return { preview: item, full: item, alt: altFallback };
    }
    if (typeof item === "object") {
      const preview = item.preview ?? item.src ?? item.full;
      if (!preview) return null;
      const full = item.full ?? item.src ?? preview;
      const alt = item.alt ?? altFallback;
      return { preview, full, alt };
    }
    return null;
  };

  const tiles = [];
  const aspectRatio = project.galleryAspect ?? "16 / 9";
  const isContain = (project.galleryObjectFit ?? "cover") === "contain";
  const galleryItems = project.gallery ?? [];
  const layout = project.galleryLayout ?? "default";
  const groups = project.galleryGroups ?? [];
  const hasDefaultMedia = galleryItems.length > 0;
  const hasGroups = groups.length > 0;

  if (!hasDefaultMedia && !hasGroups && !socialSection) {
    return null;
  }

  if (layout === "meta") {
    return (
      <>
        <AnimatePresence>
          {activeMedia ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6"
              onClick={handleClose}
            >
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-[22rem] md:max-w-[28rem]"
                style={{ maxHeight: "75vh" }}
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute top-4 right-4 z-10 px-3 py-1.5 text-xs uppercase tracking-[0.3em] text-white/70 hover:text-white"
                >
                  Close
                </button>
                <img src={activeMedia.src} alt={activeMedia.alt ?? ""} className="w-full h-full object-contain" loading="lazy" decoding="async" />
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <section className="space-y-5">
        {project.galleryNote ? (
          <p className="text-sm text-white/60 max-w-3xl">{project.galleryNote}</p>
        ) : null}
        {hasGroups ? (
          <div className="space-y-8">
            {groups.map((group) => {
              const normalizedItems = (group.items ?? [])
                .map((item, index) => normalizeMediaItem(item, `${group.title} placement ${index + 1}`))
                .filter(Boolean);
              const hasItems = normalizedItems.length > 0;

              let content = null;

              if (hasItems && group.carousel) {
                content = (
                  <CarouselMediaGroup
                    key={`${group.title}-carousel`}
                    title={group.title}
                    items={normalizedItems}
                    aspectRatio={aspectRatio}
                    onOpen={handleOpen}
                  />
                );
              } else if (hasItems) {
                content = (
                  <div className="grid gap-5 md:grid-cols-3">
                    {normalizedItems.map((media, index) => (
                      <MotionFigure
                        key={`${group.title}-${media.preview}-${index}`}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-15%" }}
                        transition={{ duration: 0.35, delay: index * 0.05 }}
                        className="relative overflow-hidden border-2 border-white/18 bg-black cursor-zoom-in shadow-brut-sm"
                        role="button"
                        tabIndex={0}
                        onClick={() => handleOpen(media)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            handleOpen(media);
                          }
                        }}
                      >
                        <div className="w-full" style={{ aspectRatio }}>
                          <img src={media.preview} alt={media.alt} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                        </div>
                      </MotionFigure>
                    ))}
                  </div>
                );
              } else if (group.confidential) {
                content = (
                  <div className="poster-gallery__placeholder">
                    <p className="poster-gallery__placeholder-label">
                      {group.confidentialMessage ?? "Assets withheld until launch."}
                    </p>
                    {group.description ? (
                      <p className="poster-gallery__placeholder-subtext">{group.description}</p>
                    ) : null}
                  </div>
                );
              }

              return (
                <div key={group.title} className="space-y-4">
                  {group.confidential ? null : (
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-white">{group.title}</h3>
                      {group.description ? <p className="mt-2 text-sm text-white/65 max-w-2xl">{group.description}</p> : null}
                    </div>
                  )}
                  {content}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {galleryItems.map((item, index) => {
              const media = normalizeMediaItem(item, "Meta placement static");
              if (!media) return null;
              return (
                <MotionFigure
                  key={`${media.preview}-${index}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="relative overflow-hidden border-2 border-white/18 bg-black cursor-zoom-in shadow-brut-sm"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleOpen(media)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleOpen(media);
                    }
                  }}
                >
                  <div className="w-full" style={{ aspectRatio }}>
                    <img src={media.preview} alt={media.alt} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </div>
                </MotionFigure>
              );
            })}
          </div>
        )}
        {socialSection ? <div className="pt-2">{socialSection}</div> : null}
        </section>
      </>
    );
  }

  if (!hasDefaultMedia && socialSection) {
    return (
      <section className="space-y-5">
        {project.galleryNote ? (
          <p className="text-sm text-white/60 max-w-3xl">{project.galleryNote}</p>
        ) : null}
        {socialSection}
      </section>
    );
  }

  galleryItems.forEach((item, index) => {
    const media = normalizeMediaItem(item, "Case study visual");
    if (!media) {
      return;
    }
    const wide = index % 5 === 0;
    const colClass = wide ? "sm:col-span-12" : "sm:col-span-6";

    tiles.push(
      <MotionFigure
        key={`${media.preview}-${index}`}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.35, delay: (index % 5) * 0.04 }}
        className={`group/spot relative overflow-hidden border-2 border-white/18 ${colClass}`}
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
          event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
        }}
      >
        <div className="w-full" style={{ aspectRatio }}>
          <div className={`w-full h-full ${isContain ? "bg-black/60 flex items-center justify-center p-5" : ""}`}>
            <button
              type="button"
              onClick={() => handleOpen(media)}
              className="block w-full h-full cursor-zoom-in"
              aria-label="View image in detail"
            >
              <img
                src={media.preview}
                alt={media.alt}
                className={`w-full h-full ${isContain ? "object-contain" : "object-cover"}`}
              />
            </button>
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover/spot:opacity-100 transition-opacity"
          style={{ background: "radial-gradient(600px at var(--mx) var(--my), rgba(255,255,255,0.08), transparent 60%)" }}
        />
        <div className="absolute inset-0 rounded-xl ring-0 ring-white/0 group-hover/spot:ring-1 group-hover/spot:ring-white/10 transition-all" />
      </MotionFigure>
    );

    if (socialSection && index === 4) {
      tiles.push(
        <div key="social-section" className="sm:col-span-12">
          {socialSection}
        </div>
      );
    }
  });

  return (
    <>
      <AnimatePresence>
        {activeMedia ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-[22rem] md:max-w-[28rem]"
              style={{ maxHeight: "75vh" }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 px-3 py-1.5 text-xs uppercase tracking-[0.3em] text-white/70 hover:text-white"
              >
                Close
              </button>
              <img src={activeMedia.src} alt={activeMedia.alt ?? ""} className="w-full h-full object-contain" loading="lazy" decoding="async" />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <section className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">{tiles}</div>
    </section>
    </>
  );
}

function CarouselMediaGroup({ title, items, aspectRatio, onOpen }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [items]);

  const total = items.length;
  if (!total) {
    return null;
  }

  const visibleCount = Math.min(3, total);
  const visibleIndices = useMemo(() => {
    return Array.from({ length: visibleCount }, (_, offset) => (currentIndex + offset) % total);
  }, [currentIndex, total, visibleCount]);

  const navigationDisabled = total <= visibleCount;
  const gridColumnsClass =
    visibleCount === 1 ? "md:grid-cols-1" : visibleCount === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  const handlePrevious = () => {
    if (navigationDisabled) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    if (navigationDisabled) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden">
        <div className={`grid gap-4 grid-cols-1 ${gridColumnsClass}`}>
          {visibleIndices.map((itemIndex, offset) => {
            const media = items[itemIndex];
            if (!media) return null;
            return (
              <MotionFigure
                key={`${media.preview}-${itemIndex}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: offset * 0.04 }}
                className="relative overflow-hidden border-2 border-white/18 bg-black shadow-brut-sm"
              >
                <button
                  type="button"
                  onClick={() => onOpen(media)}
                  className="group/carousel block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  aria-label={`Open ${title} frame ${itemIndex + 1} of ${total} in detail view`}
                >
                  <div className="relative w-full" style={{ aspectRatio }}>
                    <img
                      src={media.preview}
                      alt={media.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 border border-white/30 bg-black/75 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.32em] text-white/70 opacity-0 transition group-hover/carousel:opacity-100">
                      View larger
                    </span>
                  </div>
                </button>
              </MotionFigure>
            );
          })}
        </div>
        <button
          type="button"
          onClick={handlePrevious}
          className="absolute left-3 top-1/2 -translate-y-1/2 border-2 border-white/25 bg-black/80 p-2 text-white/80 hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:opacity-40 disabled:hover:bg-black/80"
          aria-label="Previous frames"
          disabled={navigationDisabled}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 border-2 border-white/25 bg-black/80 p-2 text-white/80 hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:opacity-40 disabled:hover:bg-black/80"
          aria-label="Next frames"
          disabled={navigationDisabled}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-between text-[13px] text-white/65">
        <span aria-live="polite">
          Showing {visibleCount} of {total} frames
        </span>
        <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-white/45">
          Use arrows to browse
          <ArrowUpRight className="w-3 h-3 opacity-60" />
        </span>
      </div>
    </div>
  );
}

function TextureCard({ project, className = "" }) {
  return (
    <MotionFigure
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.35 }}
      className={`group/spot relative overflow-hidden border-2 border-white/18 ${className}`}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
      }}
    >
      <div className="aspect-[16/9] relative">
        {project.textureImage ? (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${project.textureImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "contrast(105%) saturate(95%)",
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#090909] to-[#141414]" />
        )}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            pointerEvents: "none",
          }}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover/spot:opacity-100 transition-opacity"
        style={{ background: "radial-gradient(600px at var(--mx) var(--my), rgba(255,255,255,0.08), transparent 60%)" }}
      />
      <div className="absolute inset-0 rounded-xl ring-0 ring-white/0 group-hover/spot:ring-1 group-hover/spot:ring-white/10 transition-all" />
    </MotionFigure>
  );
}

function PrevNext({ prev, next }) {
  if (!prev && !next) return null;

  return (
    <nav className="flex flex-col md:flex-row justify-between gap-6 items-center md:items-stretch">
      <div className="w-full md:w-auto self-start md:self-auto">
        {prev ? <NavCard direction="prev" label={prev.title} slug={prev.slug} /> : null}
      </div>
      <div className="w-full md:w-auto self-end md:self-auto">
        {next ? <NavCard direction="next" label={next.title} slug={next.slug} /> : null}
      </div>
    </nav>
  );
}

function NavCard({ direction, label, slug }) {
  const isNext = direction === "next";
  return (
    <Link
      to={`/projects/${slug}`}
      className={`group inline-flex items-center justify-center border-2 border-white/25 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.24em] bg-black hover:bg-white hover:text-black transition-colors ${
        isNext ? "md:ml-auto" : "md:mr-auto"
      }`}
      style={{ borderColor: "rgba(255,255,255,0.14)", width: "fit-content", minWidth: "160px" }}
    >
      {isNext ? (
        <>
          <span className="mr-2 text-white/70 group-hover:text-white transition-colors">{label}</span>
          <ChevronRight className="w-4 h-4" />
        </>
      ) : (
        <>
          <ChevronLeft className="w-4 h-4" />
          <span className="ml-2 text-white/70 group-hover:text-white transition-colors">{label}</span>
        </>
      )}
    </Link>
  );
}

function SocialFeedSection({ posts, projectName }) {
  const normalizedPosts = useMemo(
    () =>
      posts
        ?.map((post, index) => {
          if (typeof post === "string") {
            return { src: post, alt: `${projectName} social post ${index + 1}` };
          }
          if (post?.src) {
            return { src: post.src, alt: post.alt ?? `${projectName} social post ${index + 1}` };
          }
          return null;
        })
        .filter(Boolean) ?? [],
    [posts, projectName],
  );

  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
  }, [normalizedPosts]);

  useEffect(() => {
    if (normalizedPosts.length <= 1) return undefined;
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % normalizedPosts.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [normalizedPosts]);

  if (!normalizedPosts.length) return null;

  const current = normalizedPosts[active];
  const transitionKey = current.src;

  return (
    <section>
      <div className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/55 mb-3">Ads &amp; Social</div>
      <div className="grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-5 space-y-4">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight uppercase">Instagram content system</h2>
          <p className="text-white/70 text-sm leading-relaxed">
            A swipeable set of promos for {projectName} showing how the conversational identity flexes across social placements. Motion and static stories share
            the same typography, color energy, and conversational copy structure.
          </p>
        </div>
        <div className="md:col-span-7 flex justify-center">
          <div className="iphone-frame">
            <div className="iphone-notch" aria-hidden />
            <div className="iphone-screen">
              <div className="insta-shell">
                <div className="insta-status">
                  <span>9:41</span>
                  <div className="insta-status__icons" aria-hidden>
                    <span className="insta-status__dot" />
                    <span className="insta-status__dot" />
                    <span className="insta-status__dot" />
                  </div>
                </div>
                <div className="insta-header">
                  <div className="insta-header__left">
                    <span className="insta-avatar" aria-hidden />
                    <div>
                      <div className="insta-name">Civil Goat Coffee</div>
                      <div className="insta-meta">Sponsored</div>
                    </div>
                  </div>
                  <span className="insta-more" aria-hidden>•••</span>
                </div>
                <div className="insta-media">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={transitionKey}
                      className="insta-media__inner"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <img src={current.src} alt={current.alt} className="insta-media-img" loading="lazy" decoding="async" />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="insta-actions" aria-hidden>
                  <span className="insta-action insta-action--heart" />
                  <span className="insta-action insta-action--comment" />
                  <span className="insta-action insta-action--share" />
                  <span className="insta-action insta-action--save" />
                </div>
                <div className="insta-caption">
                  <span className="insta-name">Civil Goat Coffee</span>
                  <span className="insta-caption__copy"> Talking to fans across every channel.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 iphone-dots" role="tablist" aria-label={`${projectName} social posts`}>
        {normalizedPosts.map((post, index) => (
          <button
            key={post.src ?? index}
            type="button"
            className={`iphone-dot ${index === active ? "iphone-dot--active" : ""}`}
            onClick={() => setActive(index)}
            aria-label={`Show social post ${index + 1}`}
            aria-pressed={index === active}
          />
        ))}
      </div>
      <div className="mt-10">
        <ul className="flex flex-wrap gap-4">
          {normalizedPosts.map((post, index) => {
            const key = post.src ?? index;
            return (
              <li
                key={key}
                className={`relative flex-shrink-0 w-40 h-40 border-2 bg-black/30 overflow-hidden ${
                  index === active ? "border-[var(--accent-red)]" : "border-white/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  className="absolute inset-0"
                  aria-label={`Show social post ${index + 1}`}
                >
                  <img src={post.src} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

