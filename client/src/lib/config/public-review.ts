/**
 * Public review of the scenario evaluation criteria (Scenario Compass Initiative).
 *
 * Both the lilac band on the landing page and the opening block on the methodology
 * page are time-bound. Flip `PUBLIC_REVIEW.enabled` to `false` after the deadline to
 * switch them off in a single place.
 */
export const PUBLIC_REVIEW = {
  enabled: true,
  openedOn: "21 August 2026",
  deadline: "21 September 2026",
  criteriaOverviewUrl: "https://scenario-evaluation-criteria.iamconsortium.org/2026-update/",
  reviewFormUrl: "https://forms.gle/BiJR6hnnUcYQeLJS6",
} as const;
