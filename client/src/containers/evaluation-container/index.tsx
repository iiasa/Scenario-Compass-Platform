import { Heading } from "@/components/custom/heading";
import AboutPageHero from "@/containers/about-container/about-page-hero";
import { EVALUATION_PAGE_LINKS } from "@/lib/paths";
import { CONTENT_LINK_CLASS } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

const CELL_CLASS = "border border-stone-300 px-3 py-2 align-top";

type CriteriaVersion = {
  version: string;
  publicReview: string;
  link: { href: string; label: string } | null;
};

const CRITERIA_VERSIONS: CriteriaVersion[] = [
  {
    version: "2026.08.03",
    publicReview: "January 17 – February 10 2025; current stable version",
    link: {
      href: EVALUATION_PAGE_LINKS.CRITERIA_2026_08_03,
      label: "doi.org/10.5281/zenodo.21771914",
    },
  },
  {
    version: "2026 Update",
    publicReview: "August 21 – September 21 2026",
    link: null,
  },
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl leading-8 font-bold text-stone-900">{title}</h3>
      {children}
    </div>
  );
}

function CriteriaVersionsTable() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-sm leading-5 text-stone-800">
        <caption className="sr-only">
          Versions of the SCI scenario evaluation criteria with their public review periods
        </caption>
        <thead className="bg-stone-100 text-left text-stone-900">
          <tr>
            <th scope="col" className={CELL_CLASS}>
              Version
            </th>
            <th scope="col" className={CELL_CLASS}>
              Public review
            </th>
            <th scope="col" className={CELL_CLASS}>
              Link
            </th>
          </tr>
        </thead>
        <tbody>
          {CRITERIA_VERSIONS.map((row) => (
            <tr key={row.version}>
              <th scope="row" className={`${CELL_CLASS} text-left font-medium`}>
                {row.version}
              </th>
              <td className={CELL_CLASS}>{row.publicReview}</td>
              <td className={CELL_CLASS}>
                {row.link ? (
                  <Link
                    href={row.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={CONTENT_LINK_CLASS}
                  >
                    {row.link.label}
                  </Link>
                ) : (
                  "ongoing"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function EvaluationContainer() {
  return (
    <>
      <AboutPageHero>
        <div className="content-container z-10 mt-14 flex flex-col gap-8 pb-20">
          <Heading variant="light" size="5xl" as="h1" id="hero-title" className="text-left">
            Scenario Evaluation
          </Heading>
          <h2 className="text-foreground text-xl leading-7 lg:w-2/5">
            The Scenario Compass develops transparent criteria for evaluation of pathways and
            trends.
          </h2>
        </div>
      </AboutPageHero>
      <section className="flex w-full flex-col items-center bg-white">
        <div className="content-container flex max-w-[846px] flex-col gap-12 py-24 pb-10 text-black">
          <Section title="Scenario Evaluation Criteria">
            <p className="text-lg leading-7">
              A set of community criteria for evaluating integrated assessment emissions scenarios.
            </p>
            <p>
              Integrated Assessment Models (IAMs) are computational models that produce scenarios of
              economy, energy system, land use, and greenhouse-gas emissions developments over time,
              across regions, and under different policy assumptions. Those scenarios are often
              evaluated in the process of producing new scenarios or when collecting and assessing
              existing scenarios. Specifically, IAM scenarios are often checked against empirical
              observations, near-term projections, and sustainability targets to identify scenarios
              that are outdated, internally inconsistent, technically infeasible, or ecologically or
              socially undesirable.
            </p>
            <p>
              This website documents the criteria used to evaluate scenarios in the Scenario Compass
              Initiative (SCI). The criteria are developed to curate a high-quality scenario
              ensemble suitable for a wide range of scenario users. Following a transparent,
              community-driven process, the scenario evaluation criteria are reviewed every year and
              published in a versioned, machine-readable format. In addition, this website details
              the chosen thresholds, reference data, and justification for each criterion.
            </p>
          </Section>

          <Section title="How the criteria are developed">
            <p>
              The criteria are developed by the SCI in collaboration with the IAMC Scientific
              Working Groups on Scenarios and on Data, following the subsequent steps:
            </p>
            <ol className="flex list-decimal flex-col gap-2 pl-6">
              <li>
                <strong>Proposal.</strong> SCI working groups derive criteria and thresholds from
                peer-reviewed literature and official data sources.
              </li>
              <li>
                <strong>Open review.</strong> Draft criteria are published on this site for public
                review. The call is advertised online, through community mailing lists, and through
                professional networks.
              </li>
              <li>
                <strong>Response and revision.</strong> Responses to reviewer comments are made
                public. In the first public review, reviewers received direct responses to their
                comments and the resulting changes to the criteria via email.
              </li>
              <li>
                <strong>Release.</strong> The revised criteria are released as a new version and
                applied in the annual update of the Scenario Compass ensemble.
              </li>
            </ol>
            <p>
              In general, criteria are required to refer to variables that are critical for the
              global energy transition, reported consistently across scenarios in the database, and
              that can be linked to quantifiable thresholds derived from scientific literature or
              official data sources.
            </p>
          </Section>

          <Section title="Versions of SCI scenario evaluation criteria">
            <CriteriaVersionsTable />
          </Section>

          <Section title="Two types of criteria">
            <p>
              There are two types of evaluation criteria: historical vetting as well as feasibility
              and sustainability concerns.
            </p>
            <div className="flex flex-col gap-2">
              <h4 className="text-lg leading-7 font-semibold text-stone-900">Historical vetting</h4>
              <p>
                Scenarios are evaluated for correctly representing the current energy system. They
                are marked as inconsistent if they do not match reported historical real-world
                estimates for time periods in the past.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-lg leading-7 font-semibold text-stone-900">
                Feasibility and sustainability concerns
              </h4>
              <p>
                The feasibility evaluation concentrates on whether the near-term pace of technology
                deployment assumed in scenarios stays within empirically grounded bounds. An upper
                bound checks whether deployment is faster than existing capacity, project pipelines,
                lead times, and market dynamics can support. A lower bound, near-term plausibility,
                checks whether deployment falls implausibly low given capacity already operating or
                committed.
              </p>
              <p>
                The sustainability evaluation focuses on whether scenarios stay within resource and
                environmental limits, such as levels of bioenergy use, food availability, and
                cumulative geological CO₂ storage.
              </p>
            </div>
          </Section>

          <Section title="How the criteria are applied">
            <p>
              The criteria are applied on the SCI scenario database to derive a high-quality
              scenario ensemble recommended to use, amongst others for community benchmarks (see
              Riahi et al., submitted for the first edition of the community benchmarks). Please
              note that no scenario is removed from the database: all scenarios are recorded and
              remain available to users. Evaluation criteria are only used to identify a recommended
              scenario ensemble for benchmarking and other uses of scenario information.
            </p>
            <p>
              Failing or insufficiently reporting variables required for historical vetting leads to
              a scenario not being represented in the benchmarking scenario ensemble. When a
              feasibility or sustainability threshold is crossed, the scenario is flagged with a
              medium or high concern. A medium concern marks the point where problems may begin to
              emerge. Medium concerns do not affect whether a scenario is included in the scenario
              ensemble. A high concern means a value is either inconsistent even with the most
              optimistic reading of current evidence, or that a scenario raises serious
              sustainability concerns, leading to the scenario not being considered for the
              benchmark-relevant ensemble.
            </p>
          </Section>
        </div>
      </section>
    </>
  );
}
