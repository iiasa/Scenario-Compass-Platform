import { AdvancedFilterSkeleton } from "@/containers/scenario-dashboard-container/components/meta-scenario-filters/skeletons/filter-skeleton";

export default function MetaIndicatorsFilterSkeleton(): React.ReactElement {
  return (
    <div className="w-full bg-white">
      <div className="dashboard-container mx-auto grid grid-cols-1 gap-6 pt-6 pb-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <AdvancedFilterSkeleton />
        <AdvancedFilterSkeleton />
        <AdvancedFilterSkeleton />
        <AdvancedFilterSkeleton />
        <AdvancedFilterSkeleton />
      </div>
    </div>
  );
}
