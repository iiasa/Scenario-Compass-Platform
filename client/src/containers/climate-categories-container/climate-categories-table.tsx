import { CSSProperties, Fragment } from "react";
import {
  CategoryCharacteristics,
  getAr6CategoryColors,
  SCI_CLIMATE_CATEGORIES,
  TierOneCategory,
  TierThreeCategory,
  TierTwoCategory,
  WarmingCriterion,
} from "@/lib/config/climate-categories/sci-climate-categories";

/** Appends an alpha channel to a 6-digit hex color, e.g. ("#97CEE4", 0.15) → "#97CEE426". */
const withAlpha = (hex: string, alpha: number) =>
  `${hex}${Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0")}`;

/** Solid fill for a single color, gradient when a category corresponds to several AR6 categories. */
const colorFill = (colors: string[], alpha: number, direction = "to bottom"): CSSProperties => {
  const shades = colors.map((color) => withAlpha(color, alpha));
  return shades.length > 1
    ? { backgroundImage: `linear-gradient(${direction}, ${shades.join(", ")})` }
    : { backgroundColor: shades[0] };
};

const ar6Colors = (characteristics: (CategoryCharacteristics | undefined)[]) => [
  ...new Set(characteristics.flatMap((c) => (c ? getAr6CategoryColors(c.ar6Category) : []))),
];

const tierTwoCharacteristics = (tierTwo: TierTwoCategory) =>
  tierTwo.children.length > 0 ? tierTwo.children : [tierTwo.characteristics];

const CELL_CLASS = "border border-stone-300 px-2 py-1.5 align-top";

function Criterion({ criterion }: { criterion: WarmingCriterion | null | undefined }) {
  if (!criterion) return null;
  return (
    <strong className="whitespace-nowrap">
      {criterion.metric}
      <sub>{criterion.percentile}</sub> {criterion.operator} {criterion.value}
    </strong>
  );
}

function CodeWithDescription({ code, description }: { code: string; description: string }) {
  return (
    <>
      <span className="block font-bold">{code}</span>
      <span className="block">{description}</span>
    </>
  );
}

const tierTwoRowSpan = (tierTwo: TierTwoCategory) => Math.max(1, tierTwo.children.length);

const tierOneRowSpan = (tierOne: TierOneCategory) =>
  tierOne.children.reduce((sum, tierTwo) => sum + tierTwoRowSpan(tierTwo), 0);

function CategoryRows({ tierOne }: { tierOne: TierOneCategory }) {
  const tierOneColors = ar6Colors(tierOne.children.flatMap(tierTwoCharacteristics));

  return (
    <>
      {tierOne.children.map((tierTwo, tierTwoIndex) => {
        const rows: (TierThreeCategory | null)[] =
          tierTwo.children.length > 0 ? tierTwo.children : [null];

        return (
          <Fragment key={tierTwo.code}>
            {rows.map((tierThree, tierThreeIndex) => {
              const isFirstTierTwoRow = tierThreeIndex === 0;
              const isFirstTierOneRow = tierTwoIndex === 0 && isFirstTierTwoRow;
              const characteristics = tierThree ?? tierTwo.characteristics;

              return (
                <tr
                  key={tierThree?.code ?? tierTwo.code}
                  style={colorFill(ar6Colors([characteristics]), 0.15, "to right")}
                  className={isFirstTierOneRow ? "border-t-2 border-stone-400" : undefined}
                >
                  {isFirstTierOneRow && (
                    <th
                      scope="rowgroup"
                      rowSpan={tierOneRowSpan(tierOne)}
                      className={`${CELL_CLASS} text-left font-bold whitespace-nowrap text-stone-900`}
                      style={colorFill(tierOneColors, 1)}
                    >
                      {tierOne.code}
                    </th>
                  )}
                  {isFirstTierTwoRow && (
                    <td
                      rowSpan={tierTwoRowSpan(tierTwo)}
                      className={CELL_CLASS}
                      style={colorFill(ar6Colors(tierTwoCharacteristics(tierTwo)), 0.3)}
                    >
                      <CodeWithDescription code={tierTwo.code} description={tierTwo.description} />
                    </td>
                  )}
                  <td className={CELL_CLASS}>
                    {tierThree && (
                      <CodeWithDescription
                        code={tierThree.code}
                        description={tierThree.description}
                      />
                    )}
                  </td>
                  <td className={CELL_CLASS}>
                    <Criterion criterion={characteristics?.peakWarming} />
                  </td>
                  <td className={CELL_CLASS}>
                    <Criterion criterion={characteristics?.endOfCenturyWarming} />
                  </td>
                  <td className={CELL_CLASS}>{characteristics?.ghgEmissions}</td>
                  <td className={CELL_CLASS}>{characteristics?.temperatureTrend}</td>
                  <td className={CELL_CLASS}>{characteristics?.ar6Category}</td>
                </tr>
              );
            })}
          </Fragment>
        );
      })}
    </>
  );
}

export function ClimateCategoriesTable() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse text-xs leading-4 text-stone-800">
        <caption className="sr-only">
          SCI climate categories with their warming criteria, end-of-century trends and
          corresponding IPCC AR6 categories
        </caption>
        <thead className="bg-stone-100 text-left text-stone-900">
          <tr>
            <th scope="colgroup" colSpan={3} className={`${CELL_CLASS} text-center`}>
              SCI Climate Category
            </th>
            <th scope="col" rowSpan={2} className={`${CELL_CLASS} align-middle`}>
              Peak Warming
              <span className="block font-normal text-stone-600">(PW)</span>
            </th>
            <th scope="colgroup" colSpan={3} className={`${CELL_CLASS} text-center`}>
              Climate and emissions trends at the end of the century
            </th>
            <th scope="col" rowSpan={2} className={`${CELL_CLASS} align-middle`}>
              Corresponding IPCC AR6 category
            </th>
          </tr>
          <tr>
            <th scope="col" className={`${CELL_CLASS} whitespace-nowrap`}>
              Tier I
            </th>
            <th scope="col" className={CELL_CLASS}>
              Tier II
            </th>
            <th scope="col" className={CELL_CLASS}>
              Tier III
            </th>
            <th scope="col" className={CELL_CLASS}>
              Warming
              <span className="block font-normal text-stone-600">(EoCW)</span>
            </th>
            <th scope="col" className={CELL_CLASS}>
              GHG emissions
            </th>
            <th scope="col" className={CELL_CLASS}>
              Temperature trend
            </th>
          </tr>
        </thead>
        <tbody>
          {SCI_CLIMATE_CATEGORIES.map((tierOne) => (
            <CategoryRows key={tierOne.code} tierOne={tierOne} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
