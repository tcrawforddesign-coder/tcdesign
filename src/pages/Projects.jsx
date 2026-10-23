import { ContactSection, PortfolioLayout } from "../components/portfolio/PortfolioLayout.jsx";
import { PageHero, ProjectCardGrid, WorkIndex } from "../components/portfolio/WorkPages.jsx";
import { projects } from "../data/projects.js";

// The most notable case studies. Everything else lives on its own page
// (Branding, Logos, Posters, Experiments), linked from the rows below.
const FEATURED_SLUGS = ["civil-goat-coffee", "barbican-refresh", "yellow-bike", "atlas-coffee-club", "3sixty-integrated-marketing"];

const featuredProjects = FEATURED_SLUGS.map((slug) => projects.find((project) => project.slug === slug)).filter(Boolean);

export default function ProjectsPage() {
  return (
    <PortfolioLayout>
      <PageHero title="Featured work" copy="Brand identities, ad campaigns, an app concept and in-house marketing." />
      <ProjectCardGrid items={featuredProjects} label="Featured projects" />
      <WorkIndex current="/projects" />
      <ContactSection />
    </PortfolioLayout>
  );
}
