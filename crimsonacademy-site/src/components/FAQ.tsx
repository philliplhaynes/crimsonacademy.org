import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface QA { q: string; a: string; }

const faqs: QA[] = [
  { q: "Where is Crimson Academy located?", a: "We are in Kagina, Kamonyi District, in Rwanda's Southern Province. Contact us to arrange a visit or campus tour." },
  { q: "What grades do you offer?", a: "Nursery through Primary 6 (P6), following Rwanda's National Competence-Based Curriculum set by MINEDUC." },
  { q: "What languages are used for instruction?", a: "Students receive daily instruction in English, French, and Kinyarwanda. English is the primary language of instruction." },
  { q: "How do I apply for admission?", a: "Enrollment is offered each academic year. Use the Apply button to send us your details and our team will guide you through the next steps." },
  { q: "Are scholarships or sponsorships available?", a: "Yes. In partnership with the Crimson Foundation, sponsorships support tuition, meals, and materials — and top graduates receive scholarships to leading secondary boarding schools." },
];

export const FAQ = () => {
  // Tinted — closes out the homepage on the same alternating rhythm every
  // inner page uses. Previously this and Team before it were both plain,
  // the second back-to-back untinted run on the page.
  return (
    <section className="bg-secondary/40 py-20 sm:py-28">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold uppercase tracking-wider text-eyebrow">Admissions</span>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mt-2">Frequently asked questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-medium">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="text-center text-muted-foreground mt-10">
            Still have a question?{" "}
            <Link to="/about#contact" className="text-primary font-medium underline underline-offset-4">Contact us</Link>
            {" "}or see{" "}
            <Link to="/admissions" className="text-primary font-medium underline underline-offset-4">full admissions details</Link>.
          </p>
        </div>
      </div>
    </section>
  );
};
