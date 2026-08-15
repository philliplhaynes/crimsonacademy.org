/**
 * Off-site and cross-cutting destinations used from more than one component.
 *
 * ZEFFY_DONATE_URL used to be a local constant duplicated wherever a
 * "Sponsor" button appeared, each pointing at the in-page
 * /crimson-for-life#sponsor anchor. Every one of those is now this same
 * external URL — a single source, so the campaign link can never drift
 * between Navbar, Hero, Footer, Cta and Academics again.
 *
 * ENROLLMENT_EMAIL is where the enrollment inquiry form (Admissions#inquire)
 * sends its mailto: — see EnrollmentForm.tsx for why mailto rather than a
 * hosted form service.
 */
export const ZEFFY_DONATE_URL =
  "https://www.zeffy.com/en-US/donation-form/donate-to-change-lives-17087";

export const ENROLLMENT_EMAIL = "news@crimsonfoundation.org";
