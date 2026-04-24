import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Github, Linkedin, Mail, Menu, X, Megaphone, Camera, PenTool, Cpu, Folder } from "lucide-react";

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
  const [bootState, setBootState] = useState({ active: true, progress: 6, phase: 0 });
  const isCivilGoat = project?.slug === "civil-goat-coffee";
  const isYellowBike = project?.slug === "yellow-bike";
  const isThreeSixty = project?.slug === "3sixty-integrated-marketing";
  const moduleLabel = slug ? slug.replaceAll("-", " ").toUpperCase() : "CASE STUDY";

  const bootSteps = [
    "Initializing archive bus",
    "Syncing visual tokens",
    "Mounting media arrays",
    "Compiling interaction shell",
    "Brutalist core online",
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  useEffect(() => {
    setBootState({ active: true, progress: 6, phase: 0 });

    const intervalId = window.setInterval(() => {
      setBootState((prev) => ({
        ...prev,
        progress: Math.min(prev.progress + 3 + Math.random() * 7, 94),
        phase: (prev.phase + 1) % 5,
      }));
    }, 120);

    const timeoutId = window.setTimeout(() => {
      setBootState({ active: false, progress: 100, phase: 4 });
    }, 1800);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
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

      <AnimatePresence>
        {bootState.active ? (
          <motion.div
            key={`boot-${slug}`}
            initial={{ opacity: 1, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32 }}
            className="case-boot fixed inset-0 z-[70] bg-black border-b-2 border-white/20 pointer-events-none overflow-hidden"
            aria-hidden
          >
            <div className="case-boot__wipe" />
            <div className="case-boot__scan" />
            <div className="h-full w-full max-w-7xl mx-auto px-6 lg:px-10 py-10 flex items-center">
              <div className="w-full max-w-4xl border-2 border-white/30 p-6 md:p-10 bg-black shadow-brut">
                <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-[0.35em] text-white/45">
                  <span>Booting Case Study Module</span>
                  <span className="text-[var(--accent-red)]">Phase {bootState.phase + 1}/5</span>
                </div>
                <div className="mt-5 case-boot__headline font-display text-4xl md:text-6xl font-black uppercase leading-[0.9] tracking-tighter">
                  {moduleLabel}
                </div>
                <div className="mt-3 text-[10px] uppercase tracking-[0.3em] text-white/45">/projects/{slug}</div>
                <div className="mt-6 h-4 border-2 border-white/30 bg-black overflow-hidden">
                  <motion.div
                    className="h-full case-boot__bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${bootState.progress}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                </div>
                <div className="mt-3 text-[10px] uppercase tracking-[0.35em] text-white/65">{Math.round(bootState.progress)}%</div>
                <div className="mt-5 space-y-1.5 text-[10px] uppercase tracking-[0.26em] text-white/50">
                  {bootSteps.map((step, index) => (
                    <div
                      key={step}
                      className={`transition-opacity duration-150 ${bootState.progress >= (index + 1) * 18 ? "opacity-100" : "opacity-25"}`}
                    >
                      [{bootState.progress >= (index + 1) * 18 ? "ok" : ".."}] {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {isYellowBike ? (
        <YellowBikeCaseStudy project={project} prev={prev} next={next} />
      ) : isThreeSixty ? (
        <ThreeSixtyMarketingCaseStudy project={project} prev={prev} next={next} />
      ) : (
        <>
          <Hero project={project} />
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 space-y-16">
            <LongformCopy {...project.challenge} id="challenge" />
            <IconCards highlights={project.highlights} />
            {project.glitchFaces ? <GlitchMoodSection glitchFaces={project.glitchFaces} /> : null}
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
        </>
      )}
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
          <img src={project.heroImage} alt={`${project.title} hero visual`} className="w-full aspect-[16/6] object-cover" />
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
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-white/0 group-hover/spot:ring-1 group-hover/spot:ring-white/10 transition-all" />
    </div>
  );
}

function GlitchMoodSection({ glitchFaces }) {
  if (!glitchFaces?.smile || !glitchFaces?.frown) return null;
  return (
    <section>
      <div className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/55 mb-2">{glitchFaces.title ?? "Mood Mark Glitch"}</div>
      <HoverSpotlight className="border-2 border-white/20 bg-black p-5 md:p-6 shadow-brut-sm">
        <div className="grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7">
            <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-tight uppercase">Mood mark glitch loop</h3>
            {glitchFaces.subtitle ? <p className="text-sm text-white/65 mt-3">{glitchFaces.subtitle}</p> : null}
          </div>
          <div className="md:col-span-5 md:justify-self-end">
            <div className="ritual-glitch ritual-glitch--square">
              <img src={glitchFaces.smile} alt="Ritual Coffee smile mark" className="ritual-glitch__layer ritual-glitch__layer--smile" loading="lazy" decoding="async" />
              <img src={glitchFaces.frown} alt="Ritual Coffee frown mark" className="ritual-glitch__layer ritual-glitch__layer--frown" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </HoverSpotlight>
    </section>
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

const CHART_COLORS = ["#ef4444", "#f97316", "#facc15", "#22c55e", "#38bdf8", "#a78bfa"];

function YellowBikeCaseStudy({ project, prev, next }) {
  const research = project.yellowBikeResearch ?? {};
  const survey = research.survey_results ?? {};

  const scopeItems = [
    "Translating a physical, community-based organization into a digital experience",
    "Rebranding the organization for a mobile-first audience",
    "Designing a system that encourages learning through interaction rather than instruction",
  ];

  return (
    <>
      <Hero project={project} />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 space-y-16">
        <section className="border-2 border-white/20 bg-black p-6 md:p-8 shadow-brut-sm">
          <div className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/55 mb-2">Yellow Bike App</div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight uppercase">
            Gamifying Bike Safety for Everyday Riders
          </h2>
          <p className="mt-4 max-w-4xl text-sm text-white/80 leading-relaxed">
            The Yellow Bike App is a UX/UI concept that reimagines the Yellow Bike Project as a digital product. The project explores
            how a community-driven nonprofit can evolve into an engaging mobile experience by transforming bike safety education into
            an interactive, gamified system.
          </p>
        </section>
        <RoleTimelineTeamSection roles={project.roles} timeframe={project.timeframe} team={project.team} />

        <section>
          <div className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/55 mb-2">Project Scope</div>
          <HoverSpotlight className="border-2 border-white/20 bg-black p-6 md:p-8 shadow-brut-sm">
            <p className="text-sm text-white/80 leading-relaxed max-w-4xl">
              The objective was to take an existing nonprofit and design a mobile app that extends its mission. This included:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/75 leading-relaxed list-disc pl-5">
              {scopeItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </HoverSpotlight>
        </section>

        <LongformCopy
          id="problem"
          kicker="The Problem"
          title="Bike safety education is often passive and overlooked"
          paragraphs={[
            "Riders are expected to learn through static resources or real-world experience, which can be inconsistent and, at times, unsafe.",
          ]}
        />

        <LongformCopy
          id="solution"
          kicker="The Solution"
          title="From informational to participatory"
          paragraphs={[
            "The Yellow Bike App introduces a gamified learning experience where users progress through safety lessons, challenges, and real-world scenarios.",
            "Instead of simply reading guidelines, users actively engage with content, reinforcing knowledge through completion, repetition, and reward.",
            "This approach shifts safety from something informational to something participatory.",
          ]}
        />

        <LongformCopy
          id="design-approach"
          kicker="Design Approach"
          title="Built around clarity, progression, and motivation"
          paragraphs={[
            "Gamification: Structured lessons, progress tracking, and achievement-based feedback.",
            "UX Focus: Simplified navigation and clear learning paths to reduce friction.",
            "Rebrand: A modernized identity centered around the YBP mark, balancing community warmth with digital usability.",
            "The goal was to maintain the grassroots spirit of Yellow Bike while making it scalable and engaging in a digital format.",
          ]}
        />
        <LogoComparisonSection
          existingLogo={project.existingLogoImage}
          proposedLogo={project.proposedLogoImage}
        />
        <YellowBikePaletteSection palette={project.yellowBikePalette} />

        <section>
          <div className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/55 mb-2">Research Insights</div>
          <div className="grid lg:grid-cols-1 gap-6">
            <SurveyPieCard
              title="Barriers to Cycling"
              question={survey.barriers_to_cycling?.question}
              responses={survey.barriers_to_cycling?.responses}
              data={survey.barriers_to_cycling?.data ?? []}
            />
          </div>
          <div className="mt-6 grid lg:grid-cols-2 gap-6">
            <SurveyBarCard
              title="Cycling Motivation"
              question={survey.cycling_motivation?.question}
              responses={survey.cycling_motivation?.responses}
              data={survey.cycling_motivation?.data ?? []}
            />
            <BikeabilityChartCard
              title="Community Bike-ability Rating"
              question={survey.bikeability_rating?.question}
              responses={survey.bikeability_rating?.responses}
              data={survey.bikeability_rating?.data ?? []}
            />
          </div>
        </section>
        <YellowBikeFlowSection
          title="Paper Prototypes"
          imageSrc={project.paperPrototypeImage}
          alt="Hand-drawn paper prototype sketches for Yellow Bike app screens, challenge flow, and interaction notes"
        />
        <PrototypeEmbedSection embedSrc={project.prototypeEmbedSrc} />
        <YellowBikeFlowSection
          title="User Onboarding Flow"
          imageSrc={project.flowImage}
          alt="Yellow Bike app onboarding, event participation, and route summary user flow across mobile screens"
        />
        <YellowBikeFlowSection
          title="Event Challenges Flow"
          imageSrc={project.eventChallengesFlowImage}
          alt="Yellow Bike app event challenge flow showing check-in, quiz interactions, score progression, leaderboard, and rewards redemption"
        />
        <CommunityShowcase sections={project.communitySections} />

        <LongformCopy
          id="outcome"
          kicker="Outcome"
          title="A concept for safer, sustained riding habits"
          paragraphs={[
            "The result is a concept that demonstrates how nonprofit education can be transformed into an interactive product.",
            "By gamifying the learning process, the app encourages consistent engagement and helps users build safer riding habits over time.",
          ]}
        />
        <ImproveNextSection />
        <PrevNext prev={prev} next={next} />
      </div>
    </>
  );
}

function ThreeSixtyMarketingCaseStudy({ project, prev, next }) {
  const whatIDo = project.whatIDo ?? [];
  const communication = project.communicationStrategyExecution ?? {};
  const socialStrategy = project.socialStrategy ?? {};
  const thoughtLeadershipSeries = project.thoughtLeadershipSeries ?? {};
  const securityPricingCampaign = project.securityPricingCampaign ?? {};
  const emailCampaignMockup = project.emailCampaignMockup ?? {};
  const technical = project.technicalTranslationStorytelling ?? {};
  const sales = project.salesEnablementBusinessCommunication ?? {};
  const salesEnablementLibrary = project.salesEnablementLibrary ?? {};
  const internal = project.internalCommunicationsEngagement ?? {};
  const internalCommsFeatureImages = project.internalCommsFeatureImages ?? [];
  const internalSocialAnnouncementImage = project.internalSocialAnnouncementImage;
  const internalCommsAdditionalImages = project.internalCommsAdditionalImages ?? [];
  const onboardingEmailTemplate = project.onboardingEmailTemplate ?? [];
  const operations = project.operationsPlanningCoordination ?? {};
  const designExecution = project.designContentExecution ?? {};
  const impact = project.impact ?? [];
  const salesLibraryAssets = salesEnablementLibrary.assets ?? [];
  const salesCaseStudies = salesLibraryAssets.filter((asset) => /case[\s_-]?study/i.test(asset));
  const salesOnePagers = salesLibraryAssets.filter((asset) => !/case[\s_-]?study/i.test(asset));
  const roleSummary = (project.roles ?? []).join(" + ");
  const teamSummary = (project.team ?? []).join(", ");

  return (
    <>
      <Hero project={project} />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 space-y-16">
        <section className="border-2 border-white/20 bg-black p-6 md:p-8 shadow-brut-sm">
          <div className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/55 mb-2">3Sixty Integrated</div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight uppercase">
            Digital marketing beyond visual execution
          </h2>
          <p className="mt-4 max-w-4xl text-sm text-white/80 leading-relaxed">
            This case study is structured to show communication leadership across campaigns, technical storytelling, sales
            enablement, internal engagement, and execution planning.
          </p>
          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="border border-white/20 bg-black/45 px-3 py-3">
              <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">Role Scope</div>
              <p className="mt-2 text-xs text-white/85 leading-snug">{roleSummary || "Marketing + Communications"}</p>
            </div>
            <div className="border border-white/20 bg-black/45 px-3 py-3">
              <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">Timeline</div>
              <p className="mt-2 text-xs text-white/85 leading-snug">{project.timeframe ?? "2024"}</p>
            </div>
            <div className="border border-white/20 bg-black/45 px-3 py-3">
              <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">Team Model</div>
              <p className="mt-2 text-xs text-white/85 leading-snug">{teamSummary || "Cross-functional collaboration"}</p>
            </div>
            <div className="border border-white/20 bg-black/45 px-3 py-3">
              <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">Hiring Fit</div>
              <p className="mt-2 text-xs text-white/85 leading-snug">Hybrid marketing, content, and sales enablement roles</p>
            </div>
          </div>
        </section>

        <section>
          <div className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/55 mb-2">What I do</div>
          <HoverSpotlight className="border-2 border-white/20 bg-black p-6 md:p-8 shadow-brut-sm">
            <ScannableBulletList items={whatIDo} limit={4} />
          </HoverSpotlight>
        </section>

        <section>
          <div className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/55 mb-2">Communication Strategy and Campaign Execution</div>
          <HoverSpotlight className="border-2 border-white/20 bg-black p-6 md:p-8 shadow-brut-sm">
            <p className="text-sm text-white/80 leading-relaxed">{communication.statement}</p>
            <ScannableBulletList items={communication.examples ?? []} limit={3} className="mt-3" />
            {securityPricingCampaign.title ? (
              <div className="mt-4 pt-4 border-t border-white/15">
                <h3 className="font-display text-lg font-bold tracking-tight uppercase">{securityPricingCampaign.title}</h3>
                {securityPricingCampaign.copy ? <p className="mt-2 text-sm text-white/70 leading-relaxed">{securityPricingCampaign.copy}</p> : null}
                {(securityPricingCampaign.assets ?? []).length ? (
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {securityPricingCampaign.assets.map((asset) => (
                      <div key={asset.src} className="border border-white/15 bg-black/30 p-1">
                        <img
                          src={asset.src}
                          alt={`${securityPricingCampaign.title} ${asset.label ?? "asset"}`}
                          className="w-full h-auto object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                        {asset.label ? (
                          <div className="px-1.5 pt-1.5 text-[10px] uppercase tracking-[0.22em] text-white/55">{asset.label}</div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
            {emailCampaignMockup.title ? (
              <div className="mt-4 pt-4 border-t border-white/15">
                <h3 className="font-display text-lg font-bold tracking-tight uppercase">{emailCampaignMockup.title}</h3>
                {emailCampaignMockup.subtitle ? <p className="mt-2 text-sm text-white/70 leading-relaxed">{emailCampaignMockup.subtitle}</p> : null}
                {emailCampaignMockup.iframeSrc ? (
                  <div className="mt-4 border border-white/20 bg-white overflow-hidden">
                    <div className="border-b border-black/15 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-black/70">
                      Subject: {emailCampaignMockup.subject ?? "Campaign email"}
                    </div>
                    <div className="p-2 bg-black/[0.02]">
                      <div className="border border-black/10 bg-white">
                        <iframe
                          src={emailCampaignMockup.iframeSrc}
                          title={`${emailCampaignMockup.title} email mockup`}
                          className="w-full h-[760px] bg-white"
                          style={{ border: 0 }}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </HoverSpotlight>
        </section>

        {project.socialPosts?.length ? (
          <section className="space-y-4">
            <div className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/55">Social Strategy</div>
            <HoverSpotlight className="border-2 border-white/20 bg-black p-6 md:p-8 shadow-brut-sm">
              {socialStrategy.title ? (
                <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-tight uppercase">{socialStrategy.title}</h3>
              ) : null}
              {socialStrategy.copy ? <p className="mt-3 text-sm text-white/75 leading-relaxed">{socialStrategy.copy}</p> : null}
              {(socialStrategy.pillars ?? []).length ? (
                <ScannableBulletList items={socialStrategy.pillars ?? []} limit={3} className="mt-3" />
              ) : null}
              {(thoughtLeadershipSeries.images ?? []).length ? (
                <div className="mt-5 pt-4 border-t border-white/15">
                  <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">Thought Leadership Example</div>
                  <h4 className="mt-2 font-display text-lg font-bold tracking-tight uppercase">
                    {thoughtLeadershipSeries.title ?? "Security facts carousel post"}
                  </h4>
                  {thoughtLeadershipSeries.copy ? <p className="mt-2 text-sm text-white/70 leading-relaxed">{thoughtLeadershipSeries.copy}</p> : null}
                  <ThoughtLeadershipAssetStrip images={thoughtLeadershipSeries.images} title={thoughtLeadershipSeries.title} />
                </div>
              ) : null}
            </HoverSpotlight>
            <SocialFeedSection
              posts={project.socialPosts}
              projectName={project.title}
              sectionTitle="Social content system"
              sectionCopy="A reusable social content system for 3Sixty showing how educational, promotional, and urgency-focused posts stay visually consistent while serving different communication goals."
              accountName={project.socialAccountName ?? "3Sixty Integrated"}
              captionCopy={project.socialCaptionCopy ?? "Building awareness through clear, consistent communication."}
              mediaAspectRatio="1 / 1"
              reverseOrder
              collapseThumbnails
            />
          </section>
        ) : null}

        <section>
          <div className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/55 mb-2">Technical Translation and Sales Enablement</div>
          <HoverSpotlight className="border-2 border-white/20 bg-black p-6 md:p-8 shadow-brut-sm">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">Technical Translation</div>
                <p className="mt-2 text-sm text-white/80 leading-relaxed">{technical.statement}</p>
                <ScannableBulletList items={technical.examples ?? []} limit={3} className="mt-3" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">Sales Enablement</div>
                <p className="mt-2 text-sm text-white/80 leading-relaxed">{sales.statement}</p>
                <ScannableBulletList items={sales.examples ?? []} limit={3} className="mt-3" />
              </div>
            </div>
          </HoverSpotlight>
        </section>

        {salesLibraryAssets.length ? (
          <section>
            <div className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/55 mb-2">
              {salesEnablementLibrary.title ?? "Sales Enablement Library"}
            </div>
            <HoverSpotlight className="border-2 border-white/20 bg-black p-6 md:p-8 shadow-brut-sm">
              <div className="inline-flex items-center gap-3 px-4 py-2 border border-[#69a7ff] bg-[#1f6bff]/25 mb-4">
                <Folder className="w-5 h-5 text-[#8cbcff]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#d8e8ff]">Sales Enablement</span>
              </div>
              {salesEnablementLibrary.copy ? (
                <p className="text-sm text-white/75 leading-relaxed mb-4">{salesEnablementLibrary.copy}</p>
              ) : null}
              {salesOnePagers.length ? (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-2">One-pagers</div>
                  <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {salesOnePagers.map((src, index) => (
                      <li key={`${src}-${index}`} className="border border-white/15 bg-black/30 p-1">
                        <img
                          src={src}
                          alt={`Sales enablement one-pager ${index + 1}`}
                          className="w-full aspect-[4/5] object-contain bg-black/40"
                          loading="lazy"
                          decoding="async"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {salesCaseStudies.length ? (
                <div className="mt-5 pt-4 border-t border-white/15">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-2">Case studies</div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {salesCaseStudies.map((src, index) => (
                      <li key={`${src}-${index}`} className="border border-white/15 bg-black/30 p-1">
                        <img
                          src={src}
                          alt={`Sales enablement case study ${index + 1}`}
                          className="w-full h-auto object-contain bg-black/40"
                          loading="lazy"
                          decoding="async"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </HoverSpotlight>
          </section>
        ) : null}

        <section>
          <div className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/55 mb-2">Internal Communications and Engagement</div>
          <HoverSpotlight className="border-2 border-white/20 bg-black p-6 md:p-8 shadow-brut-sm">
            <div className="grid md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-6">
                <p className="text-sm text-white/80 leading-relaxed">{internal.statement}</p>
                <ScannableBulletList items={internal.examples ?? []} limit={4} className="mt-3" />
                {internalSocialAnnouncementImage ? (
                  <div className="mt-4">
                    <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/45 mb-2">Social welcome post</div>
                    <img
                      src={internalSocialAnnouncementImage}
                      alt="New employee welcome post for social channels"
                      className="w-full h-auto border border-white/15 object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : null}
                {internalCommsAdditionalImages.length ? (
                  <div className="mt-4">
                    <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/45 mb-2">Internal campaign collateral</div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {internalCommsAdditionalImages.map((imageSrc, index) => (
                        <div key={`${imageSrc}-${index}`} className="border border-white/15 bg-black/30 p-1">
                          <img
                            src={imageSrc}
                            alt={`Internal communication asset ${index + 1}`}
                            className="w-full aspect-[4/5] object-cover"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="md:col-span-6">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/45 mb-2">Email send-out mockup</div>
                  <div className="border border-white/20 bg-white text-black shadow-brut-sm">
                    <div className="border-b border-black/15 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-black/70">
                      Subject: Welcome to the Team
                    </div>
                    {internalCommsFeatureImages[0] ? (
                      <img
                        src={internalCommsFeatureImages[0]}
                        alt="Welcome to the team email banner"
                        className="w-full h-auto object-cover border-b border-black/10"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                    {internalCommsFeatureImages[1] ? (
                      <img
                        src={internalCommsFeatureImages[1]}
                        alt="Field technician new-hire announcement banner"
                        className="w-full h-auto object-cover border-b border-black/10"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                    <div className="px-4 py-4 text-[13px] leading-relaxed space-y-2">
                      {onboardingEmailTemplate.map((line, index) => (
                        <p key={`single-email-${line}-${index}`} className={line ? "" : "h-2"}>{line}</p>
                      ))}
                      <div className="mt-4 pt-3 border-t border-black/15">
                        <p className="text-[11px] font-semibold tracking-[0.04em] text-black">Travis Crawford</p>
                        <p className="text-[11px] text-black/70">Marketing and Communications</p>
                        <p className="text-[11px] text-black/70">3Sixty Integrated</p>
                        <p className="text-[11px] text-black/70">A division of The Cook and Boardman Group</p>
                        <img
                          src="/images/3Sixty Logo C&B Color Transparent 5.png"
                          alt="3Sixty Integrated logo"
                          className="h-12 w-auto object-contain mt-3"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </HoverSpotlight>
        </section>

        <section>
          <div className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/55 mb-2">Operations, Planning and Coordination</div>
          <HoverSpotlight className="border-2 border-white/20 bg-black p-6 md:p-8 shadow-brut-sm">
            <p className="text-sm text-white/80 leading-relaxed">{operations.statement}</p>
            <ScannableBulletList items={operations.examples ?? []} limit={3} className="mt-3" />
          </HoverSpotlight>
        </section>

        <section>
          <div className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/55 mb-2">Design and Content Execution</div>
          <HoverSpotlight className="border-2 border-white/20 bg-black p-6 md:p-8 shadow-brut-sm">
            <p className="text-sm text-white/80 leading-relaxed">{designExecution.statement}</p>
            <ScannableBulletList items={designExecution.examples ?? []} limit={3} className="mt-3" />
          </HoverSpotlight>
        </section>

        <section>
          <div className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/55 mb-2">Tools</div>
          <HoverSpotlight className="border-2 border-white/20 bg-black p-5 shadow-brut-sm">
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="px-2.5 py-1 border border-white/25 text-[10px] uppercase tracking-[0.2em] text-white/80">
                  {tool}
                </span>
              ))}
            </div>
          </HoverSpotlight>
        </section>

        <section>
          <div className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/55 mb-2">Impact</div>
          <HoverSpotlight className="border-2 border-white/20 bg-black p-6 md:p-8 shadow-brut-sm">
            <ScannableBulletList items={impact} limit={4} />
          </HoverSpotlight>
        </section>

        <IconCards highlights={project.highlights} />
        <PrevNext prev={prev} next={next} />
      </div>
    </>
  );
}

function ScannableBulletList({ items = [], limit = 4, className = "" }) {
  const [expanded, setExpanded] = useState(false);
  if (!items.length) return null;
  const hasMore = items.length > limit;
  const visibleItems = expanded || !hasMore ? items : items.slice(0, limit);

  return (
    <div className={className}>
      <ul className="space-y-2 text-sm text-white/80 leading-relaxed list-disc pl-5">
        {visibleItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {hasMore ? (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors"
        >
          {expanded ? "Show less" : `Show all (${items.length})`}
        </button>
      ) : null}
    </div>
  );
}

function ThoughtLeadershipAssetStrip({ images = [], title = "Thought leadership series" }) {
  if (!images.length) return null;
  return (
    <div className="mt-3">
      <ul className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {images.map((src, index) => (
          <li key={`${src}-${index}`} className="border border-white/15 bg-black/30 overflow-hidden">
            <img
              src={src}
              alt={`${title} carousel slide ${index + 1}`}
              className="w-full aspect-[4/5] object-contain bg-black/40"
              loading="lazy"
              decoding="async"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function RoleTimelineTeamSection({ roles = [], timeframe, team = [] }) {
  return (
    <section>
      <div className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/55 mb-2">Role + Timeline + Team</div>
      <div className="grid md:grid-cols-3 gap-4">
        <HoverSpotlight className="border-2 border-white/20 bg-black p-4 shadow-brut-sm">
          <div className="text-[10px] font-bold uppercase tracking-[0.26em] text-white/50">Role</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {roles.map((role) => (
              <span key={role} className="px-2.5 py-1 border border-white/25 text-[10px] uppercase tracking-[0.2em] text-white/80">
                {role}
              </span>
            ))}
          </div>
        </HoverSpotlight>
        <HoverSpotlight className="border-2 border-white/20 bg-black p-4 shadow-brut-sm">
          <div className="text-[10px] font-bold uppercase tracking-[0.26em] text-white/50">Timeline</div>
          <p className="mt-3 text-sm text-white/85 leading-relaxed">{timeframe ?? "2026"}</p>
        </HoverSpotlight>
        <HoverSpotlight className="border-2 border-white/20 bg-black p-4 shadow-brut-sm">
          <div className="text-[10px] font-bold uppercase tracking-[0.26em] text-white/50">Team</div>
          <div className="mt-3 space-y-2">
            {(team.length ? team : ["Solo designer"]).map((member) => (
              <p key={member} className="text-sm text-white/85 leading-relaxed">
                {member}
              </p>
            ))}
          </div>
        </HoverSpotlight>
      </div>
    </section>
  );
}

function ImproveNextSection() {
  const items = [
    "Run moderated usability tests with first-time riders to validate onboarding comprehension and challenge clarity.",
    "Add adaptive challenge difficulty so confidence grows without overwhelming new cyclists.",
    "Test reminder timing and reward cadence to improve 30-day return behavior.",
    "Expand accessibility support for low-vision users and reduce cognitive load in route mode.",
  ];
  return (
    <section>
      <div className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/55 mb-2">What I'd Improve Next</div>
      <HoverSpotlight className="border-2 border-white/20 bg-black p-6 md:p-7 shadow-brut-sm">
        <ul className="space-y-3 list-disc pl-5 text-sm text-white/80 leading-relaxed">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </HoverSpotlight>
    </section>
  );
}

function CommunityShowcase({ sections = [] }) {
  if (!sections.length) return null;
  return (
    <section className="space-y-6">
      {sections.map((item, index) => {
        const imageFirst = index % 2 === 0;
        return (
          <HoverSpotlight key={item.title} className="border-2 border-white/20 bg-black p-4 md:p-6 shadow-brut-sm">
            <div className="grid md:grid-cols-12 gap-5 md:gap-8 items-center">
              <div className={`md:col-span-6 ${imageFirst ? "md:order-1" : "md:order-2"}`}>
                <img
                  src={item.image}
                  alt={`${item.title} Yellow Bike feature`}
                  className="w-full h-auto border border-white/15 object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className={`md:col-span-6 ${imageFirst ? "md:order-2" : "md:order-1"}`}>
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/45">Community</div>
                <h3 className="mt-2 font-display text-2xl md:text-3xl font-extrabold tracking-tight uppercase">{item.title}</h3>
                <p className="mt-3 text-sm text-white/75 leading-relaxed">{item.copy}</p>
              </div>
            </div>
          </HoverSpotlight>
        );
      })}
    </section>
  );
}

function YellowBikeFlowSection({ title, imageSrc, alt }) {
  if (!imageSrc) return null;
  return (
    <section>
      <div className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/55 mb-2">{title}</div>
      <HoverSpotlight className="border-2 border-white/20 bg-black p-3 md:p-5 shadow-brut-sm">
        <img
          src={imageSrc}
          alt={alt}
          className="w-full h-auto object-contain border border-white/15"
          loading="lazy"
          decoding="async"
        />
      </HoverSpotlight>
    </section>
  );
}

function LogoComparisonSection({ existingLogo, proposedLogo }) {
  if (!existingLogo && !proposedLogo) return null;
  return (
    <section>
      <div className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/55 mb-2">Logo</div>
      <div className="grid md:grid-cols-2 gap-4">
        {existingLogo ? (
          <HoverSpotlight className="border-2 border-white/20 bg-black p-4 shadow-brut-sm">
            <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/55 mb-3">Existing Logo</div>
            <img
              src={existingLogo}
              alt="Yellow Bike existing logo design"
              className="w-full h-auto object-contain border border-white/15"
              loading="lazy"
              decoding="async"
            />
          </HoverSpotlight>
        ) : null}
        {proposedLogo ? (
          <HoverSpotlight className="border-2 border-white/20 bg-black p-4 shadow-brut-sm">
            <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/55 mb-3">Proposed Logo</div>
            <img
              src={proposedLogo}
              alt="Yellow Bike proposed logo design"
              className="w-full h-auto object-contain border border-white/15"
              loading="lazy"
              decoding="async"
            />
          </HoverSpotlight>
        ) : null}
      </div>
    </section>
  );
}

function YellowBikePaletteSection({ palette = [] }) {
  if (!palette.length) return null;
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section>
      <div className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/55 mb-2">Color Palette</div>
      <HoverSpotlight className="border-2 border-white/20 bg-black p-5 shadow-brut-sm">
        <div
          className="relative border-2 border-white/20 overflow-hidden bg-black min-h-[240px] md:min-h-[280px]"
        >
          <div
            className="absolute inset-y-0 left-0 w-12 pointer-events-none"
            style={{ backgroundColor: palette[0]?.hex ?? "#FFD800", zIndex: 1 }}
            aria-hidden
          />
          <div
            className="absolute inset-y-0 right-0 w-12 pointer-events-none"
            style={{ backgroundColor: palette[palette.length - 1]?.hex ?? "#B7DF00", zIndex: 1 }}
            aria-hidden
          />
          <div className="absolute inset-0 flex">
            {palette.map((swatch, index) => (
              <motion.div
                key={swatch.hex}
                className="relative flex-1 overflow-visible"
                style={{
                  zIndex: hoveredIndex === index ? 20 : 10,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{
                  flexGrow: hoveredIndex === null ? 1 : hoveredIndex === index ? 1.8 : 0.72,
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="absolute inset-y-0"
                  style={{
                    left: index === 0 ? "-32px" : "-22px",
                    right: index === palette.length - 1 ? "-32px" : "-22px",
                    backgroundColor: swatch.hex,
                    transform: "skewX(-14deg)",
                    transformOrigin: index === 0 ? "left center" : index === palette.length - 1 ? "right center" : "center",
                  }}
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 px-2 py-2">
                  <div
                    className="text-[10px] font-bold uppercase tracking-[0.14em]"
                    style={{
                      color: swatch.hex?.toUpperCase() === "#FF6B00" ? "#0b0b0b" : getReadableTextColor(swatch.hex),
                      textShadow: "0 1px 2px rgba(0,0,0,0.28)",
                    }}
                  >
                    {swatch.name}
                  </div>
                  <div
                    className="mt-0.5 text-[11px]"
                    style={{
                      color: swatch.hex?.toUpperCase() === "#FF6B00" ? "#0b0b0b" : getReadableTextColor(swatch.hex),
                      textShadow: "0 1px 2px rgba(0,0,0,0.28)",
                    }}
                  >
                    {swatch.hex}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(255,255,255,.20) 0 1px, transparent 1px 58px)",
            }}
            aria-hidden
          />
        </div>
      </HoverSpotlight>
    </section>
  );
}

function PrototypeEmbedSection({ embedSrc }) {
  if (!embedSrc) return null;
  return (
    <section>
      <div className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/55 mb-2">Try the App</div>
      <HoverSpotlight className="border-2 border-white/20 bg-black/60 p-3 md:p-4 shadow-brut-sm">
        <div className="w-full aspect-[16/10]">
          <iframe
            title="Yellow Bike interactive prototype"
            src={embedSrc}
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </HoverSpotlight>
    </section>
  );
}

function SurveyPieCard({ title, question, responses, data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 100;
  let running = 0;
  const segments = data.map((item, index) => {
    const start = running;
    const amount = (item.value / total) * 100;
    running += amount;
    return `${CHART_COLORS[index % CHART_COLORS.length]} ${start}% ${running}%`;
  });

  return (
    <HoverSpotlight className="h-full flex flex-col border-2 border-white/20 bg-black p-6 shadow-brut-sm">
      <h3 className="font-display text-lg font-bold tracking-tight uppercase">{title}</h3>
      {question ? <p className="mt-2 text-sm text-white/70">{question}</p> : null}
      <div className="mt-4 flex flex-col md:flex-row gap-5 md:items-center">
        <motion.div
          className="survey-pie-circle w-44 h-44 shrink-0"
          style={{ background: `conic-gradient(${segments.join(", ")})` }}
          role="img"
          aria-label={`${title} pie chart`}
          initial={{ opacity: 0, scale: 0.82, rotate: -35 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        />
        <ul className="space-y-2 text-xs text-white/75">
          {data.map((item, index) => (
            <motion.li
              key={item.label}
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
            >
              <span className="inline-block w-3 h-3" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }} aria-hidden />
              <span className="uppercase tracking-[0.12em]">{item.label}</span>
              <span className="text-white/55">{item.value}%</span>
            </motion.li>
          ))}
        </ul>
      </div>
      <p className="mt-auto pt-4 text-[11px] uppercase tracking-[0.28em] text-white/45">{responses ?? 0} responses</p>
    </HoverSpotlight>
  );
}

function SurveyBarCard({ title, question, responses, data }) {
  const max = Math.max(...data.map((item) => item.value), 1);
  const barsRef = useRef(null);
  const barsInView = useInView(barsRef, { once: true, amount: 0.35, margin: "-10% 0px" });

  return (
    <HoverSpotlight className="h-full flex flex-col border-2 border-white/20 bg-black p-6 shadow-brut-sm">
      <h3 className="font-display text-lg font-bold tracking-tight uppercase">{title}</h3>
      {question ? <p className="mt-2 text-sm text-white/70">{question}</p> : null}
      <ul ref={barsRef} className="mt-4 space-y-3">
        {data.map((item, index) => (
          <li key={item.label}>
            <div className="flex items-center justify-between text-xs text-white/75 mb-1">
              <span className="max-w-[75%]">{item.label}</span>
              <span>{item.value}%</span>
            </div>
            <div className="h-3 border border-white/25 bg-black">
              <motion.div
                className="h-full"
                initial={{ width: 0 }}
                animate={{ width: barsInView ? `${(item.value / max) * 100}%` : "0%" }}
                transition={{ duration: 0.55, delay: index * 0.07, ease: "easeOut" }}
                style={{
                  backgroundColor: CHART_COLORS[index % CHART_COLORS.length],
                }}
              />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-auto pt-4 text-[11px] uppercase tracking-[0.28em] text-white/45">{responses ?? 0} responses</p>
    </HoverSpotlight>
  );
}

function BikeabilityChartCard({ title, question, responses, data }) {
  const maxCount = Math.max(...data.map((item) => item.count), 1);
  return (
    <HoverSpotlight className="h-full flex flex-col border-2 border-white/20 bg-black p-6 shadow-brut-sm">
      <h3 className="font-display text-lg font-bold tracking-tight uppercase">{title}</h3>
      {question ? <p className="mt-2 text-sm text-white/70">{question}</p> : null}
      <div className="mt-6 grid grid-cols-5 gap-3 items-end h-48">
        {data.map((item, index) => (
          <div key={item.rating} className="flex flex-col items-center gap-2">
            <div className="w-full h-40 border border-white/25 bg-black flex items-end">
              <motion.div
                className="w-full"
                initial={{ height: 0 }}
                whileInView={{ height: `${(item.count / maxCount) * 100}%` }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  backgroundColor: CHART_COLORS[index % CHART_COLORS.length],
                }}
              />
            </div>
            <div className="text-[11px] text-white/70">#{item.rating}</div>
            <div className="text-[10px] text-white/50">{item.percentage}%</div>
          </div>
        ))}
      </div>
      <p className="mt-auto pt-4 text-[11px] uppercase tracking-[0.28em] text-white/45">{responses ?? 0} responses</p>
    </HoverSpotlight>
  );
}

function JourneyGrid({ data }) {
  const blocks = [
    { label: "Phases", items: data.phases ?? [] },
    { label: "Doing", items: data.doing ?? [] },
    { label: "Thinking", items: data.thinking ?? [] },
    { label: "Feeling", items: data.feeling ?? [] },
    { label: "Outcomes", items: data.outcomes ?? [] },
  ];
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {blocks.map((block) => (
        <HoverSpotlight key={block.label} className="border-2 border-white/20 bg-black p-5 shadow-brut-sm">
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.12em]">{block.label}</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/75 leading-relaxed list-disc pl-5">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </HoverSpotlight>
      ))}
    </div>
  );
}

function FutureStateGrid({ data }) {
  const blocks = [
    { label: "Doing", items: data.doing ?? [] },
    { label: "Thinking", items: data.thinking ?? [] },
    { label: "Feeling", items: data.feeling ?? [] },
    { label: "Outcomes", items: data.outcomes ?? [] },
  ];

  return (
    <div className="space-y-4">
      <HoverSpotlight className="border-2 border-white/20 bg-black p-5 shadow-brut-sm">
        <h3 className="font-display text-sm font-bold uppercase tracking-[0.12em]">Campaign Directions</h3>
        <div className="mt-3 grid md:grid-cols-2 gap-3">
          {(data.campaigns ?? []).map((campaign) => (
            <div key={campaign.title} className="border border-white/20 p-3 bg-black/50">
              <p className="text-xs uppercase tracking-[0.18em] text-white/85">{campaign.title}</p>
              {campaign.tagline ? <p className="mt-1 text-xs text-white/55">{campaign.tagline}</p> : null}
            </div>
          ))}
        </div>
      </HoverSpotlight>

      <div className="grid lg:grid-cols-2 gap-4">
        {blocks.map((block) => (
          <HoverSpotlight key={block.label} className="border-2 border-white/20 bg-black p-5 shadow-brut-sm">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.12em]">{block.label}</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/75 leading-relaxed list-disc pl-5">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </HoverSpotlight>
        ))}
      </div>
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
      return { preview: item, full: item, alt: altFallback, aspectRatio: undefined };
    }
    if (typeof item === "object") {
      const preview = item.preview ?? item.src ?? item.full;
      if (!preview) return null;
      const full = item.full ?? item.src ?? preview;
      const alt = item.alt ?? altFallback;
      const mediaAspectRatio = item.aspectRatio;
      return { preview, full, alt, aspectRatio: mediaAspectRatio };
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
                    {normalizedItems.map((media, index) => {
                      const tileAspectRatio = media.aspectRatio ?? aspectRatio;
                      return (
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
                        <div className="w-full" style={{ aspectRatio: tileAspectRatio }}>
                          <img src={media.preview} alt={media.alt} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                        </div>
                      </MotionFigure>
                      );
                    })}
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
              const tileAspectRatio = media.aspectRatio ?? aspectRatio;
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
                  <div className="w-full" style={{ aspectRatio: tileAspectRatio }}>
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
    const tileAspectRatio = media.aspectRatio ?? aspectRatio;
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
        <div className="w-full" style={{ aspectRatio: tileAspectRatio }}>
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
  const itemsSignature = useMemo(() => items.map((item) => item.full ?? item.preview ?? "").join("|"), [items]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [itemsSignature]);

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

function SocialFeedSection({
  posts,
  projectName,
  sectionTitle = "Instagram content system",
  sectionCopy,
  accountName,
  captionCopy,
  mediaAspectRatio = "4 / 5",
  reverseOrder = false,
  collapseThumbnails = false,
}) {
  const normalizedPosts = useMemo(
    () => {
      const mapped =
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
          .filter(Boolean) ?? [];

      const seen = new Set();
      const deduped = mapped.filter((post) => {
        if (!post?.src || seen.has(post.src)) return false;
        seen.add(post.src);
        return true;
      });

      return reverseOrder ? [...deduped].reverse() : deduped;
    },
    [posts, projectName, reverseOrder],
  );

  const [active, setActive] = useState(0);
  const [showThumbnails, setShowThumbnails] = useState(!collapseThumbnails);

  useEffect(() => {
    setActive(0);
  }, [normalizedPosts]);

  useEffect(() => {
    setShowThumbnails(!collapseThumbnails);
  }, [collapseThumbnails, normalizedPosts]);

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
  const resolvedSectionCopy =
    sectionCopy ??
    `A swipeable set of promos for ${projectName} showing how the conversational identity flexes across social placements. Motion and static stories share the same typography, color energy, and conversational copy structure.`;
  const resolvedAccountName = accountName ?? projectName;
  const resolvedCaptionCopy = captionCopy ?? "Talking to fans across every channel.";

  return (
    <section>
      <div className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/55 mb-3">Ads &amp; Social</div>
      <div className="grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-5 space-y-4">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight uppercase">{sectionTitle}</h2>
          <p className="text-white/70 text-sm leading-relaxed">{resolvedSectionCopy}</p>
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
                      <div className="insta-name">{resolvedAccountName}</div>
                      <div className="insta-meta">Sponsored</div>
                    </div>
                  </div>
                  <span className="insta-more" aria-hidden>•••</span>
                </div>
                <div className="insta-media" style={{ aspectRatio: mediaAspectRatio }}>
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
                  <span className="insta-name">{resolvedAccountName}</span>
                  <span className="insta-caption__copy"> {resolvedCaptionCopy}</span>
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
      {collapseThumbnails ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowThumbnails((prev) => !prev)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-white/25 text-[10px] font-bold uppercase tracking-[0.22em] text-white/75 hover:text-white hover:border-white/50 transition-colors"
            aria-expanded={showThumbnails}
          >
            {showThumbnails ? "Hide posts" : "View posts"}
            <ChevronRight className={`w-4 h-4 transition-transform ${showThumbnails ? "rotate-90" : ""}`} />
          </button>
        </div>
      ) : null}
      {showThumbnails ? (
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
                    <img src={post.src} alt={post.alt} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

