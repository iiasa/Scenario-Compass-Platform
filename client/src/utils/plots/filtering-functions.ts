import { ExtendedRun } from "@/types/data/run";
import {
  getCategoryAbbrev,
  IS_PART_OF_SCI_2025,
  VETTING2025,
  VETTING_STATUS_PASSED,
} from "@/lib/config/reasons-of-concern/category-config";

export const hasVettingFlag = (run: ExtendedRun): boolean =>
  run.metaIndicators.some((mi) => mi.key === VETTING2025 && mi.value === VETTING_STATUS_PASSED);

export const hasSci2025ReleaseFlag = (run: ExtendedRun): boolean =>
  run.metaIndicators.some((mi) => mi.key === IS_PART_OF_SCI_2025 && mi.value === "true");

const isHiddenByFlag = (run: ExtendedRun, hiddenFlags: string[]): boolean => {
  if (hiddenFlags.length === 0 || !run.flagCategory) return false;
  const abbrev = getCategoryAbbrev(run.flagCategory);
  return abbrev ? hiddenFlags.includes(abbrev) : false;
};

export const filterDecadePoints = (extendedRuns: ExtendedRun[]) => {
  return extendedRuns.map((run) => {
    return {
      ...run,
      orderedPoints: run.orderedPoints.filter((point) => {
        if (point.year > 2050) {
          return point.year % 10 === 0;
        } else {
          return point.year % 5 === 0;
        }
      }),
    };
  });
};

export const filterVisibleRuns = (
  runs: ExtendedRun[],
  hiddenFlags: string[],
  showVetting: boolean,
  onlySci2025Release: boolean = false,
): ExtendedRun[] => {
  let workingRuns: ExtendedRun[];

  if (!showVetting) {
    workingRuns = runs.filter((run) => {
      return hasVettingFlag(run);
    });
  } else {
    workingRuns = runs;
  }

  if (onlySci2025Release) {
    workingRuns = workingRuns.filter((run) => hasSci2025ReleaseFlag(run));
  }

  return workingRuns.filter((run) => {
    const isHidden = isHiddenByFlag(run, hiddenFlags);
    return !isHidden;
  });
};
