"use client";

import { Info } from "lucide-react";
import Link from "next/link";
import { INTERNAL_PATHS } from "@/lib/paths";
import { useScenarioFlagsSelection } from "@/hooks/nuqs/flags/use-scenario-flags-selection";

const RELEASE_DOI_2025 = "10.5281/zenodo.21805011";
const RELEASE_DOI_2026 = "10.5281/zenodo.23232097";

export default function DataReleaseBanner({ prefix = "" }: { prefix?: string }) {
  const { onlySci2025 } = useScenarioFlagsSelection(prefix);

  const release_2025 = (
    <>
      SCI 2025 ensemble (release v1.1, August 5, 2026, doi:{" "}
      <a
        href={`https://doi.org/${RELEASE_DOI_2025}`}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        {RELEASE_DOI_2025}
      </a>
      )
    </>
  );

  const release_2026 = (
    <>
      SCI 2026 ensemble (release v2.0, October 8, 2026, doi:{" "}
      <a
        href={`https://doi.org/${RELEASE_DOI_2026}`}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        {RELEASE_DOI_2026}
      </a>
      )
    </>
  );

  return (
    <div className="dashboard-container flex items-center bg-white pt-6">
      <div className="mx-auto flex items-start gap-2 rounded-md border border-blue-200 bg-white px-4 py-3 text-sm text-blue-900">
        <Info size={16} className="mt-0.5 shrink-0 text-blue-600" />
        <div>
          {onlySci2025 ? (
            <p>This dashboard shows only scenarios from {release_2025}.</p>
          ) : (
            <p>
              This dashboard shows all scenarios from {release_2026} and recently
              submitted/published scenarios (&quot;live database mode&quot;).
            </p>
          )}
          <p className="text-blue-900/60">
            {onlySci2025
              ? "Use the toggle at the bottom right to show all scenarios."
              : "Use the toggle at the bottom right to show only scenarios from the SCI 2025 ensemble (release v1.1)."}
          </p>
          <p className="text-blue-900/60">
            See the{" "}
            <Link href={INTERNAL_PATHS.CHANGELOG} className="underline">
              changelog
            </Link>{" "}
            for the full release history.
          </p>
        </div>
      </div>
    </div>
  );
}
