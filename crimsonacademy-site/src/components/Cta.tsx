import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";

export const Cta = () => {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container py-20 sm:py-24 text-center space-y-6">
        <h2 className="font-heading text-3xl md:text-4xl font-semibold max-w-2xl mx-auto">
          Plant a seed. Change a life.
        </h2>
        <p className="text-primary-foreground/85 max-w-2xl mx-auto text-lg">
          In partnership with the Crimson Foundation, your sponsorship gives a child
          in Kagina access to a world-class education, daily meals, and a future full
          of opportunity.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link to="/crimson-for-life#sponsor" className={buttonVariants({ variant: "secondary" })}>
            Sponsor a Student <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link to="/crimson-for-life#partners" className="inline-flex items-center justify-center rounded-md border border-primary-foreground/40 px-6 py-2 text-sm font-medium hover:bg-primary-foreground/10 transition-colors">
            Partner with Crimson Foundation
          </Link>
        </div>
      </div>
    </section>
  );
};
