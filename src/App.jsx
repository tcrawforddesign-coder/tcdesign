import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Home from "./pages/Home.jsx";
import ProjectsPage from "./pages/Projects.jsx";
import PostersPage from "./pages/Posters.jsx";
import ProjectDetailsPage from "./pages/ProjectDetails.jsx";

export default function App() {
  return <AppRoutes />;
}

function AppRoutes() {
  const location = useLocation();

  return (
    <div className="app-retro min-h-full">
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
