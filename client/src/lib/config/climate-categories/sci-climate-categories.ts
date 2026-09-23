/**
 * SCI climate categorization (Riahi et al., 2026), rendered on /methodology/categories.
 * Criteria are stored structurally so percentiles can be rendered as subscripts (e.g. PW₅₀ < 1.5°C).
 */

export interface WarmingCriterion {
  metric: "PW" | "EoCW";
  percentile: 50 | 67;
  operator: "<" | "≥";
  value: string;
}

/** Warming criteria and end-of-century trends shown in the columns right of the category tiers. */
export interface CategoryCharacteristics {
  peakWarming: WarmingCriterion;
  endOfCenturyWarming: WarmingCriterion | null;
  ghgEmissions: "Below net-zero" | "Above zero";
  temperatureTrend: "Decreasing" | "Increasing" | null;
  ar6Category: string;
}

export interface TierThreeCategory extends CategoryCharacteristics {
  code: string;
  description: string;
}

export interface TierTwoCategory {
  code: string;
  description: string;
  /** Empty when the category has no Tier III split; `characteristics` then apply to the Tier II row. */
  children: TierThreeCategory[];
  characteristics?: CategoryCharacteristics;
}

export interface TierOneCategory {
  code: string;
  children: TierTwoCategory[];
}

/**
 * IPCC AR6 WGIII category colors, used to color each SCI category by its corresponding AR6 category.
 * Source: pyam PYAM_COLORS "AR6-C1".."AR6-C8",
 * https://github.com/IAMconsortium/pyam/blob/main/pyam/plotting.py
 */
export const AR6_CATEGORY_COLORS: Record<string, string> = {
  C1: "#97CEE4",
  C2: "#778663",
  C3: "#6F7899",
  C4: "#A7C682",
  C5: "#8CA7D0",
  C6: "#FAC182",
  C7: "#F18872",
  C8: "#BD7161",
};

/** Colors of every AR6 category named in a label, e.g. "C7 [upper] & C8" → [C7 color, C8 color]. */
export const getAr6CategoryColors = (ar6Category: string): string[] =>
  (ar6Category.match(/C\d/g) ?? []).map((category) => AR6_CATEGORY_COLORS[category]);

const pw = (percentile: 50 | 67, value: string, operator: "<" | "≥" = "<"): WarmingCriterion => ({
  metric: "PW",
  percentile,
  operator,
  value,
});

const eocw = (percentile: 50 | 67, value: string): WarmingCriterion => ({
  metric: "EoCW",
  percentile,
  operator: "<",
  value,
});

const BELOW = "Below net-zero";
const ABOVE = "Above zero";
const DECREASING = "Decreasing";
const INCREASING = "Increasing";

const characteristics = (
  peakWarming: WarmingCriterion,
  endOfCenturyWarming: WarmingCriterion | null,
  ghgEmissions: CategoryCharacteristics["ghgEmissions"],
  temperatureTrend: CategoryCharacteristics["temperatureTrend"],
  ar6Category: string,
): CategoryCharacteristics => ({
  peakWarming,
  endOfCenturyWarming,
  ghgEmissions,
  temperatureTrend,
  ar6Category,
});

const tierThree = (
  code: string,
  description: string,
  ...rest: Parameters<typeof characteristics>
): TierThreeCategory => ({ code, description, ...characteristics(...rest) });

export const SCI_CLIMATE_CATEGORIES: TierOneCategory[] = [
  {
    code: "GW0",
    children: [
      {
        code: "GW0",
        description: "Below 1.5°C without overshoot",
        children: [
          tierThree(
            "GW0-I",
            "Below 1.5°C without overshoot",
            pw(50, "1.5°C"),
            eocw(50, "1.5°C"),
            BELOW,
            DECREASING,
            "lower part of C1",
          ),
          tierThree(
            "GW0-II",
            "Below 1.5°C without overshoot",
            pw(50, "1.5°C"),
            eocw(50, "1.5°C"),
            ABOVE,
            null,
            "lower part of C1",
          ),
        ],
      },
    ],
  },
  {
    code: "GW1",
    children: [
      {
        code: "GW1",
        description: "Below 1.6°C returning to 1.5°C",
        children: [
          tierThree(
            "GW1-I",
            "Below 1.5°C with limited overshoot",
            pw(50, "1.6°C"),
            eocw(50, "1.5°C"),
            BELOW,
            DECREASING,
            "C1",
          ),
          tierThree(
            "GW1-II",
            "Below 1.5°C with limited overshoot",
            pw(50, "1.6°C"),
            eocw(50, "1.5°C"),
            ABOVE,
            null,
            "C1",
          ),
        ],
      },
    ],
  },
  {
    code: "GW2",
    children: [
      {
        code: "GW2a",
        description: "Below 1.7°C returning to 1.5°C",
        children: [
          tierThree(
            "GW2-I",
            "Likely returning to 1.5°C",
            pw(50, "1.7°C"),
            eocw(67, "1.5°C"),
            BELOW,
            DECREASING,
            "C2 [lower]",
          ),
          tierThree(
            "GW2-II",
            "Returning to 1.5°C with 50% chance",
            pw(50, "1.7°C"),
            eocw(50, "1.5°C"),
            BELOW,
            DECREASING,
            "C2 [middle]",
          ),
        ],
      },
      {
        code: "GW2b",
        description: "Below 1.7°C without returning to 1.5°C",
        children: [
          tierThree(
            "GW2-IIIa",
            "Towards 1.5°C after 2100 with high overshoot",
            pw(50, "1.7°C"),
            eocw(50, "1.7°C"),
            BELOW,
            DECREASING,
            "C3 [lower]",
          ),
          tierThree(
            "GW2-IIIb",
            "Towards 1.5°C after 2100 with high overshoot",
            pw(50, "1.7°C"),
            eocw(50, "1.7°C"),
            ABOVE,
            DECREASING,
            "C3 [lower]",
          ),
          tierThree(
            "GW2-IIIc",
            "Towards 1.5°C after 2100 with high overshoot",
            pw(50, "1.7°C"),
            eocw(50, "1.7°C"),
            ABOVE,
            INCREASING,
            "C3 [lower]",
          ),
        ],
      },
    ],
  },
  {
    code: "GW3",
    children: [
      {
        code: "GW3a",
        description: "Likely below 2°C returning to 1.5°C",
        children: [
          tierThree(
            "GW3-I",
            "Likely below 2°C returning to 1.5°C",
            pw(67, "2°C"),
            eocw(50, "1.5°C"),
            BELOW,
            DECREASING,
            "C2 [upper]",
          ),
        ],
      },
      {
        code: "GW3b",
        description: "Likely below 2°C without returning to 1.5°C",
        children: [
          tierThree(
            "GW3-IIa",
            "Likely below 2°C",
            pw(67, "2°C"),
            eocw(67, "2°C"),
            BELOW,
            DECREASING,
            "C3",
          ),
          tierThree(
            "GW3-IIb",
            "Likely below 2°C",
            pw(67, "2°C"),
            eocw(67, "2°C"),
            ABOVE,
            DECREASING,
            "C3",
          ),
          tierThree(
            "GW3-IIc",
            "Below 2°C until 2100 with continuing warming",
            pw(67, "2°C"),
            eocw(67, "2°C"),
            ABOVE,
            INCREASING,
            "C3",
          ),
        ],
      },
    ],
  },
  {
    code: "GW4",
    children: [
      {
        code: "GW4",
        description: "Below 2°C",
        children: [
          tierThree(
            "GW4-I",
            "Below 2°C with efforts to return warming to lower levels in 22nd century",
            pw(50, "2°C"),
            eocw(50, "1.7°C"),
            BELOW,
            DECREASING,
            "C4 [lower]",
          ),
          tierThree(
            "GW4-IIa",
            "Below 2°C",
            pw(50, "2°C"),
            eocw(50, "2°C"),
            BELOW,
            DECREASING,
            "C4 [middle]",
          ),
          tierThree(
            "GW4-IIb",
            "Below 2°C",
            pw(50, "2°C"),
            eocw(50, "2°C"),
            ABOVE,
            DECREASING,
            "C4 [upper]",
          ),
          tierThree(
            "GW4-IIc",
            "Below 2°C by 2100 with continuing warming",
            pw(50, "2°C"),
            eocw(50, "2°C"),
            ABOVE,
            INCREASING,
            "C4",
          ),
        ],
      },
    ],
  },
  {
    code: "GW5",
    children: [
      {
        code: "GW5",
        description: "Below 2.5°C",
        children: [
          tierThree(
            "GW5-I",
            "Below 2.5°C",
            pw(50, "2.5°C"),
            eocw(50, "2.5°C"),
            ABOVE,
            DECREASING,
            "C5",
          ),
          tierThree(
            "GW5-II",
            "Below 2.5°C by 2100 with continuing warming",
            pw(50, "2.5°C"),
            eocw(50, "2.5°C"),
            ABOVE,
            INCREASING,
            "C5",
          ),
        ],
      },
    ],
  },
  {
    code: "GW6",
    children: [
      {
        code: "GW6",
        description: "Below 3.0°C",
        children: [],
        characteristics: characteristics(pw(50, "3°C"), eocw(50, "3°C"), ABOVE, null, "C6"),
      },
    ],
  },
  {
    code: "GW7",
    children: [
      {
        code: "GW7",
        description: "Below 3.5°C",
        children: [],
        characteristics: characteristics(
          pw(50, "3.5°C"),
          eocw(50, "3.5°C"),
          ABOVE,
          null,
          "C7 [lower]",
        ),
      },
    ],
  },
  {
    code: "GW8",
    children: [
      {
        code: "GW8",
        description: "Above 3.5°C",
        children: [],
        characteristics: characteristics(
          pw(50, "3.5°C", "≥"),
          null,
          ABOVE,
          null,
          "C7 [upper] & C8",
        ),
      },
    ],
  },
];
