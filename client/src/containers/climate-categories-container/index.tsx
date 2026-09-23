import Link from "next/link";
import { Heading } from "@/components/custom/heading";
import { ClimateCategoriesTable } from "@/containers/climate-categories-container/climate-categories-table";
import MethodologyPageHero from "@/containers/methodology-container/methodology-page-hero";
import { CONTENT_LINK_CLASS } from "@/lib/utils";

export default function ClimateCategoriesContainer() {
  return (
    <>
      <MethodologyPageHero>
        <div className="content-container z-10 mt-14 flex flex-col gap-8 pb-20">
          <Heading variant="light" size="5xl" as="h1" id="hero-title" className="text-left">
            SCI Climate categorization
          </Heading>
        </div>
      </MethodologyPageHero>
      <section className="flex w-full flex-col items-center bg-white">
        <div className="content-container flex max-w-[1024px] flex-col gap-8 py-24 pb-10">
          <p>
            Climate responses and emission trajectories are important characteristics of long-term
            global emissions scenarios. In light of the updated scenario ensemble and the resulting
            changes in warming outcomes, the SCI &#34;Scientific working group on Emissions and
            Climate&#34; developed a new warming categorization (
            <Link className={CONTENT_LINK_CLASS} href="/about#embargo-notification">
              Riahi et al., 2026
            </Link>
            ). This framework builds on the warming categorizations used in SR1.5 and AR6, while
            improving the users’ understanding of the climatic implications of scenarios.
          </p>
          <ClimateCategoriesTable />
        </div>
      </section>
    </>
  );
}
