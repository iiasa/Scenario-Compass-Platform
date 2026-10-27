import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import queryKeys from "@/lib/query-keys";
import { LAND_FOREST_COVER } from "@/lib/config/filters/land-filter-config";
import { DataFrame } from "@iiasa/ixmp4-ts";
import { DataPoint } from "@/types/data/data-point";
import { extractDataPoints } from "@/utils/data-manipulation/extract-data-points";

interface Result {
  gfaIncreaseArray: Record<string, number>;
  isLoading: boolean;
  isError: boolean;
}

const EMPTY_GFA: Record<string, number> = {};

const selectDataPoints = (data: DataFrame) => extractDataPoints(data);

const WORLD_REGION = "World";
const BASE_YEAR = 2020;
const TARGET_YEAR = 2050;

// Both years are fetched in a single request and split by year client-side.
const fetchForestData = {
  ...queryKeys.dataPoints.tabulate({
    variable: { name: LAND_FOREST_COVER },
    region: { name: WORLD_REGION },
    // @ts-expect-error Not sufficient ts support
    stepYear_in: [BASE_YEAR, TARGET_YEAR],
  }),
  staleTime: 5 * 60 * 1000,
  select: selectDataPoints,
};

const calculatePercentageChanges = (data2020: DataPoint[], data2050: DataPoint[]) => {
  const results: Record<string, number> = {};
  const map2020 = new Map(data2020.map((point) => [point.runId, point.value]));

  for (const point2050 of data2050) {
    const value2020 = map2020.get(point2050.runId);

    if (value2020 && value2020 !== 0) {
      results[point2050.runId] = (100 * point2050.value) / value2020 - 100;
    }
  }

  return results;
};

export default function useComputeLandUse(): Result {
  const { data, isLoading, isError } = useQuery(fetchForestData);

  const gfaIncreaseArray = useMemo(() => {
    if (!data) {
      return EMPTY_GFA;
    }

    const data2020 = data.filter((point) => point.year === BASE_YEAR);
    const data2050 = data.filter((point) => point.year === TARGET_YEAR);

    if (data2050.length !== data2020.length) {
      console.warn(
        `Mismatched data lengths for land use: 2020 has ${data2020.length}, 2050 has ${data2050.length} data points`,
      );
    }

    return calculatePercentageChanges(data2020, data2050);
  }, [data]);

  return { gfaIncreaseArray, isLoading, isError };
}
