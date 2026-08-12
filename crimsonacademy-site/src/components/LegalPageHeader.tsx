import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

/**
 * A minimal crimson banner for the three footer utility pages (Privacy
 * Policy, Non-Discrimination Policy, Site Map). Deliberately not PageHero or
 * PosterHero — both require a NavSection with `children` to render a sub-nav,
 * and these pages aren't part of nav.ts `sections` (they're footer-only
 * links, single-topic, one screen long). Reused identically three times
 * rather than copy-pasted, since unlike the rest of the site's page-local
 * headers, this one really doesn't vary.
 */
export const LegalPageHeader = ({ title, lede }: { title: string; lede?: string }) => (
  <div className="border-b bg-primary text-primary-foreground">
    <div className="container py-14 md:py-16">
      <nav aria-label="Breadcrumb" className="text-xs font-semibold uppercase tracking-wider opacity-80">
        <ol className="flex items-center gap-2">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <ChevronRight className="h-3 w-3 opacity-60" aria-hidden="true" />
          <li aria-current="page">{title}</li>
        </ol>
      </nav>
      <h1 className="mt-4 font-heading text-3xl font-semibold md:text-4xl">{title}</h1>
      {lede && (
        <p className="mt-3 max-w-2xl text-primary-foreground/85 md:text-lg">{lede}</p>
      )}
    </div>
  </div>
);
