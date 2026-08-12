import logoHorizWhite from "@/assets/logo-horiz-white.webp";
import { Link } from "react-router-dom";
import { MapPin, Mail, Globe, ArrowUpRight } from "lucide-react";
import { SocialLinks } from "@/components/SocialLinks";
import { sections } from "@/nav";
import { cn } from "@/lib/utils";

const quickLinks = [
  { label: "Term Dates", href: "/news#calendar" },
  { label: "Fees", href: "/admissions#fees" },
  { label: "How to Enroll", href: "/admissions#enroll" },
  { label: "Exam Results", href: "/academics#results" },
  { label: "Leadership & Staff", href: "/about#leadership" },
  { label: "Sponsor a Student", href: "/crimson-for-life#sponsor" },
  { label: "Portal Sign In", href: "/portal#login" },
];

/**
 * Sister sites. Absolute URLs — these leave the Academy site.
 *
 * TODO(owner): GROUP_HOME is the new Crimson group landing page
 * (content/home-mockups/). Set this once you decide where it is hosted — its own
 * domain, or a path such as https://crimsonacademy.org/crimson. Until then the
 * link is omitted rather than pointed at a guessed URL.
 */
const GROUP_HOME = "";

const family = [
  ...(GROUP_HOME
    ? [
        {
          label: "Crimson (group)",
          href: GROUP_HOME,
          title: "The Crimson group home — Foundation, Investments, and Academy",
        },
      ]
    : []),
  {
    label: "Crimson Foundation",
    href: "https://crimsonfoundation.org",
    title: "Crimson Foundation — 501(c)(3) non-profit",
  },
];

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/*
        The CTA moment the design review flagged as missing — closes the
        site on the same two actions the navbar already offers (Enroll,
        Sponsor), not a new destination. Approved via the mockup at
        content/footer-mockup/index.html before landing here.
      */}
      <div className="border-b border-primary-foreground/15 py-12 sm:py-14">
        <div className="container text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">
            Every child deserves a chance to grow
          </span>
          <h2 className="mt-2.5 font-heading text-2xl font-semibold sm:text-3xl">
            Give a child in Kagina their next chapter.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-primary-foreground/80">
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
              className="rounded-md border border-primary-foreground/40 px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
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

      {/*
        Full sitemap, kept from the previous footer and still built from the
        same nav.ts `sections` — Berkeley Carroll's own footer doesn't carry
        one, but this site's is real navigation depth earned over the course
        of the project and wasn't asked to go. Styled quieter than the band
        above it (dimmer heading, smaller type) so it reads as reference
        material sitting under the two things the redesign asked to foreground.
      */}
      <div className="border-b border-primary-foreground/15 py-11">
        <div className="container">
          <nav aria-label="Site map" className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {sections.map((section) => (
              <div key={section.href}>
                <h5 className="font-heading text-[0.7rem] font-bold uppercase tracking-wide text-primary-foreground/55">
                  <Link to={section.href} className="transition-colors hover:text-accent">
                    {section.label}
                  </Link>
                </h5>
                <ul className="mt-2.5 space-y-1.5 text-[0.8rem] text-primary-foreground/85">
                  {section.children.map((child) => (
                    <li key={child.href}>
                      <Link to={child.href} className="transition-colors hover:text-accent">
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <p className="mt-7 border-t border-primary-foreground/15 pt-5 text-sm text-primary-foreground/70">
            In partnership with the{" "}
            {family.map((f, i) => (
              <span key={f.href}>
                {i > 0 && " · "}
                <a
                  href={f.href}
                  className="inline-flex items-center gap-1 text-accent transition-colors hover:text-primary-foreground"
                  title={f.title}
                >
                  {f.label}
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </a>
              </span>
            ))}
          </p>
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
        Social icons sit at the left of this bottom band with the copyright at
        the right — the arrangement berkeleycarroll.org uses. They live in
        SocialLinks.tsx rather than inline so a future footer change only has to
        keep placing one component, and the verified account URLs (and the note
        on why LinkedIn is absent) stay in one place.
      */}
      <div className="border-t border-primary-foreground/15 bg-foreground/10">
        {/* Icons left, copyright right — as on the reference, and also because
            ScrollToTop floats over the bottom-right corner and would sit on top
            of the last icon if the order were reversed. */}
        <div className="container flex flex-col items-start justify-between gap-4 py-5 text-xs text-primary-foreground/70 sm:flex-row sm:items-center">
          <SocialLinks />
          <span className="sm:pr-12">
            © {new Date().getFullYear()} Crimson Academy of Kagina. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};
