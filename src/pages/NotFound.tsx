import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { sections } from "@/nav";

const NotFound = () => (
  <div className="container py-24 sm:py-32">
    <div className="max-w-2xl">
      <span className="text-sm font-semibold uppercase tracking-wider text-eyebrow">
        404
      </span>
      <h1 className="mt-2 font-heading text-3xl font-semibold md:text-4xl">
        We could not find that page.
      </h1>
      <p className="mt-4 text-muted-foreground">
        The page may have moved. Here is everything on the site:
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {sections.map((s) => (
          <Link
            key={s.href}
            to={s.href}
            className="rounded-lg border p-4 transition-colors hover:border-primary hover:bg-secondary/40"
          >
            <div className="font-heading font-semibold">{s.label}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.blurb}</div>
          </Link>
        ))}
      </div>
      <Link to="/" className={`mt-8 ${buttonVariants({ variant: "default" })}`}>
        Back to the homepage
      </Link>
    </div>
  </div>
);

export default NotFound;
