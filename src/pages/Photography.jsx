import { ContactSection, PortfolioLayout } from "../components/portfolio/PortfolioLayout.jsx";
import { PageHero, WorkIndex } from "../components/portfolio/WorkPages.jsx";

export default function PhotographyPage() {
  return (
    <PortfolioLayout>
      <PageHero title="Photography" copy="Coming soon. In the meantime, the rest of the work is below." />
      <WorkIndex current="/photography" title="Other work" />
      <ContactSection />
    </PortfolioLayout>
  );
}
