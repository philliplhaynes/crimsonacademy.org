import { Link } from "react-router-dom";

/**
 * The sponsorship CTA band. Same crimson ground as before, now carrying the
 * dot texture and gold primary button that the crimson Bands on Admissions
 * and Portal use, so the three read as the same device.
 */
export const Cta = () => {
  return (
    <section className="relative overflow-hidden bg-primary py-14 text-primary-foreground sm:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(currentColor_0.6px,transparent_0.6px)] [background-size:15px_15px]"
      />
      <div className="container relative z-[1] text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">
          Plant a seed. Change a life.
        </span>
        <h2 className="mx-auto mt-2.5 max-w-2xl font-heading text-2xl font-semibold md:text-3xl">
          In partnership with the Crimson Foundation.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-primary-foreground/85">
          Your sponsorship gives a child in Kagina access to a world-class education, daily meals,
          and a future full of opportunity.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
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
        </div>
      </div>
    </section>
  );
};
