import { cn } from "@/lib/utils";

/**
 * Eyebrow + title + optional lede, left-aligned — the header shape every
 * dedicated page on the site uses.
 *
 * This exists because the home page was the one place that couldn't keep it
 * straight: HowItWorks, Features, Testimonials and FAQ all centred their
 * headers inside a `max-w-2xl mx-auto`, while About and Team left-aligned,
 * so the page alternated between two conventions as you scrolled. Six home
 * sections sharing one component makes that class of drift impossible.
 *
 * Admissions.tsx and Portal.tsx each still define a local `Head` with the
 * same markup. Consolidating those onto this component is a safe follow-up,
 * deliberately not done here to keep this change to the home page.
 */
export const SectionHead = ({
  eyebrow,
  title,
  lede,
  light = false,
  className,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  /** For crimson/dark grounds, where the muted foreground colours invert. */
  light?: boolean;
  className?: string;
}) => (
  <div className={className}>
    <div
      className={cn(
        "text-xs font-semibold uppercase tracking-wider",
        light ? "text-accent" : "text-eyebrow",
      )}
    >
      {eyebrow}
    </div>
    <h2
      className={cn(
        "mt-2 max-w-[26ch] font-heading text-2xl font-semibold leading-tight md:text-3xl",
        light && "text-primary-foreground",
      )}
    >
      {title}
    </h2>
    {lede && (
      <p
        className={cn(
          "mt-4 max-w-[65ch] leading-relaxed",
          light ? "text-primary-foreground/85" : "text-muted-foreground",
        )}
      >
        {lede}
      </p>
    )}
  </div>
);
