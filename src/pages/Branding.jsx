import { ContactSection, PortfolioLayout } from "../components/portfolio/PortfolioLayout.jsx";
import { PageHero, ProjectCardGrid, WorkIndex } from "../components/portfolio/WorkPages.jsx";
import { projects } from "../data/projects.js";

const BRANDING_SLUGS = ["civil-goat-coffee", "barbican-refresh", "ritual-coffee", "yellow-bike", "data-dog-analytics"];

const brandingProjects = BRANDING_SLUGS.map((slug) => projects.find((project) => project.slug === slug)).filter(Boolean);

export default function BrandingPage() {
  return (
    <PortfolioLayout>
      <PageHero title="Branding" copy="Identity systems: logos, color, type, packaging and the rules that hold them together." />
      <ProjectCardGrid items={brandingProjects} label="Branding projects" />
      <WorkIndex current="/branding" />
      <ContactSection />
    </PortfolioLayout>
  );
}
