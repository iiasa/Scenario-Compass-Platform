import { Fragment } from "react";
import {
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

const CELL_CLASS = "border border-stone-300 px-3 py-2 align-top";

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
  const tint = withAlpha(tierOne.color, 0.15);

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

              return (
                <tr
                  key={tierThree?.code ?? tierTwo.code}
                  style={{ backgroundColor: tint }}
                  className={isFirstTierOneRow ? "border-t-2 border-stone-400" : undefined}
                >
                  {isFirstTierOneRow && (
                    <th
                      scope="rowgroup"
                      rowSpan={tierOneRowSpan(tierOne)}
                      className={`${CELL_CLASS} text-left font-bold text-stone-900`}
                      style={{
                        backgroundColor: tierOne.color,
                        borderLeft: `6px solid ${tierOne.color}`,
                      }}
                    >
                      {tierOne.code}
                    </th>
                  )}
                  {isFirstTierTwoRow && (
                    <td
                      rowSpan={tierTwoRowSpan(tierTwo)}
                      className={CELL_CLASS}
                      style={{ backgroundColor: withAlpha(tierOne.color, 0.3) }}
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
                    <Criterion criterion={tierThree?.peakWarming ?? tierTwo.peakWarming} />
                  </td>
                  <td className={CELL_CLASS}>
                    <Criterion
                      criterion={
                        tierThree ? tierThree.endOfCenturyWarming : tierTwo.endOfCenturyWarming
                      }
                    />
                  </td>
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
      <table className="w-full min-w-[720px] border-collapse text-sm leading-5 text-stone-800">
        <caption className="sr-only">
          SCI climate categories with their peak and end-of-century warming criteria
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
            <th scope="col" rowSpan={2} className={`${CELL_CLASS} align-middle`}>
              End-of-century Warming
              <span className="block font-normal text-stone-600">(EoCW)</span>
            </th>
          </tr>
          <tr>
            <th scope="col" className={CELL_CLASS}>
              Tier I
            </th>
            <th scope="col" className={CELL_CLASS}>
              Tier II
            </th>
            <th scope="col" className={CELL_CLASS}>
              Tier III
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
