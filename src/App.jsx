import { useEffect } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";

import PageTransition from "./components/animations/PageTransition.jsx";
import { PortfolioLayout } from "./components/portfolio/PortfolioLayout.jsx";
import { useSmoothScroll } from "./hooks/useSmoothScroll.js";
import Home from "./pages/Home.jsx";
import IntroOverlay from "./brand/IntroOverlay.jsx";
import ProjectsPage from "./pages/Projects.jsx";
import BrandingPage from "./pages/Branding.jsx";
import LogosPage from "./pages/Logos.jsx";
import PhotographyPage from "./pages/Photography.jsx";
import PostersPage from "./pages/Posters.jsx";
import ExperimentsPage from "./pages/Experiments.jsx";
import ProjectDetailsPage from "./pages/ProjectDetails.jsx";
import LogoQuestionnairePage from "./pages/LogoQuestionnaire.jsx";
import { resolveOgImage } from "./utils/ogImage.js";

export default function App() {
  return <AppRoutes />;
}

function AppRoutes() {
  const location = useLocation();
  const siteOrigin = "https://traviscrawforddesign.com";
  useSmoothScroll();

  // Tell the logo intro in index.html that the app has rendered, so it can
  // fly the lockup into the header and reveal the page.
  useEffect(() => {
    window.__tcAppReady = true;
    window.dispatchEvent(new Event("tc:app-ready"));
  }, []);

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
        title: "Travis Crawford",
        description:
          "Portfolio of Travis Crawford, a Texas-based visual designer focused on branding, campaign creative, and poster design.",
      },
      "/projects": {
        title: "Featured work — Travis Crawford",
        description: "Selected branding, campaign, and product design projects by Travis Crawford.",
      },
      "/branding": {
        title: "Branding — Travis Crawford",
        description: "Brand identity projects by Travis Crawford: logos, color, type, packaging and guidelines.",
      },
      "/logos": {
        title: "Logos — Travis Crawford",
        description: "Logos, marks and wordmarks designed by Travis Crawford.",
      },
      "/photography": {
        title: "Photography — Travis Crawford",
        description: "Photography by Travis Crawford. Coming soon.",
      },
      "/posters": {
        title: "Poster Archive — Travis Crawford",
        description: "Curated poster archive featuring concept and campaign visual design work.",
      },
      "/experiments": {
        title: "Experiments — Travis Crawford",
        description: "One-off, experimental, and abandoned visual design directions by Travis Crawford.",
      },
      "/logo-questionnaire": {
        title: "Logo Brief — Travis Crawford",
        description: "Submit a new logo project brief to Travis Crawford with business, style, and deliverable details.",
      },
    };

    const current = routeMeta[location.pathname] ?? {
      title: "Project Case Study — Travis Crawford",
      description: "Project case study from the Travis Crawford portfolio.",
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
    upsertMeta("meta[property='og:image']", { property: "og:image", content: resolveOgImage(location.pathname, siteOrigin) });
    upsertMeta("meta[name='twitter:title']", { name: "twitter:title", content: current.title });
    upsertMeta("meta[name='twitter:description']", { name: "twitter:description", content: current.description });
    upsertMeta("meta[name='twitter:image']", { name: "twitter:image", content: resolveOgImage(location.pathname, siteOrigin) });

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
      <IntroOverlay />
      <PageTransition routeKey={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/branding" element={<BrandingPage />} />
          <Route path="/logos" element={<LogosPage />} />
          <Route path="/photography" element={<PhotographyPage />} />
          <Route path="/posters" element={<PostersPage />} />
          <Route path="/experiments" element={<ExperimentsPage />} />
          <Route path="/logo-questionnaire" element={<LogoQuestionnairePage />} />
          <Route path="/projects/:slug" element={<ProjectDetailsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </div>
  );
}

function NotFound() {
  return (
    <PortfolioLayout>
      <section className="portfolio-hero portfolio-section portfolio-subpage-hero tc-not-found">
        <h1 className="portfolio-hero-title">
          This page doesn't exist<span className="tc-dot">.</span>
        </h1>
        <p className="portfolio-hero-copy">The link may be old, or the page has moved. The work is still here.</p>
        <div className="tc-actions">
          <Link to="/projects" className="tc-btn tc-btn-ink tc-btn-lg">
            See the work
          </Link>
          <Link to="/" className="tc-btn tc-btn-ghost tc-btn-lg">
            Go to the home page
          </Link>
        </div>
      </section>
    </PortfolioLayout>
  );
}
