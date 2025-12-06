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
      <div className="min-h-screen bg-[#030303] text-white grid place-items-center px-6">
        <div className="text-center space-y-4">
          <p className="text-sm uppercase tracking-[0.4em] text-white/50">Project not found</p>
          <h1 className="text-3xl font-bold">The case study you’re looking for has been archived.</h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white/40 transition"
          >
            <ChevronLeft className="w-4 h-4" /> Back to work
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <Link to="/" className="font-black tracking-tight text-lg md:text-xl inline-flex items-center">
              <span>Travis Crawford</span>
            </Link>

            <nav aria-label="Primary" className="hidden md:flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
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
                  className="px-4 py-2 rounded-full border border-white/15 hover:border-white/40 transition backdrop-blur bg-white/5 hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                to={{ pathname: "/", hash: "#contact" }}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white text-black font-medium hover:contrast-125 transition"
              >
                <ArrowUpRight className="w-4 h-4" /> Contact
              </Link>
              <button className="md:hidden p-2 rounded border border-white/15" aria-label="Open menu" onClick={() => setOpen(true)}>
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div role="dialog" aria-modal className="fixed inset-0 z-50 bg-black/80">
            <div className="absolute top-4 right-4">
              <button className="p-2 rounded border border-white/15" onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="min-h-full grid place-items-center">
              <ul className="space-y-6 text-center text-2xl">
                {[
                  { label: "Work", to: { pathname: "/", hash: "#work" } },
                  { label: "Projects", to: "/projects" },
                  { label: "Posters", to: "/posters" },
                  { label: "About", to: { pathname: "/", hash: "#about" } },
                  { label: "Contact", to: { pathname: "/", hash: "#contact" } },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="px-6 py-3 rounded-full border border-white/15 inline-block bg-white/5 hover:bg-white/10"
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
      <footer className="border-t border-white/10 py-10 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Travis Crawford — Portfolio
        <div className="mt-3 flex justify-center gap-4 text-white/60">
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
  return (
    <header className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-8">
        <div className="flex items-center gap-3 mb-3 text-[12px] tracking-widest uppercase text-white/60">
          <span>{project.tag}</span>
          <span className="opacity-40">•</span>
          <span>{project.timeframe}</span>
        </div>
        <MotionHeading
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45 }}
          className="text-5xl md:text-6xl font-black leading-[0.95]"
        >
          {project.title}
        </MotionHeading>
        <p className="mt-4 max-w-2xl text-white/70">{project.summary}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.roles.map((role) => (
            <span
              key={role}
              className="px-3 py-1 rounded-full text-xs border border-white/15 bg-[#0c0c0c]/60 backdrop-blur-sm"
            >
              {role}
            </span>
          ))}
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="px-3 py-1 rounded-full text-xs border border-white/15 bg-[#0c0c0c]/60 backdrop-blur-sm"
            >
              {tool}
            </span>
          ))}
          <span className="px-3 py-1 rounded-full text-xs border border-white/15 bg-[#0c0c0c]/60 backdrop-blur-sm">
            {project.timeframe}
          </span>
        </div>
      </div>
      <div className="relative">
        {project.heroVideo ? (
          <video
            src={project.heroVideo}
            className="w-full aspect-[16/6] object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={project.heroImage}
          />
        ) : (
          <img src={project.heroImage} alt="Project hero" className="w-full aspect-[16/6] object-cover" />
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
      <div className="text-[11px] uppercase tracking-widest text-white/60 mb-2">{kicker}</div>
      <HoverSpotlight className="rounded-2xl border border-white/10 bg-[#0c0c0c]/60 p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h2>
        <div className="mt-3 space-y-3 text-white/80 max-w-3xl">
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
      <div className="text-[11px] uppercase tracking-widest text-white/60 mb-2">System Highlights</div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {highlights.map(({ icon, title, copy }) => {
          const Icon = iconComponents[icon] ?? PenTool;
          return (
            <HoverSpotlight key={title} className="rounded-2xl border border-white/10 bg-[#0c0c0c]/60 p-5">
              <div className="flex items-start gap-3">
                <div className="shrink-0 rounded-full border border-white/15 p-2">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
                  <p className="mt-1 text-sm text-white/70">{copy}</p>
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
  return (
    <HoverSpotlight className="rounded-2xl overflow-hidden border border-white/10">
      <div className="relative aspect-[21/9]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${project.textureImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "contrast(105%) saturate(95%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-black/40" />
        <div className="absolute inset-0 p-6 md:p-8 flex items-end">
          <p className="max-w-3xl text-white/85 text-sm md:text-base">{project.textureCopy}</p>
        </div>
      </div>
    </HoverSpotlight>
  );
}

function Gallery({ project, socialSection }) {
  const tiles = [];

  project.gallery.forEach((src, index) => {
    const wide = index % 5 === 0;
    const colClass = wide ? "sm:col-span-12" : "sm:col-span-6";

    tiles.push(
      <MotionFigure
        key={src}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.35, delay: (index % 5) * 0.04 }}
        className={`group/spot relative overflow-hidden rounded-xl border border-white/10 ${colClass}`}
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
          event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
        }}
      >
        <div className="aspect-[16/9]">
          <img src={src} alt="Case study visual" className="w-full h-full object-cover" />
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
    <section className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">{tiles}</div>
    </section>
  );
}

function TextureCard({ project, className = "" }) {
  return (
    <MotionFigure
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.35 }}
      className={`group/spot relative overflow-hidden rounded-xl border border-white/10 ${className}`}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
      }}
    >
      <div className="aspect-[16/9] relative">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${project.textureImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "contrast(105%) saturate(95%)",
          }}
        />
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
      className={`group inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium bg-[#0c0c0c]/60 hover:bg-white/5 transition-all ${
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
      <div className="text-[11px] uppercase tracking-widest text-white/60 mb-3">Ads &amp; Social</div>
      <div className="grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-5 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Instagram content system</h2>
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
                className={`relative flex-shrink-0 w-40 h-40 rounded-xl border border-white/10 bg-black/30 overflow-hidden ${
                  index === active ? "ring-2 ring-white/70" : "ring-1 ring-white/10"
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

