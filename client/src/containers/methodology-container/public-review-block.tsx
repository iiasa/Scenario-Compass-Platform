import { Button } from "@/components/ui/button";
import { PublicReviewEyebrow } from "@/components/custom/public-review-eyebrow";
import { PUBLIC_REVIEW } from "@/lib/config/public-review";
import { CONTENT_LINK_CLASS } from "@/lib/utils";

export function PublicReviewBlock() {
  if (!PUBLIC_REVIEW.enabled) return null;

  return (
    <div className="border-burgundy flex flex-col gap-4 border-l-4 py-0.5 pl-4 sm:py-1 sm:pl-6">
      <PublicReviewEyebrow>Public review open · until {PUBLIC_REVIEW.deadline}</PublicReviewEyebrow>
      <h3 className="text-2xl leading-8 font-bold text-stone-900">
        Help update the scenario evaluation criteria
      </h3>
      <p>
        As part of the Scenario Compass Initiative (SCI), we are curating a set of community-agreed
        criteria for evaluating Integrated Assessment Model (IAM) scenarios. After compiling an
        initial set of criteria in 2025, we are now preparing an update of these criteria, and a
        public review has been open since {PUBLIC_REVIEW.openedOn}. A high-level review should take
        approximately 15 minutes, although we naturally welcome more detailed feedback if your time
        permits.
      </p>
      <p>
        An{" "}
        <a
          href={PUBLIC_REVIEW.criteriaOverviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={CONTENT_LINK_CLASS}
        >
          overview of the evaluation criteria
        </a>{" "}
        is available for reference. To accept the invitation, please follow the instructions and
        submit your answers through{" "}
        <a
          href={PUBLIC_REVIEW.reviewFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={CONTENT_LINK_CLASS}
        >
          this form
        </a>
        , which also provides more details on the review. We hope to receive your review by{" "}
        {PUBLIC_REVIEW.deadline}, and you are welcome to extend this invitation to colleagues who
        you think may be interested.
      </p>
      <div className="flex flex-col gap-3.5 pt-1 sm:flex-row sm:flex-wrap">
        <Button asChild size="lg" className="w-full sm:w-auto">
          <a href={PUBLIC_REVIEW.reviewFormUrl} target="_blank" rel="noopener noreferrer">
            Submit your review
          </a>
        </Button>
        <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
          <a href={PUBLIC_REVIEW.criteriaOverviewUrl} target="_blank" rel="noopener noreferrer">
            See the criteria
          </a>
        </Button>
      </div>
    </div>
  );
}
