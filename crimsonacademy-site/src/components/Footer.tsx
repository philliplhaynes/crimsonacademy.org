import logoHorizWhite from "@/assets/logo-horiz-white.webp";
import { Link } from "react-router-dom";
import { MapPin, Mail, Globe } from "lucide-react";
import { SocialLinks } from "@/components/SocialLinks";
import { cn } from "@/lib/utils";

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Non-Discrimination Policy", href: "/non-discrimination-policy" },
  { label: "Site Map", href: "/site-map" },
];

const quickLinks = [
  { label: "Term Dates", href: "/news#calendar" },
  { label: "Fees", href: "/admissions#fees" },
  { label: "How to Enroll", href: "/admissions#enroll" },
  { label: "Exam Results", href: "/academics#results" },
  { label: "Leadership & Staff", href: "/about#leadership" },
  { label: "Sponsor a Student", href: "/crimson-for-life#sponsor" },
  { label: "Portal Sign In", href: "/portal#login" },
];

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/*
        The CTA moment the design review flagged as missing — closes the
        site on the same two actions the navbar already offers (Enroll,
        Sponsor), not a new destination. Approved via the mockup at
        content/footer-mockup/index.html before landing here.

        Given the site's own tan/cream (bg-secondary, "soft cream" in
        App.css) rather than inheriting the crimson <footer> background —
        every text and button colour below is set explicitly rather than
        relying on the footer's default text-primary-foreground, since that
        default is cream-on-crimson and would be nearly invisible cream-on-
        cream here.
      */}
      <div className="border-b border-foreground/10 bg-secondary py-12 text-foreground sm:py-14">
        <div className="container text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-eyebrow">
            Every child deserves a chance to grow
          </span>
          <h2 className="mt-2.5 font-heading text-2xl font-semibold text-primary sm:text-3xl">
            Give a child in Kagina their next chapter.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Sponsorship covers tuition, meals, and materials. Top graduates earn scholarships to
            leading secondary boarding schools.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/admissions#enroll"
              className="rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Enroll Your Child
            </Link>
            <Link
              to="/crimson-for-life#sponsor"
              className="rounded-md border border-primary/40 px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              Sponsor a Student
            </Link>
          </div>
        </div>
      </div>

      {/*
        Get In Touch / slogan band — modelled on berkeleycarroll.org/who-we-are's
        footer (compared at content/footer-mockup/02-berkeley-style.html,
        approved before landing here). Two columns, divided by a rule at lg:
        contact info on the left per that request, the school's motto and quick
        links on the right.

        The wordmark is a generated white-on-transparent version of
        logo-horiz.webp (scripts inline, not checked in) rather than the old
        "dark logo on a light plate" fallback — that plate was a documented
        stopgap in this file until a light-coloured mark existed. Recolouring
        naively to flat white erased the tree's linework entirely (dark fill
        and cream highlight both became identical solid white), so the
        generator maps each pixel's original luminance to an alpha value
        instead: the dark fill stays fully opaque white, the cream highlight
        lines drop to ~30% opacity so the crimson shows through them — the
        tree stays legible as an engraved-seal effect rather than a blank
        shield.
      */}
      <div className="border-b border-primary-foreground/15 py-14">
        <div className="container grid gap-9 lg:grid-cols-2">
          <div>
            <Link to="/" className="inline-flex">
              <img src={logoHorizWhite} alt="Crimson Academy" className="h-11 w-auto" />
            </Link>
            <p className="mt-4 max-w-md text-sm text-primary-foreground/85">
              Faith, character, and academic excellence in Kagina, Rwanda. Nursery through Primary 6.
            </p>

            <h4 className="mt-7 font-heading text-xs font-extrabold uppercase tracking-wider text-accent">
              Get In Touch
            </h4>
            <ul className="mt-3.5 space-y-2.5 text-sm text-primary-foreground/85">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                Kagina, Kamonyi District, Southern Province, Rwanda
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <a
                  href="mailto:info@crimsonacademy.org"
                  className="transition-colors hover:text-accent"
                >
                  info@crimsonacademy.org
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                English · Français · Kinyarwanda
              </li>
            </ul>
          </div>

          <div className="lg:border-l lg:border-primary-foreground/20 lg:pl-9">
            <p className="font-heading text-[clamp(1.6rem,3.4vw,2.25rem)] font-black uppercase leading-[0.98] tracking-tight">
              Reaching Beyond
              <br />
              Impossibility.
            </p>
            <svg
              aria-hidden="true"
              viewBox="0 0 400 20"
              fill="none"
              className="mt-2 block h-3.5 w-32 overflow-visible sm:w-40"
            >
              <path
                d="M4 13C60 5 128 4 196 8c62 4 126 6 200 1"
                stroke="hsl(var(--accent))"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>

            <h4 className="mt-8 font-heading text-xs font-extrabold uppercase tracking-wider text-accent">
              Quick Links
            </h4>
            <ul className="mt-3.5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {quickLinks.map((q) => (
                <li key={q.href}>
                  <Link
                    to={q.href}
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {q.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Decorative dot texture, reused verbatim from Band's crimson/ink
          treatment in PosterHero.tsx rather than a new pattern. */}
      <div
        aria-hidden="true"
        className={cn(
          "h-11 opacity-30",
          "[background-image:radial-gradient(currentColor_0.6px,transparent_0.6px)] [background-size:15px_15px]",
        )}
      />

      {/*
        Bottom bar: social icons, the three legal links, and the copyright
        line all sit together as one centered group, on one row where it
        fits (lg+) and wrapping onto as many lines as it needs below that —
        not split to opposite ends the way berkeleycarroll.org arranges its
        own bottom bar, per what was asked for specifically.
      */}
      <div className="border-t border-primary-foreground/15 bg-foreground/10">
        {/*
          pb-16 below sm: ScrollToTop is a fixed bottom-4 right-4 button, so
          it always hovers over whatever sits in the viewport's bottom-right
          corner once scrolled to the page's actual end — there's no document
          height past the footer for the page to keep scrolling. Centering
          everything onto wrapped lines put the copyright text's last line
          exactly there at narrow widths (verified visually, not just via the
          scrollWidth overflow check, which doesn't catch fixed-position
          overlap at all). Extra bottom padding gives the button empty
          background to float over instead of covering text.
        */}
        <div className="container flex flex-wrap items-center justify-center gap-x-5 gap-y-3 py-6 pb-16 text-xs text-primary-foreground/70 sm:pb-6">
          <SocialLinks />
          <span className="hidden h-4 w-px bg-primary-foreground/25 sm:block" aria-hidden="true" />
          <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="text-[0.75rem] font-semibold uppercase tracking-wide text-primary-foreground/80 transition-colors hover:text-accent"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <span className="hidden h-4 w-px bg-primary-foreground/25 sm:block" aria-hidden="true" />
          <span>© {new Date().getFullYear()} Crimson Academy of Kagina. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};
