import { Link } from "react-router-dom";
import { StatementBand } from "./StatementBand";

/**
 * The sponsorship ask, as a statement rather than a card — one idea at
 * poster scale with nothing competing.
 *
 * The headline is NOT "Give a child their next chapter", which is what
 * mockup C drew. Seen on the built page, that landed a few hundred pixels
 * above the site footer's own CTA — "Give a child in Kagina their next
 * chapter." — so the same sentence appeared twice with overlapping buttons.
 * The footer is site-wide and was signed off separately, so this one moves.
 * "Plant a seed. Change a life." is the school's own phrasing and was this
 * section's heading before the mockup.
 */
export const Cta = () => (
  <StatementBand
    eyebrow="In partnership with the Crimson Foundation"
    lead="Plant a seed."
    pop="Change a life."
    body="Your sponsorship covers tuition, meals, and materials — and top graduates earn scholarships to leading secondary boarding schools."
  >
    <Link
      to="/crimson-for-life#sponsor"
      className="rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
    >
      Sponsor a Student
    </Link>
    <Link
      to="/crimson-for-life#partners"
      className="rounded-md border border-primary-foreground/40 px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
    >
      Partner with Crimson Foundation
    </Link>
  </StatementBand>
);
