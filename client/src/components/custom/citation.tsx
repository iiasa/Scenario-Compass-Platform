import Link from "next/link";

const CURRENT_RELEASE_DOI = "10.5281/zenodo.23232097";

/** Inline reference to the current SCI ensemble release. */
export function ShortCitation() {
  return (
    <>
      SCI 2026 ensemble (release v2.0, October 8, 2026, doi:{" "}
      <a
        href={`https://doi.org/${CURRENT_RELEASE_DOI}`}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        {CURRENT_RELEASE_DOI}
      </a>
      )
    </>
  );
}

/** Full citation block for the manuscript and the Zenodo ensemble record. */
export function LongCitation() {
  return (
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
          This manuscript was revised and resubmitted consistent with release v1.1 of the ensemble.
          Please contact us for the updated version.
        </p>
      </div>

      <div>
        <p className="text-black">
          <em>&#34;Scenario Compass Initiative - Pathways Ensemble 2026 (v2.0)&#34;</em> (Huppmann
          et al.) Zenodo.
          <br />
          (or earlier versions)
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
  );
}
