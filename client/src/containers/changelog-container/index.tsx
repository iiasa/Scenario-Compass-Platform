import { Heading } from "@/components/custom/heading";
import { Navbar } from "@/components/layout/navbar/navbar";
import { EXTERNAL_PATHS } from "@/lib/paths";
import { CONTENT_LINK_CLASS } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const ZENODO_CONCEPT_DOI = "10.5281/zenodo.18598250";
const MAGICC_2026 = "MAGICC (v7.6.0a3)";
const VETTING_CRITERIA_URL = "https://scenario-evaluation-criteria.iamconsortium.org/2026.08.03/";
const SCENARIO_COMPASS_DOCS_URL = "https://scenariocompass.readthedocs.io/";
const CATEGORIES_PATH = "/methodology/categories";

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className={CONTENT_LINK_CLASS}>
      {children}
    </Link>
  );
}

function DoiBadge({ doi }: { doi: string }) {
  return (
    <Link
      href={`https://doi.org/${doi}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`DOI ${doi}`}
      className="inline-flex w-fit overflow-hidden rounded text-xs leading-5 font-medium text-white hover:opacity-90"
    >
      <span className="bg-stone-600 px-2">DOI</span>
      <span className="bg-burgundy px-2">{doi}</span>
    </Link>
  );
}

const VettingCriteria = () => (
  <>
    the criteria for historical vetting and feasibility/sustainability flagging (2026-08-03,{" "}
    <ExternalLink href={VETTING_CRITERIA_URL}>{VETTING_CRITERIA_URL}</ExternalLink>). See also the
    related Python package at{" "}
    <ExternalLink href={SCENARIO_COMPASS_DOCS_URL}>{SCENARIO_COMPASS_DOCS_URL}</ExternalLink>.
  </>
);

const RiahiCategories = () => (
  <>
    Riahi et al. (2026), see{" "}
    <Link href={CATEGORIES_PATH} className={CONTENT_LINK_CLASS}>
      https://scenariocompass.org/methodology/categories
    </Link>
  </>
);

type Release = {
  title: string;
  doi: string;
  content: ReactNode;
};

const RELEASES: Release[] = [
  {
    title: "SCI Ensemble 2026 (release v2.0, October 8, 2026)",
    doi: "10.5281/zenodo.23232097",
    content: (
      <>
        <p>
          This release compiles the scenarios from release v1.1 (August 5, 2026) as well as the
          ScenarioMIP scenarios (release v0.1, September 1, 2026) and all scenarios submitted to the
          SCI Sandbox and requested to be transferred until early October 2026. Specifically, more
          than 300 scenarios including results from the model-comparison project ELEVATE and from 20
          single-model studies submitted by 15 modelling teams.
        </p>
        <p>
          All scenarios were assessed using the latest available version of the simple climate model{" "}
          {MAGICC_2026}, based on emissions-harmonization using reference data up to 2023. Scenarios
          were also evaluated using <VettingCriteria />
        </p>
        <p>
          Scenarios were categorized according to their temperature pathways as described in{" "}
          <RiahiCategories />.
        </p>
      </>
    ),
  },
  {
    title: "SCI Ensemble 2025 (release v1.2, October 6, 2026)",
    doi: "10.5281/zenodo.23188984",
    content: (
      <p>
        This release compiles the scenarios from release v1.1 (August 5, 2026) as well as the
        ScenarioMIP scenarios (release v0.1, September 1, 2026).
      </p>
    ),
  },
  {
    title: "SCI Ensemble 2025 (release v1.1, August 5, 2026)",
    doi: "10.5281/zenodo.21805011",
    content: (
      <>
        <p>
          This release updates the initial release v1.0 (February 16, 2026) with the following
          changes:
        </p>
        <ul className="flex list-disc flex-col gap-2 pl-6">
          <li>
            All scenarios were assessed using the latest available version of the simple climate
            model {MAGICC_2026}, based on emissions-harmonization using reference data up to 2023.
          </li>
          <li>
            The climate categorisation (see <RiahiCategories />) was redone using the updated
            climate assessment MAGICC v7.6.0a3 instead of MAGICC v7.5.3 used in release v1.0.
          </li>
          <li>
            Scenarios were evaluated using <VettingCriteria />
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "SCI Ensemble 2025 (release v1.0, February 16, 2026)",
    doi: "10.5281/zenodo.18598251",
    content: (
      <>
        <p>
          This release includes all scenarios from the ensemble used for the IPCC&apos;s Sixth
          Assessment Report (Byers et al., 2022, doi:{" "}
          <ExternalLink href="https://doi.org/10.5281/zenodo.5886911">
            10.5281/zenodo.5886911
          </ExternalLink>
          ) that had sufficient information for climate-assessment as well as scenarios published
          until the end of 2025 that were submitted to the SCI Sandbox.
        </p>
        <p>
          All scenarios were assessed with respect to their temperature diagnostics using the same
          setup as used for AR6, specifically the same emissions harmonisation and the climate model
          MAGICC v7.5.3.
        </p>
        <p>
          Scenarios were also evaluated using the criteria for historical vetting and
          feasibility/sustainability flagging as described in the Supplementary Material of the
          first submission of the SCI manuscript (Riahi et al., 2026, doi:{" "}
          <ExternalLink href="https://doi.org/10.21203/rs.3.rs-8891091/v1">
            10.21203/rs.3.rs-8891091/v1
          </ExternalLink>
          ).
        </p>
      </>
    ),
  },
];

export default function ChangelogContainer() {
  return (
    <>
      <div className="bg-burgundy relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
        <Navbar theme="dark" sheetTheme="burgundy" />
        <div className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full items-center justify-center lg:flex">
          <div className="container mx-auto flex h-full w-full items-end justify-end">
            <Image
              src="/images/about-page/Illustration-02.webp"
              alt=""
              height={1365}
              width={2941}
              className="h-full w-auto scale-x-[-1] object-contain"
              priority
              quality={100}
            />
          </div>
        </div>
        <div className="content-container z-10 mt-14 flex flex-col gap-8 pb-20">
          <Heading variant="dark" size="5xl" as="h1" id="hero-title" className="text-left">
            Changelog
          </Heading>
          <h2 className="text-background h-20 text-xl leading-7 lg:w-2/5"></h2>
        </div>
      </div>
      <section className="flex w-full flex-col items-center bg-white">
        <div className="content-container flex max-w-[846px] flex-col gap-12 py-24 pb-10">
          <div className="flex flex-col gap-2 text-black">
            <p>
              You can find the full release history on{" "}
              <ExternalLink href={`https://doi.org/${ZENODO_CONCEPT_DOI}`}>Zenodo</ExternalLink>.
            </p>
            <p>
              Snapshot files can be downloaded{" "}
              <ExternalLink href={EXTERNAL_PATHS.IIASA_DOWNLOAD}>here</ExternalLink>.
            </p>
          </div>
          {RELEASES.map((release) => (
            <article key={release.doi} className="flex flex-col gap-4 text-black">
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl leading-8 font-bold text-stone-900">{release.title}</h3>
                <DoiBadge doi={release.doi} />
              </div>
              {release.content}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
