import ScenarioDashboardHero from "@/containers/scenario-dashboard-container/components/module-hero";
import MetaIndicatorsFilters from "@/containers/scenario-dashboard-container/components/meta-scenario-filters";
import ScenarioExplorationPlotsSection from "@/containers/scenario-dashboard-container/components/plots-section";
import { Suspense } from "react";
import ScenarioDashboardTopFilter from "@/containers/scenario-dashboard-container/components/filter-top";
import { Heading } from "@/components/custom/heading";
import { EXTERNAL_PATHS, INTERNAL_PATHS } from "@/lib/paths";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import MetaIndicatorsFilterSkeleton from "@/containers/scenario-dashboard-container/components/meta-scenario-filters/skeletons/meta-indicators-filter-skeleton";
import DataReleaseBanner from "@/containers/scenario-dashboard-container/components/data-release-banner";

export default function ScenarioDashboardContainer() {
  return (
    <>
      <ScenarioDashboardHero>
        <div className="dashboard-container mt-14 mb-16 flex w-full items-end gap-8">
          <Heading variant="dark" size="5xl" as="h1" id="hero-title" className="text-left">
            Scenario Dashboard
          </Heading>
          <div className="mb-1 flex flex-col gap-1">
            <Link
              href={INTERNAL_PATHS.RUN_DASHBOARD_EXPLORATION}
              className="text-beige-light flex items-center gap-1"
            >
              <p className="text-base leading-6">See Single Scenario details</p>
              <ChevronRight size={16} />
            </Link>
            <Link
              href={EXTERNAL_PATHS.EXPERT_USER_INTERFACE}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Go to Expert User Interface (opens in a new tab)"
              className="text-beige-light flex items-center gap-1"
            >
              <p className="text-base leading-6">Go to Expert User Interface</p>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
        <ScenarioDashboardTopFilter />
      </ScenarioDashboardHero>
      <Suspense fallback={null}>
        <DataReleaseBanner />
      </Suspense>
      <Suspense fallback={<MetaIndicatorsFilterSkeleton />}>
        <MetaIndicatorsFilters />
      </Suspense>
      <ScenarioExplorationPlotsSection />
    </>
  );
}
