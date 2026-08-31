import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PublicReviewEyebrow } from "@/components/custom/public-review-eyebrow";
import { PUBLIC_REVIEW } from "@/lib/config/public-review";
import { INTERNAL_PATHS } from "@/lib/paths";

export function PublicReviewBand() {
  if (!PUBLIC_REVIEW.enabled) return null;

  return (
    <section className="bg-lilac flex w-full justify-center px-5 py-7 sm:px-12 sm:py-11">
      <div className="flex w-full max-w-[1180px] flex-col gap-3 sm:grid sm:grid-cols-[1.45fr_1fr] sm:items-center sm:gap-14">
        <div className="flex flex-col gap-3.5">
          <PublicReviewEyebrow>
            Public review open since {PUBLIC_REVIEW.openedOn}
          </PublicReviewEyebrow>
          <h2 className="font-display max-w-[22em] text-[26px] leading-[1.15] font-bold text-stone-900 sm:text-[38px]">
            Public review of scenario evaluation criteria open now
          </h2>
          <p className="max-w-[44em] text-[16px] leading-[1.6] text-pretty text-stone-900 sm:text-[17px]">
            Every scenario in the Compass is checked against these criteria — they decide which
            pathways are hidden by default and which carry a feasibility or sustainability flag. The
            Scenario Compass Initiative is updating them for 2026, and the community review is open.
          </p>
        </div>
        <div className="flex flex-col-reverse items-stretch gap-3.5 sm:flex-col sm:items-start">
          <Button
            asChild
            size="lg"
            className="h-12 w-full text-[15px] sm:h-13 sm:w-auto sm:text-base"
          >
            <Link href={INTERNAL_PATHS.METHODOLOGY}>How scenarios are evaluated</Link>
          </Button>
          <p className="text-[14px] leading-[1.5] text-stone-900 sm:text-[15px]">
            A high-level review takes about 15 minutes.
            <br className="hidden sm:inline" /> Reviews requested by{" "}
            <strong className="font-bold">{PUBLIC_REVIEW.deadline}</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
