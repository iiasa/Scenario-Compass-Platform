"use client";

import { ClimateFilter } from "@/containers/scenario-dashboard-container/components/meta-scenario-filters/climate-filter";
import { EnergyFilter } from "@/containers/scenario-dashboard-container/components/meta-scenario-filters/energy-filter";
import { LandFilter } from "@/containers/scenario-dashboard-container/components/meta-scenario-filters/land-filter";
import { AdvancedFilter } from "@/containers/scenario-dashboard-container/components/meta-scenario-filters/advanced-filter";
import { TypologiesFilter } from "@/containers/scenario-dashboard-container/components/meta-scenario-filters/typologies-filter";

export default function MetaIndicatorsFilters() {
  return (
    <div className="w-full bg-white">
      <div className="dashboard-container mx-auto pt-6">
        <p>Filter scenarios by key dimensions</p>
        <div className="grid grid-cols-1 gap-6 pt-6 pb-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <ClimateFilter />
          <TypologiesFilter />
          <EnergyFilter />
          <LandFilter />
          <AdvancedFilter />
        </div>
      </div>
    </div>
  );
}
