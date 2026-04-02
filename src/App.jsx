import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Home from "./pages/Home.jsx";
import ProjectsPage from "./pages/Projects.jsx";
import PostersPage from "./pages/Posters.jsx";
import ProjectDetailsPage from "./pages/ProjectDetails.jsx";
import FloatingFaceCard from "./components/FloatingFaceCard.jsx";

export default function App() {
  return <AppRoutes />;
}

function AppRoutes() {
  const location = useLocation();
  const appRef = useRef(null);
  const siteOrigin = "https://traviscrawforddesign.com";

  useEffect(() => {
    if (location.hash) return;
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

  useEffect(() => {
    const host = appRef.current;
    if (!host) return undefined;

    const target = { x: 50, y: 50 };
    const current = { x: 50, y: 50 };
    let scrollPct = 0;
    let rafId = 0;

    const updateScroll = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      scrollPct = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    };

    const onPointerMove = (event) => {
      target.x = (event.clientX / window.innerWidth) * 100;
      target.y = (event.clientY / window.innerHeight) * 100;
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;

      host.style.setProperty("--grid-focus-x", `${current.x.toFixed(2)}%`);
      host.style.setProperty("--grid-focus-y", `${current.y.toFixed(2)}%`);
      host.style.setProperty("--grid-scroll-offset", `${(scrollPct * 40).toFixed(2)}px`);
      host.style.setProperty("--grid-strength", `${(0.08 + scrollPct * 0.06).toFixed(3)}`);

      rafId = window.requestAnimationFrame(tick);
    };

    updateScroll();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return (
    <div ref={appRef} className="app-retro min-h-full">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          className="min-h-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/posters" element={<PostersPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <div className="app-retro__crt" aria-hidden />
      <div className="app-retro__led" aria-hidden title="Status" />
      <span className="app-retro__led-line" aria-hidden>
        run
      </span>
      <FloatingFaceCard showAfter={260} />
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono grid place-items-center px-6 py-16">
      <div className="max-w-md w-full border-2 border-white/30 p-10 text-center space-y-6 shadow-brut">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">404</p>
        <h1 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight uppercase">That page drifted off-grid.</h1>
        <a
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full border-2 border-white bg-white px-5 py-3 text-[10px] font-bold uppercase tracking-[0.28em] text-black hover:bg-transparent hover:text-white transition-colors"
        >
          ← Back to portfolio
        </a>
      </div>
    </div>
  );
}
