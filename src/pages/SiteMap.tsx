import { Link } from "react-router-dom";
import { LegalPageHeader } from "@/components/LegalPageHeader";
import { sections } from "@/nav";

/**
 * /site-map — linked from the footer's bottom bar. Replaces the multi-column
 * sitemap that used to live in the footer itself (removed per request); this
 * is now the one place that full listing lives.
 *
 * Built from the same nav.ts `sections` as the navbar and the old footer
 * grid, so it can't drift out of sync with the real nav. Two entries are
 * added by hand below the generated list because they're real, reachable
 * pages that aren't part of the primary nav: the standalone chapter-by-
 * chapter history page (linked from inside /about, not from the top nav
 * since that now points at /about#history), and this trio of legal pages.
 */
const extraPages = [
  { label: "Our Full History", href: "/about/history" },
];

const legalPages = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Non-Discrimination Policy", href: "/non-discrimination-policy" },
  { label: "Site Map", href: "/site-map" },
];

const SiteMap = () => {
  return (
    <>
      <LegalPageHeader title="Site Map" lede="Every page on crimsonacademy.org, in one place." />

      <div className="container py-14">
        <div className="mx-auto max-w-4xl">
          <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
            <li>
              <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-eyebrow">
                <Link to="/" className="hover:text-primary">
                  Home
                </Link>
              </h2>
            </li>
            {sections.map((section) => (
              <li key={section.href}>
                <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-eyebrow">
                  <Link to={section.href} className="transition-colors hover:text-primary">
                    {section.label}
                  </Link>
                </h2>
                <ul className="mt-2.5 space-y-1.5">
                  {section.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        to={child.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            <li>
              <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-eyebrow">
                More
              </h2>
              <ul className="mt-2.5 space-y-1.5">
                {[...extraPages, ...legalPages].map((p) => (
                  <li key={p.href}>
                    <Link
                      to={p.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SiteMap;
