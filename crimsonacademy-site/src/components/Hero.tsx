import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import heroPhoto from "@/assets/home-hero-dancing.jpg";

export const Hero = () => {
  return (
    <section className="relative border-b">
      <img
        src={heroPhoto}
        alt="Crimson Academy students dancing and clapping together in the schoolyard"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/30"
        aria-hidden="true"
      />

      <div className="container relative py-20 md:py-28 lg:py-32">
        <div className="max-w-2xl space-y-6 text-primary-foreground">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wide backdrop-blur">
            <MapPin className="h-3.5 w-3.5" /> Kagina · Kamonyi District, Rwanda
          </div>

          <h1 className="font-heading text-4xl font-semibold leading-[1.05] md:text-6xl">
            Where faith and academic excellence grow together.
          </h1>

          <p className="text-lg leading-relaxed text-primary-foreground/90">
            Crimson Academy of Kagina is a Christian primary school educating 780 children — and,
            year after year, the #1 school in Rwanda&apos;s Southern Province on the National Exams.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/admissions#enroll" className={buttonVariants({ variant: "secondary" })}>
              Enroll your child <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              to="/crimson-for-life#sponsor"
              className="inline-flex items-center justify-center rounded-md border border-primary-foreground/40 px-6 py-2 text-sm font-medium transition-colors hover:bg-primary-foreground/10"
            >
              Sponsor a student
            </Link>
          </div>

          <p className="text-sm text-primary-foreground/80">
            Taught in <span className="font-medium text-primary-foreground">English, French &amp; Kinyarwanda</span> ·
            Nursery through Primary 6
          </p>
        </div>
      </div>
    </section>
  );
};
