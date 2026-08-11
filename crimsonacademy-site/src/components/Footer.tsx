import logo from "@/assets/crimson-tree.png";
import { Link } from "react-router-dom";
import { MapPin, Mail, Globe, ArrowUpRight } from "lucide-react";
import { sections } from "@/nav";

const quickLinks = [
  { label: "Term Dates", href: "/news#calendar" },
  { label: "Fees", href: "/admissions#fees" },
  { label: "How to Enroll", href: "/admissions#enroll" },
  { label: "Exam Results", href: "/academics#results" },
  { label: "Leadership & Staff", href: "/about#leadership" },
  { label: "Sponsor a Student", href: "/support#sponsor" },
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
  {
    label: "Jenzabar Foundation",
    href: "https://jenzabar.com/jenzabar-foundation",
    title: "The Jenzabar Foundation",
  },
];

export const Footer = () => {
  return (
    <footer className="border-t bg-secondary/40">
      <div className="container py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_3fr]">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-heading text-lg font-bold">
              <img src={logo} alt="" className="h-9 w-9 object-contain" />
              Crimson Academy
            </Link>
            <p className="text-sm text-muted-foreground">
              Faith, character, and academic excellence in Kagina, Rwanda. Nursery through Primary 6.
            </p>
            <ul className="space-y-2 pt-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                Kagina, Kamonyi District, Southern Province, Rwanda
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:info@crimsonacademy.org" className="transition-colors hover:text-primary">
                  info@crimsonacademy.org
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="h-4 w-4 shrink-0" />
                English · Français · Kinyarwanda
              </li>
            </ul>
          </div>

          <div>
            <nav aria-label="Site map" className="grid gap-8 sm:grid-cols-3">
              {sections.map((section) => (
                <div key={section.href}>
                  <h4 className="font-heading text-sm font-semibold">
                    <Link to={section.href} className="transition-colors hover:text-primary">
                      {section.label}
                    </Link>
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {section.children.map((child) => (
                      <li key={child.href}>
                        <Link to={child.href} className="transition-colors hover:text-primary">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            <div className="mt-8 border-t pt-6">
              <h4 className="font-heading text-sm font-semibold">Quick links</h4>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                {quickLinks.map((q) => (
                  <li key={q.href}>
                    <Link to={q.href} className="transition-colors hover:text-primary">
                      {q.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t pt-6">
              <h4 className="font-heading text-sm font-semibold">The Crimson family</h4>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                {family.map((f) => (
                  <li key={f.href}>
                    <a
                      href={f.href}
                      className="inline-flex items-center gap-1 transition-colors hover:text-primary"
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

      <div className="border-t">
        <div className="container flex flex-col justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Crimson Academy of Kagina. All rights reserved.</span>
          <span className="text-muted-foreground/80">
            In partnership with the Crimson Foundation &amp; the Jenzabar Foundation
          </span>
        </div>
      </div>
    </footer>
  );
};
