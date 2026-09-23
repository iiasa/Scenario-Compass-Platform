/**
 * SCI climate categorization (Riahi et al, 2026), rendered on /methodology/categories.
 * Criteria are stored structurally so percentiles can be rendered as subscripts (e.g. PW₅₀ < 1.5°C).
 */

export interface WarmingCriterion {
  metric: "PW" | "EoCW";
  percentile: 50 | 67;
  operator: "<" | "≥";
  value: string;
}

export interface TierThreeCategory {
  code: string;
  description: string;
  peakWarming: WarmingCriterion;
  endOfCenturyWarming: WarmingCriterion | null;
}

export interface TierTwoCategory {
  code: string;
  description: string;
  /** Empty when the category has no Tier III split; criteria then live on the Tier II row. */
  children: TierThreeCategory[];
  peakWarming?: WarmingCriterion;
  endOfCenturyWarming?: WarmingCriterion | null;
}

export interface TierOneCategory {
  code: string;
  /** Hex color used for this category across the page (swatch, borders, row tint). */
  color: string;
  children: TierTwoCategory[];
}

/**
 * Cool-to-warm palette based on the IPCC AR6 WGIII category colors (C1–C8),
 * with an extra, deeper blue for GW0.
 */
export const CLIMATE_CATEGORY_COLORS: Record<string, string> = {
  GW0: "#5FA8D3",
  GW1: "#97CEE4",
  GW2: "#778663",
  GW3: "#6F7899",
  GW4: "#A7C682",
  GW5: "#8CA7D0",
  GW6: "#FAC182",
  GW7: "#F18872",
  GW8: "#BD7161",
};

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

export const SCI_CLIMATE_CATEGORIES: TierOneCategory[] = [
  {
    code: "GW0",
    color: CLIMATE_CATEGORY_COLORS.GW0,
    children: [
      {
        code: "GW0",
        description: "Below 1.5°C without overshoot",
        children: [
          {
            code: "GW0-I",
            description: "Below 1.5°C without overshoot",
            peakWarming: pw(50, "1.5°C"),
            endOfCenturyWarming: eocw(50, "1.5°C"),
          },
          {
            code: "GW0-II",
            description: "Below 1.5°C without overshoot",
            peakWarming: pw(50, "1.5°C"),
            endOfCenturyWarming: eocw(50, "1.5°C"),
          },
        ],
      },
    ],
  },
  {
    code: "GW1",
    color: CLIMATE_CATEGORY_COLORS.GW1,
    children: [
      {
        code: "GW1",
        description: "Below 1.6°C returning to 1.5°C",
        children: [
          {
            code: "GW1-I",
            description: "Below 1.5°C with limited overshoot",
            peakWarming: pw(50, "1.6°C"),
            endOfCenturyWarming: eocw(50, "1.5°C"),
          },
          {
            code: "GW1-II",
            description: "Below 1.5°C with limited overshoot",
            peakWarming: pw(50, "1.6°C"),
            endOfCenturyWarming: eocw(50, "1.5°C"),
          },
        ],
      },
    ],
  },
  {
    code: "GW2",
    color: CLIMATE_CATEGORY_COLORS.GW2,
    children: [
      {
        code: "GW2a",
        description: "Below 1.7°C returning to 1.5°C",
        children: [
          {
            code: "GW2-I",
            description: "Likely returning to 1.5°C",
            peakWarming: pw(50, "1.7°C"),
            endOfCenturyWarming: eocw(67, "1.5°C"),
          },
          {
            code: "GW2-II",
            description: "Returning to 1.5°C with 50% chance",
            peakWarming: pw(50, "1.7°C"),
            endOfCenturyWarming: eocw(50, "1.5°C"),
          },
        ],
      },
      {
        code: "GW2b",
        description: "Below 1.7°C without returning to 1.5°C",
        children: [
          {
            code: "GW2-IIIa",
            description: "Towards 1.5°C after 2100 with high overshoot",
            peakWarming: pw(50, "1.7°C"),
            endOfCenturyWarming: eocw(50, "1.7°C"),
          },
          {
            code: "GW2-IIIb",
            description: "Towards 1.5°C after 2100 with high overshoot",
            peakWarming: pw(50, "1.7°C"),
            endOfCenturyWarming: eocw(50, "1.7°C"),
          },
          {
            code: "GW2-IIIc",
            description: "Towards 1.5°C after 2100 with high overshoot",
            peakWarming: pw(50, "1.7°C"),
            endOfCenturyWarming: eocw(50, "1.7°C"),
          },
        ],
      },
    ],
  },
  {
    code: "GW3",
    color: CLIMATE_CATEGORY_COLORS.GW3,
    children: [
      {
        code: "GW3a",
        description: "Likely below 2°C returning to 1.5°C",
        children: [
          {
            code: "GW3-I",
            description: "Likely below 2°C returning to 1.5°C",
            peakWarming: pw(67, "2°C"),
            endOfCenturyWarming: eocw(50, "1.5°C"),
          },
        ],
      },
      {
        code: "GW3b",
        description: "Likely below 2°C without returning to 1.5°C",
        children: [
          {
            code: "GW3-IIa",
            description: "Likely below 2°C",
            peakWarming: pw(67, "2°C"),
            endOfCenturyWarming: eocw(67, "2°C"),
          },
          {
            code: "GW3-IIb",
            description: "Likely below 2°C",
            peakWarming: pw(67, "2°C"),
            endOfCenturyWarming: eocw(67, "2°C"),
          },
          {
            code: "GW3-IIc",
            description: "Below 2°C until 2100 with continuing warming",
            peakWarming: pw(67, "2°C"),
            endOfCenturyWarming: eocw(67, "2°C"),
          },
        ],
      },
    ],
  },
  {
    code: "GW4",
    color: CLIMATE_CATEGORY_COLORS.GW4,
    children: [
      {
        code: "GW4",
        description: "Below 2°C",
        children: [
          {
            code: "GW4-I",
            description: "Below 2°C with efforts to return warming to lower levels in 22nd century",
            peakWarming: pw(50, "2°C"),
            endOfCenturyWarming: eocw(50, "1.7°C"),
          },
          {
            code: "GW4-IIa",
            description: "Below 2°C",
            peakWarming: pw(50, "2°C"),
            endOfCenturyWarming: eocw(50, "2°C"),
          },
          {
            code: "GW4-IIb",
            description: "Below 2°C",
            peakWarming: pw(50, "2°C"),
            endOfCenturyWarming: eocw(50, "2°C"),
          },
          {
            code: "GW4-IIc",
            description: "Below 2°C by 2100 with continuing warming",
            peakWarming: pw(50, "2°C"),
            endOfCenturyWarming: eocw(50, "2°C"),
          },
        ],
      },
    ],
  },
  {
    code: "GW5",
    color: CLIMATE_CATEGORY_COLORS.GW5,
    children: [
      {
        code: "GW5",
        description: "Below 2.5°C",
        children: [
          {
            code: "GW5-I",
            description: "Below 2.5°C",
            peakWarming: pw(50, "2.5°C"),
            endOfCenturyWarming: eocw(50, "2.5°C"),
          },
          {
            code: "GW5-II",
            description: "Below 2.5°C by 2100 with continuing warming",
            peakWarming: pw(50, "2.5°C"),
            endOfCenturyWarming: eocw(50, "2.5°C"),
          },
        ],
      },
    ],
  },
  {
    code: "GW6",
    color: CLIMATE_CATEGORY_COLORS.GW6,
    children: [
      {
        code: "GW6",
        description: "Below 3.0°C",
        children: [],
        peakWarming: pw(50, "3°C"),
        endOfCenturyWarming: eocw(50, "3°C"),
      },
    ],
  },
  {
    code: "GW7",
    color: CLIMATE_CATEGORY_COLORS.GW7,
    children: [
      {
        code: "GW7",
        description: "Below 3.5°C",
        children: [],
        peakWarming: pw(50, "3.5°C"),
        endOfCenturyWarming: eocw(50, "3.5°C"),
      },
    ],
  },
  {
    code: "GW8",
    color: CLIMATE_CATEGORY_COLORS.GW8,
    children: [
      {
        code: "GW8",
        description: "Above 3.5°C",
        children: [],
        peakWarming: pw(50, "3.5°C", "≥"),
        endOfCenturyWarming: null,
      },
    ],
  },
];
