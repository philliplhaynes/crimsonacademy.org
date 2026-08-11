import { Card, CardContent } from "./ui/card";

const facts = [
  { n: "34", label: "dedicated staff" },
  { n: "22", label: "teachers & assistants" },
  { n: "2011", label: "founded" },
  { n: "780", label: "students, nursery–P6" },
];

export const Team = () => {
  return (
    <section className="container py-20 sm:py-28">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <Card className="bg-secondary/40 border-none">
          <CardContent className="p-8 md:p-10 flex items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="font-heading text-2xl font-bold text-primary">MC</span>
            </div>
            <div>
              <div className="text-sm uppercase tracking-wider text-eyebrow">Principal</div>
              <div className="font-heading text-2xl font-semibold">Marie Claire Mukabirinda</div>
              <p className="text-muted-foreground text-sm mt-2">
                Leading Crimson Academy&apos;s mission of faith, character, and academic
                excellence in the Kamonyi District.
              </p>
            </div>
          </CardContent>
        </Card>
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-eyebrow">Our People</span>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mt-2 mb-6">
            A team devoted to every child
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {facts.map((f) => (
              <div key={f.label} className="rounded-lg border bg-background p-5">
                <div className="font-heading text-2xl font-bold text-primary">{f.n}</div>
                <div className="text-sm text-muted-foreground">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
