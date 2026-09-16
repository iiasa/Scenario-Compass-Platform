import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useScenarioFlagsSelection } from "@/hooks/nuqs/flags/use-scenario-flags-selection";

export function Sci2025ReleaseToggle({ prefix = "" }: { prefix?: string }) {
  const { onlySci2025, setOnlySci2025 } = useScenarioFlagsSelection(prefix);

  return (
    <div className="mt-4 mb-1 flex flex-col gap-3">
      <div className="flex items-start space-x-2">
        <Switch id="show-only-sci-2025" checked={onlySci2025} onCheckedChange={setOnlySci2025} />
        <Label htmlFor="show-only-sci-2025">
          Show only scenarios that were part of the 2025 release (v1.1)
        </Label>
      </div>
    </div>
  );
}
