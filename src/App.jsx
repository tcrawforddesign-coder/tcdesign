import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

import PageTransition from "./components/animations/PageTransition.jsx";
import { useSmoothScroll } from "./hooks/useSmoothScroll.js";
import Home from "./pages/Home.jsx";
import ProjectsPage from "./pages/Projects.jsx";
import PostersPage from "./pages/Posters.jsx";
import ProjectDetailsPage from "./pages/ProjectDetails.jsx";

const MotionDiv = motion.div;

export default function App() {
  return <AppRoutes />;
}

function AppRoutes() {
  const location = useLocation();
  const siteOrigin = "https://traviscrawforddesign.com";
  useSmoothScroll();

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (!target) return;

      requestAnimationFrame(() => {
        window.__studioLenis?.scrollTo(target, { offset: -96 });
      });
      return;
    }

    if (window.__studioLenis) {
      window.__studioLenis.scrollTo(0, { immediate: true });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const routeMeta = {
      "/": {
        title: "TC Design — Portfolio",
        description:
          "Portfolio of Travis Crawford, a Texas-based visual designer focused on branding, campaign creative, and digital experiences.",
      },
      "/projects": {
        title: "Projects — TC Design",
        description: "Selected branding, campaign, and product design projects by Travis Crawford.",
      },
      "/posters": {
        title: "Poster Archive — TC Design",
        description: "Curated poster archive featuring concept and campaign visual design work.",
      },
    };

    const current = routeMeta[location.pathname] ?? {
      title: "Project Case Study — TC Design",
      description: "Project case study from the TC Design portfolio.",
    };

    document.title = current.title;

    const upsertMeta = (selector, attrs) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        document.head.appendChild(el);
      }
      Object.entries(attrs).forEach(([key, value]) => {
        el.setAttribute(key, value);
      });
    };

    upsertMeta("meta[name='description']", { name: "description", content: current.description });
    upsertMeta("meta[property='og:title']", { property: "og:title", content: current.title });
    upsertMeta("meta[property='og:description']", { property: "og:description", content: current.description });
    upsertMeta("meta[property='og:url']", { property: "og:url", content: `${siteOrigin}${location.pathname}` });
    upsertMeta("meta[name='twitter:title']", { name: "twitter:title", content: current.title });
    upsertMeta("meta[name='twitter:description']", { name: "twitter:description", content: current.description });

    let canonical = document.head.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${siteOrigin}${location.pathname}`);
  }, [location.pathname, siteOrigin]);

  return (
    <div className="min-h-full">
      <StudioCursor />
      <PageTransition routeKey={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/posters" element={<PostersPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </div>
  );
}

function StudioCursor() {
  const reduceMotion = useReducedMotion();
  const x = useSpring(useMotionValue(-100), { stiffness: 500, damping: 40, mass: 0.4 });
  const y = useSpring(useMotionValue(-100), { stiffness: 500, damping: 40, mass: 0.4 });
  const [state, setState] = useState({ visible: false, variant: "default" });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduceMotion || !canHover) return undefined;

    const updateCursor = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);

      const target = event.target.closest?.("[data-cursor], [data-cursor-zone], a, button, input, textarea, select");
      const zone = target?.dataset.cursorZone;
      const cursor = target?.dataset.cursor;
      const variant = zone === "tilt-card" ? "card" : cursor === "default" ? "default" : target ? "pointer" : "default";
      setState({ visible: true, variant });
    };

    const hideCursor = () => setState((current) => ({ ...current, visible: false }));

    window.addEventListener("pointermove", updateCursor);
    window.addEventListener("pointerleave", hideCursor);

    return () => {
      window.removeEventListener("pointermove", updateCursor);
      window.removeEventListener("pointerleave", hideCursor);
    };
  }, [reduceMotion, x, y]);

  if (reduceMotion) return null;

  return (
    <MotionDiv
      aria-hidden
      className={`studio-cursor studio-cursor--${state.variant}`}
      style={{ x, y }}
      animate={{
        opacity: state.visible ? 1 : 0,
        scale: state.variant === "card" ? 1.9 : state.variant === "pointer" ? 1.35 : 1,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 35 }}
    />
  );
}

function NotFound() {
  return (
    <div className="studio-page min-h-screen bg-stone-50 text-black grid place-items-center px-gutter py-24">
      <div className="studio-case-panel max-w-md w-full p-10 text-center space-y-6">
        <p className="text-lg font-bold text-stone-500 opsz-lg">404</p>
        <h1 className="text-[2rem]/9 font-bold opsz-5xl">That page drifted off-grid.</h1>
        <a href="/" className="inline-flex items-center justify-center rounded-[1.25rem] bg-black px-6 py-3 text-lg font-bold text-cloud-dancer squircle" data-cursor="default">
          Back to home
        </a>
      </div>
    </div>
  );
}
