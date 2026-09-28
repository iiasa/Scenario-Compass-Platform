"use client";

import { Info } from "lucide-react";
import { useScenarioFlagsSelection } from "@/hooks/nuqs/flags/use-scenario-flags-selection";

export default function DataReleaseBanner({ prefix = "" }: { prefix?: string }) {
  const { onlySci2025 } = useScenarioFlagsSelection(prefix);

  if (!onlySci2025) return null;

  return (
    <div className="dashboard-container flex items-center bg-white pt-6">
      <div className="mx-auto flex items-center gap-2 rounded-md border border-blue-200 bg-white px-4 py-3 text-sm text-blue-900">
        <Info size={16} className="shrink-0 text-blue-600" />
        <p>This dashboard shows data from SCI ensemble v1.1 (release September 2025)</p>
      </div>
    </div>
  );
}
