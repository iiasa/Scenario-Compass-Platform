import { Heading } from "@/components/custom/heading";
import AboutPageHero from "@/containers/about-container/about-page-hero";
import { INTERNAL_PATHS, SHOWCASE_PAGE_LINKS } from "@/lib/paths";
import { CONTENT_LINK_CLASS } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type ShowcaseItem = {
  title: string;
  description: string;
  href: string;
  external: boolean;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    title: "Emissions Gap Report 2026",
    description:
      "The SCI scenario ensemble was used in the scenario assessment of the 2026 Emissions Gap Report.",
    href: SHOWCASE_PAGE_LINKS.EMISSIONS_GAP_REPORT_2026,
    external: true,
    image: {
      src: "/images/showcase/egr-2026-cover.webp",
      alt: "Cover of the Emissions Gap Report 2026",
      width: 393,
      height: 558,
    },
  },
  {
    title: "UNEP-FI Climate Pathways Navigator",
    description:
      "The scenarios were used to develop a specialized tool designed to support financial institutions in setting science-based climate targets and assessing sectoral decarbonization pathways.",
    href: SHOWCASE_PAGE_LINKS.UNEP_FI_CLIMATE_PATHWAYS_NAVIGATOR,
    external: true,
    image: {
      src: "/images/showcase/unep-fi-navigator.webp",
      alt: "The UNEP-FI Climate Pathways Navigator shown on a desktop screen",
      width: 723,
      height: 397,
    },
  },
  {
    title: "Seventh Assessment Report of the IPCC",
    description:
      "The SCI was highlighted in two open letters written by authors of the upcoming 7th Assessment Report of the IPCC (AR7) encouraging the submission of scenario data to community databases.",
    href: INTERNAL_PATHS.AR7,
    external: false,
  },
];

function linkProps(item: ShowcaseItem) {
  return item.external ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

export default function ShowcaseContainer() {
  return (
    <>
      <AboutPageHero>
        <div className="content-container z-10 mt-14 flex flex-col gap-8 pb-20">
          <Heading variant="light" size="5xl" as="h1" id="hero-title" className="text-left">
            Showcase
          </Heading>
          <h2 className="text-foreground text-xl leading-7 lg:w-2/5">
            The ensemble compiled by the Scenario Compass is used by several high-level reports and
            activities.
          </h2>
        </div>
      </AboutPageHero>
      <section className="flex w-full flex-col items-center bg-white">
        <div className="content-container flex max-w-[846px] flex-col gap-16 py-24 pb-10">
          <div className="flex flex-col gap-4 text-center">
            <Heading as="h2" size="4xl" variant="light">
              Work based on the Scenario Compass
            </Heading>
            <p className="text-lg leading-7">
              The aim of the Scenario Compass Initiative is to provide a useful ensemble of curated
              pathways for policy-relevant analysis of climate mitigation strategies. The examples
              below show recent uses of the scenario ensemble.
            </p>
          </div>
          {SHOWCASE_ITEMS.map((item) => (
            <article
              key={item.title}
              className="flex flex-col gap-6 text-black sm:flex-row sm:items-center sm:gap-10"
            >
              <div className="flex flex-1 flex-col gap-4">
                <h3 className="text-2xl leading-8 font-bold text-stone-900">{item.title}</h3>
                <p>{item.description}</p>
                <Link
                  href={item.href}
                  {...linkProps(item)}
                  aria-label={`Learn more: ${item.title}`}
                  className={`${CONTENT_LINK_CLASS} w-fit`}
                >
                  Learn more
                </Link>
              </div>
              {item.image ? (
                <Link
                  href={item.href}
                  {...linkProps(item)}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="w-64 max-w-full shrink-0"
                >
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    className="h-auto w-full"
                  />
                </Link>
              ) : (
                // Keeps the text width consistent with items that have an image
                <div aria-hidden="true" className="hidden shrink-0 sm:block sm:w-64" />
              )}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
