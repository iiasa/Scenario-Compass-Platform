import { Info } from "lucide-react";

export default function DataReleaseBanner() {
  return (
    <div className="dashboard-container flex items-center bg-white pt-6">
      <div className="mx-auto flex items-center gap-2 rounded-md border border-blue-200 bg-white px-4 py-3 text-sm text-blue-900">
        <Info size={16} className="shrink-0 text-blue-600" />
        <p>This dashboard shows data from SCI ensemble v1.1 (release September 2025)</p>
      </div>
    </div>
  );
}
