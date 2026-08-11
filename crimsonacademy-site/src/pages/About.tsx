import { Link } from "react-router-dom";
import { MapPin, Mail, Globe, Clock } from "lucide-react";
import { PosterHero } from "@/components/PosterHero";
import { findSection } from "@/nav";
import { cn } from "@/lib/utils";
import { CoreValues } from "@/components/CoreValues";
import { StaffDirectory } from "@/components/StaffDirectory";
import { HistoryPanel } from "@/components/HistoryPanel";
import aboutHero from "@/assets/about-hero-team.jpg";
import signBoy from "@/assets/crimson-sign-boy.webp";
import pottersHands from "@/assets/faith-potters-hands.jpg";
import contactPhoto from "@/assets/contact-students.jpg";

/**
 * /about — the "Dossier" content structure from content/about-mockups/ (three
 * directions compared, C chosen), carried on the Academics page's furniture.
 *
 * The mockup put the section nav in a sticky left rail. That was replaced with
 * PosterHero's crimson slab so the two big interior pages share one navigation
 * idiom rather than each inventing its own — a visitor moving between About and
 * Academics shouldn't have to relearn where the sub-nav lives. The dossier's
 * actual content survives the swap: the fact strip, the history milestone rail,
 * and the reworked leadership block.
 *
 * Following Academics' pattern, the poster h1 is the page name and the
 * positioning line ("A school built on faith...") opens the body instead.
 */

/** One section of the document, with the id the sub-nav links to. */
const Article = ({
  id,
  eyebrow,
  title,
  children,
  className,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  // scroll-mt clears the 4rem navbar plus the sticky sub-nav slab beneath it.
  <section id={id} className={cn("scroll-mt-36 border-b py-14", className)}>
    <div className="text-xs font-semibold uppercase tracking-wider text-eyebrow">{eyebrow}</div>
    <h2 className="mt-2 max-w-[24ch] font-heading text-2xl font-semibold leading-tight md:text-3xl">
      {title}
    </h2>
    {children}
  </section>
);

const facts = [
  { n: "780", k: "Students" },
  { n: "32", k: "Staff" },
  { n: "2011", k: "Founded" },
  { n: "#1", k: "Southern Province" },
];

const About = () => {
  const section = findSection("/about")!;

  return (
    <>
      <PosterHero
        section={section}
        title="About us"
        lede="Crimson Academy of Kagina is a Christian primary school in Kamonyi District, Rwanda, serving 780 students from nursery through Primary 6."
        image={aboutHero}
        // Tuned to this photo: the crop shows a band of its height here and the
        // group's faces sit well below the top edge. See the worked example in
        // PageHero.tsx's imagePosition doc comment.
        imagePosition="50% 29%"
      />

      <div className="container">
        {/* max-w keeps a readable measure; the leadership grid and staff
            directory below are the widest things on the page and still fit. */}
        <div className="mx-auto max-w-5xl pb-20 pt-14">
          {/* ---------- opening statement + facts ---------- */}
          <div className="border-b pb-12">
            <h2 className="max-w-[20ch] font-heading text-3xl font-semibold leading-tight text-primary sm:text-4xl">
              A school built on faith, character, and academic excellence.
            </h2>
            <p className="mt-5 max-w-prose leading-relaxed text-muted-foreground">
              Founded in 2011 with four classrooms and 181 students, on land a village agreed to
              sell only after being asked. Today it is a full campus that has placed at or near the
              top of the Southern Province on the National Examination in nearly every year since
              2013.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-6 border-t pt-6 sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.k}>
                  <dt className="sr-only">{f.k}</dt>
                  <dd>
                    <span className="block font-heading text-3xl font-bold leading-none text-primary">
                      {f.n}
                    </span>
                    <span className="mt-2 block text-xs uppercase tracking-wide text-muted-foreground">
                      {f.k}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ---------- mission & values ---------- */}
          <Article
            id="mission"
            eyebrow="Our Mission"
            title="Emboldening children to reach beyond impossibilities."
          >
            <div className="mt-6 grid gap-8 sm:grid-cols-[1fr_14rem] sm:items-start">
              <div className="space-y-4 leading-relaxed text-muted-foreground">
                <p>
                  Children carry the hopes of the future. Providing access and opportunity to
                  educate children around the world is our aim and purpose. Crimson Academy will
                  embolden children and communities to reach beyond impossibilities and transform
                  the future for the better.
                </p>
                <p>
                  We are committed to facilitating learning experiences that help our students
                  achieve their greatest potential and adapt to a diverse, ever-changing society. We
                  aspire to give children a sense of understanding and compassion for others, and
                  the courage to act on their beliefs.
                </p>
                <p className="font-medium text-foreground">
                  We stress the total development of each child: spiritual, moral, intellectual,
                  social, emotional, and physical.
                </p>
              </div>
              <img
                src={signBoy}
                alt="A Crimson Academy student joyfully holding a carved wooden school crest above his head"
                className="mx-auto w-44 drop-shadow-xl sm:w-full"
                loading="lazy"
              />
            </div>

            <div className="mt-12 border-t pt-10">
              <div className="text-xs font-semibold uppercase tracking-wider text-eyebrow">
                Core Values
              </div>
              <h3 className="mt-2 font-heading text-xl font-semibold md:text-2xl">
                Six values, and how they fit together.
              </h3>
              <div className="mt-8">
                <CoreValues />
              </div>
            </div>
          </Article>

          {/* ---------- faith ---------- */}
          <Article
            id="faith"
            eyebrow="Our Christian Faith"
            title="An environment that mirrors the character of Christ."
          >
            <div className="mt-6 grid gap-8 sm:grid-cols-[1fr_17rem] sm:items-start">
              <div className="space-y-4 leading-relaxed text-muted-foreground">
                <p>
                  Faith is not a subject taught in one period a week — it shapes how teachers speak
                  to children, how discipline is handled, and how the school serves the village
                  around it.
                </p>
                <p>
                  The six values above are drawn directly from scripture, and they are taught and
                  referred to explicitly rather than left implicit. Families of all backgrounds are
                  welcome at Crimson Academy, and our chapel and devotional life is described under{" "}
                  <Link
                    to="/student-life#chapel"
                    className="font-medium text-primary underline underline-offset-4"
                  >
                    Student Life
                  </Link>
                  .
                </p>
                <div className="rounded-lg border-l-4 border-accent bg-secondary/50 p-4 text-sm italic">
                  &ldquo;For even the Son of Man did not come to be served, but to serve, and to
                  give His life a ransom for many.&rdquo;
                  <span className="mt-1.5 block text-xs font-semibold uppercase not-italic tracking-wide text-eyebrow">
                    Mark 10:45
                  </span>
                </div>
              </div>
              <div>
                <img
                  src={pottersHands}
                  alt="A student's hands and a teacher's clay-covered hands shaping a clay pot together"
                  className="w-full rounded-lg object-cover shadow-sm"
                  loading="lazy"
                />
                <p className="mt-3 rounded-lg border-l-4 border-accent bg-secondary/50 p-3 text-xs italic text-muted-foreground">
                  &ldquo;Like clay in the potter&rsquo;s hand, so are you in My hand.&rdquo;
                  <span className="mt-1 block text-[0.65rem] font-semibold uppercase not-italic tracking-wide text-eyebrow">
                    Jeremiah 18:6
                  </span>
                </p>
              </div>
            </div>
          </Article>

          {/* ---------- history ---------- */}
          <Article id="history" eyebrow="Our History" title="From one visit to a full campus.">
            <p className="mt-5 max-w-prose leading-relaxed text-muted-foreground">
              Crimson Academy did not start with a building. It started with a visit, and with
              parents in a Rwandan village asking for something their children could not otherwise
              get.
            </p>
            <HistoryPanel />
          </Article>

          {/* ---------- leadership & staff ---------- */}
          <Article
            id="leadership"
            eyebrow="Leadership &amp; Staff"
            title="A team devoted to every child."
          >
            <div className="mt-6">
              <StaffDirectory />
            </div>
          </Article>

          {/* ---------- contact ---------- */}
          <Article
            id="contact"
            eyebrow="Contact &amp; Visit"
            title="Come and see the school for yourself."
            className="border-b-0"
          >
            <div className="mt-6 grid overflow-hidden rounded-xl sm:grid-cols-2">
              <div className="relative min-h-[15rem]">
                <img
                  src={contactPhoto}
                  alt="Students in Crimson Academy shirts on the school grounds"
                  className="absolute inset-0 h-full w-full object-cover"
                  // Biased toward the crest on their shirts — see the worked
                  // example in PageHero.tsx's imagePosition doc comment.
                  style={{ objectPosition: "50% 66%" }}
                  loading="lazy"
                />
              </div>
              <div className="bg-primary p-6 text-primary-foreground sm:p-7">
                <div className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Arrange a visit
                </div>
                <h3 className="mt-1.5 font-heading text-xl font-semibold">
                  We&rsquo;d love to show you around.
                </h3>
                <ul className="mt-5 space-y-3.5 text-sm">
                  <li className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <div>
                      <div className="font-medium">Campus</div>
                      <div className="text-primary-foreground/80">
                        Kagina, Kamonyi District, Southern Province, Rwanda
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <div>
                      <div className="font-medium">Email</div>
                      <a
                        href="mailto:info@crimsonacademy.org"
                        className="text-accent underline underline-offset-4"
                      >
                        info@crimsonacademy.org
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Globe className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <div>
                      <div className="font-medium">Languages</div>
                      <div className="text-primary-foreground/80">
                        English · Français · Kinyarwanda
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <div>
                      <div className="font-medium">Term dates</div>
                      <Link to="/news#calendar" className="text-accent underline underline-offset-4">
                        Calendar &amp; Term Dates
                      </Link>
                    </div>
                  </li>
                </ul>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  <Link
                    to="/admissions#enroll"
                    className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
                  >
                    How to Enroll
                  </Link>
                  <Link
                    to="/admissions#visit"
                    className="rounded-md border border-primary-foreground/40 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-primary-foreground/10"
                  >
                    Plan a Visit
                  </Link>
                </div>
              </div>
            </div>
          </Article>
        </div>
      </div>
    </>
  );
};

export default About;
