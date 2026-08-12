import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import { PageHero, Section } from "@/components/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { findSection } from "@/nav";
/* Shared with the News & Events band on /admissions — see src/data/news.ts.
   One copy, so the two pages can never disagree about a term date. */
import { stories, terms } from "@/data/news";

const News = () => {
  const section = findSection("/news")!;
  return (
    <>
      <PageHero
        section={section}
        title="News & events."
        lede="What is happening at Crimson Academy, and the dates that matter for the school year."
        photoBrief="A recent school event — assembly, sports day, or a prize-giving"
      />

      <Section id="news" eyebrow="School News" title="Recent from campus">
        <div className="grid gap-6 md:grid-cols-3">
          {stories.map((s) => (
            <Card key={s.title} className="flex h-full flex-col overflow-hidden">
              {s.image ? (
                <img src={s.image} alt={s.alt} className="h-44 w-full object-cover" loading="lazy" />
              ) : (
                <div className="flex h-44 w-full items-center justify-center bg-primary/10">
                  <span className="font-heading text-4xl font-bold text-primary/40">CA</span>
                </div>
              )}
              <CardContent className="flex flex-1 flex-col p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-eyebrow">
                  {s.eyebrow}
                </span>
                <h3 className="mt-2 font-heading text-lg font-semibold leading-snug">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm text-muted-foreground">
          Full results and programme details are published each year in our{" "}
          <Link to="/crimson-for-life#annual-report" className="font-medium text-primary underline underline-offset-4">
            Annual School Report
          </Link>
          .
        </p>
      </Section>

      <Section id="calendar" eyebrow="Calendar & Term Dates" title="The school year at a glance" tinted>
        <p className="max-w-3xl text-muted-foreground leading-relaxed">
          Crimson Academy follows the MINEDUC academic calendar, running in three terms from
          September through July. Students are assessed three times per term, with examinations at
          the end of each term.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {terms.map((t) => (
            <Card key={t.term} className="border-none bg-background">
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-eyebrow">
                    {t.term}
                  </span>
                </div>
                <div className="mt-2 font-heading text-lg font-semibold">{t.dates}</div>
                <p className="mt-2 text-sm text-muted-foreground">{t.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 rounded-lg border border-dashed bg-background p-5 text-sm text-muted-foreground">
          Dates shown follow the 2024–2025 school calendar. Contact the school office to confirm
          exact dates for the current academic year before making travel or holiday plans.
        </div>
      </Section>
    </>
  );
};

export default News;
