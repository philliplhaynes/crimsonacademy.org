import logoVert from "@/assets/logo-vert.webp";
import { Link } from "react-router-dom";
import { MapPin, Mail, Globe, ArrowUpRight } from "lucide-react";
import { sections } from "@/nav";

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

      <div className="container py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_3fr]">
          <div className="space-y-4">
            {/*
              The lockup only exists in dark maroon, so it needs a light
              plate to read against crimson — flagged in the mockup as an
              open question. A cream/light colour variant of the mark would
              let this sit directly on the crimson like the sitemap text
              does; this plate is the fallback until that exists.
            */}
            <Link to="/" className="inline-flex rounded-xl bg-primary-foreground/95 p-3.5">
              <img src={logoVert} alt="Crimson Academy" className="h-24 w-auto object-contain" />
            </Link>
            <p className="text-sm text-primary-foreground/80">
              Faith, character, and academic excellence in Kagina, Rwanda. Nursery through Primary 6.
            </p>
            <ul className="space-y-2 pt-2 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                Kagina, Kamonyi District, Southern Province, Rwanda
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <a href="mailto:info@crimsonacademy.org" className="text-accent transition-colors hover:text-primary-foreground">
                  info@crimsonacademy.org
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="h-4 w-4 shrink-0 text-accent" />
                English · Français · Kinyarwanda
              </li>
            </ul>
          </div>

          <div>
            {/*
              Section headings stay primary-foreground (white/cream), not
              accent — keeps one visual tier above the links they head,
              same hierarchy the previous cream footer already had between
              headings and muted-foreground links.
            */}
            <nav aria-label="Site map" className="grid gap-8 sm:grid-cols-3">
              {sections.map((section) => (
                <div key={section.href}>
                  <h4 className="font-heading text-sm font-semibold">
                    <Link to={section.href} className="transition-colors hover:text-accent">
                      {section.label}
                    </Link>
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm text-accent">
                    {section.children.map((child) => (
                      <li key={child.href}>
                        <Link to={child.href} className="transition-colors hover:text-primary-foreground">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            <div className="mt-8 border-t border-primary-foreground/15 pt-6">
              <h4 className="font-heading text-sm font-semibold">Quick links</h4>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-accent">
                {quickLinks.map((q) => (
                  <li key={q.href}>
                    <Link to={q.href} className="transition-colors hover:text-primary-foreground">
                      {q.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-primary-foreground/15 pt-6">
              <h4 className="font-heading text-sm font-semibold">The Crimson family</h4>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-accent">
                {family.map((f) => (
                  <li key={f.href}>
                    <a
                      href={f.href}
                      className="inline-flex items-center gap-1 transition-colors hover:text-primary-foreground"
                      title={f.title}
                    >
                      {f.label}
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/*
        Slightly darker than the main crimson field — the same two-tone
        trick berkeleycarroll.org uses to give the copyright line its own
        quiet register. bg-foreground/10 (near-black ink at low opacity)
        rather than a hardcoded darker hex, so it darkens whatever --primary
        actually is instead of drifting out of sync if the brand crimson
        ever changes.
      */}
      <div className="border-t border-primary-foreground/15 bg-foreground/10">
        <div className="container flex flex-col justify-between gap-3 py-6 text-xs text-primary-foreground/70 sm:flex-row">
          <span>© {new Date().getFullYear()} Crimson Academy of Kagina. All rights reserved.</span>
          <span className="text-primary-foreground/60">
            In partnership with the Crimson Foundation
          </span>
        </div>
      </div>
    </footer>
  );
};
