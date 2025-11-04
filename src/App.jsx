import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import ProjectsPage from "./pages/Projects.jsx";
import ProjectDetailsPage from "./pages/ProjectDetails.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:slug" element={<ProjectDetailsPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white grid place-items-center px-6 text-center space-y-4">
      <p className="text-sm uppercase tracking-[0.4em] text-white/50">404</p>
      <h1 className="text-3xl font-bold">That page drifted off-grid.</h1>
      <a
        href="/"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition"
      >
        ← Back to portfolio
      </a>
    </div>
  );
}
