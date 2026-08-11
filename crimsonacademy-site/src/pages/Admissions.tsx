import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import { PageHero, Section } from "@/components/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { findSection } from "@/nav";
import { PhotoSlot } from "@/components/PhotoSlot";

const steps = [
  {
    n: 1,
    title: "Get in touch",
    text: "Email us with your child's name, age, and the grade you are applying for. We will tell you what places are available for the coming academic year.",
  },
  {
    n: 2,
    title: "Visit the school",
    text: "Come and see the campus, meet teachers, and see classrooms in session. We encourage every family to visit before enrolling.",
  },
  {
    n: 3,
    title: "Complete enrollment",
    text: "Bring your child's records and identification. Our staff will guide you through the district enrollment requirements.",
  },
  {
    n: 4,
    title: "Start the term",
    text: "The academic year begins in September and runs in three terms through July, following the MINEDUC calendar.",
  },
];

const faqs = [
  {
    q: "Where is Crimson Academy located?",
    a: "We are in Kagina, Kamonyi District, in Rwanda's Southern Province. Contact us to arrange a visit or a campus tour.",
  },
  {
    q: "What grades do you offer?",
    a: "Nursery (ages 3–6) through Primary 6, following Rwanda's National Competence-Based Curriculum set by MINEDUC.",
  },
  {
    q: "What languages are used for instruction?",
    a: "Students receive daily instruction in English, French, and Kinyarwanda. English is the main language of instruction, with French and Kinyarwanda used as additional languages.",
  },
  {
    q: "How large are the classes?",
    a: "Enrollment in 2024–2025 was 780 students across nursery and six primary grades, with 23 qualified teachers and 34 staff in total.",
  },
  {
    q: "Do you provide transport and meals?",
    a: "Yes. School buses serve students who live too far from Kagina to walk, and a food program supports nursery students through the school day.",
  },
  {
    q: "Are scholarships or sponsorships available?",
    a: "Yes. In partnership with the Crimson Foundation, sponsorships support tuition, meals, and materials. Top Primary 6 graduates also receive scholarships to leading secondary boarding schools — we currently sponsor 22 secondary students.",
  },
  {
    q: "Is the school only for Christian families?",
    a: "No. Crimson Academy is a Christian school and our values are rooted in scripture, but families of all backgrounds are welcome and enrolled.",
  },
];

const Admissions = () => {
  const section = findSection("/admissions")!;
  return (
    <>
      <PageHero
        section={section}
        title="Join Crimson Academy."
        lede="We enroll students into nursery through Primary 6 each academic year. Here is how the process works, and how to come and see the school for yourself."
        photoBrief="A parent and child at the school gate, or a family touring the campus"
      />

      <Section id="enroll" eyebrow="How to Enroll" title="Four steps to a place at Crimson">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <Card key={s.n} className="h-full">
              <CardContent className="space-y-3 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-primary-foreground">
                  {s.n}
                </div>
                <h3 className="font-heading font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="mailto:info@crimsonacademy.org" className={buttonVariants({ variant: "default" })}>
            <Mail className="mr-2 h-4 w-4" /> Email the admissions team
          </a>
          <Link to="/admissions#visit" className={buttonVariants({ variant: "outline" })}>
            Plan a visit
          </Link>
        </div>
      </Section>

      <Section id="fees" eyebrow="Fees" title="School fees and support" tinted>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Crimson Academy exists to serve marginalized school-aged children in Kamonyi District.
              Fees are set to keep the school accessible to families in Kagina, and sponsorship is
              available for families who need it.
            </p>
            <p>
              In partnership with the{" "}
              <Link to="/support#partners" className="font-medium text-primary underline underline-offset-4">
                Crimson Foundation
              </Link>
              , sponsorship can cover tuition, daily meals, and learning materials. If cost is the
              obstacle to enrolling your child, contact us — do not rule the school out before
              speaking with us.
            </p>
            <div className="rounded-lg border border-dashed bg-background p-5 text-sm">
              <strong className="text-foreground">Current fee schedule:</strong> please contact the
              school office for the fee schedule for the coming academic year, including any
              transport and meal costs.
            </div>
          </div>
          <Card className="border-none bg-background">
            <CardContent className="p-6">
              <h3 className="font-heading font-semibold">What sponsorship covers</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {[
                  "Tuition for the academic year",
                  "Daily meals for nursery students",
                  "Learning materials and books",
                  "Secondary school scholarships for top P6 graduates",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <Link
                to="/support#sponsor"
                className={`mt-5 w-full ${buttonVariants({ variant: "default" })}`}
              >
                About sponsorship
              </Link>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section id="visit" eyebrow="Visit Us" title="Come and see the school">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Prospective families are welcome to tour the campus, meet teachers, and see classrooms
              in session. Visits are the best way to understand what the school is like day to day.
            </p>
            <p>
              Our campus includes classrooms built between 2011 and 2016, a library, a computer lab,
              and teacher housing — built with the support of the Crimson Foundation and the Jenzabar
              Foundation.
            </p>
          </div>
          <PhotoSlot
            ratio="landscape"
            brief="Wide shot of the campus: the classroom block with the crest on the wall"
            size="1600px wide"
          />
        </div>
        <div className="mt-6 max-w-md">
          <Card className="bg-secondary/40 border-none">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <div className="font-medium text-foreground">Campus</div>
                  <div className="text-sm text-muted-foreground">
                    Kagina, Kamonyi District, Southern Province, Rwanda
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <div className="font-medium text-foreground">Arrange a visit</div>
                  <a
                    href="mailto:info@crimsonacademy.org"
                    className="text-sm text-primary underline underline-offset-4"
                  >
                    info@crimsonacademy.org
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section id="faq" eyebrow="Frequently Asked Questions" title="Questions families ask us" tinted>
        <div className="max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left font-medium">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="mt-8 text-muted-foreground">
            Still have a question?{" "}
            <Link to="/about#contact" className="font-medium text-primary underline underline-offset-4">
              Contact us
            </Link>
            .
          </p>
        </div>
      </Section>
    </>
  );
};

export default Admissions;
