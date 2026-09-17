import Link from "next/link";

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

      <div className="border-burgundy flex flex-col gap-3 border-l-2 bg-gray-50 px-5 py-4">
        <div>
          <p className="text-black">
            <em>
              &#34;Mitigation benchmarks from the 2025 community update of global emissions
              pathways&#34;
            </em>{" "}
            (Riahi et al., submitted).
          </p>
          <Link
            href="https://doi.org/10.21203/rs.3.rs-8891091/v1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-burgundy text-sm break-all underline"
          >
            https://doi.org/10.21203/rs.3.rs-8891091/v1
          </Link>
          <p className="text-black">
            This manuscript was revised and resubmitted consistent with release v1.1 of the
            ensemble. Please contact us for the updated version.
          </p>
        </div>

        <div>
          <p className="text-black">
            <em>&#34;Scenario Compass Initiative - Pathways Ensemble 2025 (v1.1)&#34;</em> (Huppmann
            et al.) Zenodo.
          </p>
          <Link
            href="https://doi.org/10.5281/zenodo.18598250"
            target="_blank"
            rel="noopener noreferrer"
            className="text-burgundy text-sm break-all underline"
          >
            https://doi.org/10.5281/zenodo.18598250
          </Link>
        </div>
      </div>
    </>
  );
}
