import Link from "next/link";
import { LongCitation } from "@/components/custom/citation";

export const EMBARGO_NOTICE_HEADING = "Embargo Notification";

export function EmbargoNoticeText() {
  return (
    <>
      <p>
        This website contains scenario data associated with unpublished research and a manuscript
        currently under peer review.
      </p>
      <p>
        The data may be used for scientific research purposes. However, users must strictly adhere
        to the applicable{" "}
        <Link
          href="https://www.nature.com/nature-portfolio/editorial-policies/press-and-embargo-policies"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Nature editorial policies and embargo rules
        </Link>{" "}
        until the manuscript has been formally published.
      </p>
      <p className="text-black">Please use the following citation when using the data:</p>

      <LongCitation />
    </>
  );
}
