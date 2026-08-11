import { Link } from "react-router-dom";
import { MapPin, Mail, Globe, Clock, ArrowRight } from "lucide-react";
import { PageHero, Section } from "@/components/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { findSection } from "@/nav";
import { CoreValues } from "@/components/CoreValues";
import { StaffDirectory } from "@/components/StaffDirectory";
import aboutHero from "@/assets/about-hero-team.jpg";
import signBoy from "@/assets/crimson-sign-boy.webp";
import pottersHands from "@/assets/faith-potters-hands.jpg";
import contactPhoto from "@/assets/contact-students.jpg";

const About = () => {
  const section = findSection("/about")!;
  return (
    <>
      <PageHero
        section={section}
        title="A school built on faith, character, and academic excellence."
        lede="Crimson Academy of Kagina is a Christian primary school in Kamonyi District, Rwanda, serving 780 students from nursery through Primary 6."
        image={aboutHero}
        imageAlt=""
        // Tuned to this specific photo: the crop window only shows ~29% of
        // the image's height at this band size, and the group's faces sit
        // well below the top edge (there's a stretch of bare wall above their
        // heads). If this photo is ever swapped, re-derive this — see the
        // worked example in PageHero.tsx's imagePosition doc comment.
        imagePosition="50% 29%"
      />

      <Section id="mission" eyebrow="Our Mission" title="Emboldening children to reach beyond impossibilities.">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Children carry the hopes of the future. Providing access and opportunity to educate
              children around the world is our aim and purpose. Crimson Academy will embolden
              children and communities to reach beyond impossibilities and transform the future for
              the better.
            </p>
            <p>
              We are committed to facilitating learning experiences that help our students achieve
              their greatest potential and adapt to a diverse, ever-changing society. We aspire to
              give children a sense of understanding and compassion for others, and the courage to
              act on their beliefs.
            </p>
            <p className="font-medium text-foreground">
              We stress the total development of each child: spiritual, moral, intellectual, social,
              emotional, and physical.
            </p>
          </div>
          <div className="relative flex items-center justify-center">
            <div
              className="absolute inset-0 -z-10 rounded-full bg-primary/10 blur-3xl"
              aria-hidden="true"
            />
            <img
              src={signBoy}
              alt="A Crimson Academy student joyfully holding a carved wooden school crest above his head"
              className="w-56 drop-shadow-xl sm:w-64 lg:w-72"
              loading="lazy"
            />
          </div>
        </div>

        <div className="mt-14 border-t pt-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-eyebrow">
            Core Values
          </div>
          <h3 className="mt-2 font-heading text-2xl font-semibold md:text-3xl">
            Six values, and how they fit together.
          </h3>
          {/*
            Deliberately no intro paragraph here — CoreValues carries its own
            caption ("Truth, Discipline and Service are practised...") and a
            second explanation above it just restated the same sentence.
          */}
          <div className="mt-10">
            <CoreValues />
          </div>
        </div>
      </Section>

      <Section id="faith" eyebrow="Our Christian Faith" title="An environment that mirrors the character of Christ." tinted>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Faith is not a subject taught in one period a week — it shapes how teachers speak to
              children, how discipline is handled, and how the school serves the village around it.
            </p>
            <p>
              The six values described under{" "}
              <Link to="/about#mission" className="font-medium text-primary underline underline-offset-4">
                Mission &amp; Values
              </Link>{" "}
              are drawn directly from scripture, and they are taught and referred to explicitly
              rather than left implicit.
            </p>
            <div className="rounded-lg border-l-4 border-accent bg-background p-5 italic">
              &ldquo;For even the Son of Man did not come to be served, but to serve, and to give
              His life a ransom for many.&rdquo; — Mark 10:45
            </div>
          </div>

          <div>
            <img
              src={pottersHands}
              alt="A student's hands and a teacher's clay-covered hands shaping a clay pot together"
              className="w-full rounded-lg object-cover shadow-sm"
              loading="lazy"
            />
            <p className="mt-4 border-l-4 border-accent bg-background p-4 text-sm italic text-muted-foreground">
              &ldquo;Like clay in the potter&rsquo;s hand, so are you in My hand.&rdquo;
              <span className="mt-1 block not-italic text-xs font-medium uppercase tracking-wide text-eyebrow">
                Jeremiah 18:6
              </span>
            </p>
          </div>
        </div>

        <div className="mt-10 max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Families of all backgrounds are welcome at Crimson Academy. Our chapel and devotional
            life is described under{" "}
            <Link to="/student-life#chapel" className="font-medium text-primary underline underline-offset-4">
              Student Life
            </Link>
            .
          </p>
        </div>
      </Section>

      {/*
        A teaser, not the full history — the eight-chapter timeline moved to
        its own route (/about/history) because it alone is ~1.7MB of photos,
        and someone here for Leadership or Contact shouldn't have to load it.
        Deliberately no photo in this teaser; the point is to keep this
        section (and this page) light.
      */}
      <Section id="history" eyebrow="Our History" title="From one visit to a full campus.">
        <p className="max-w-3xl text-muted-foreground leading-relaxed">
          Crimson Academy did not start with a building. It started with a visit, and with
          parents in a Rwandan village asking for something their children could not otherwise
          get. See how a hillside in Kagina became a campus — eight chapters, from 2009 to today.
        </p>
        <Link
          to="/about/history"
          className="mt-6 inline-flex items-center gap-2 font-medium text-primary underline underline-offset-4"
        >
          Read our history
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Section>

      <Section
        id="leadership"
        eyebrow="Leadership & Staff"
        title="A team devoted to every child."
        tinted
      >
        <StaffDirectory />
      </Section>

      {/*
        Full-bleed photo + crimson overlay, matching PageHero's treatment —
        this closes the page the way it opened. Not built with the shared
        <Section> wrapper because that constrains its background to the
        container; SchoolHistory's full-bleed bands use the same escape hatch.
        The "Arrange a visit" card is opaque (not the usual translucent
        bg-secondary/40) so it stays legible sitting directly on the photo.
      */}
      <section id="contact" className="relative scroll-mt-32 border-t">
        <img
          src={contactPhoto}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          // Tuned to this photo: the crop window (~51% of scaled height) is
          // shorter than the span from the kids' faces down through the
          // crest on their shirts, so both can't fit. Biased toward the
          // crest per the owner's request — see the worked example in
          // PageHero.tsx's imagePosition doc comment if this photo changes.
          style={{ objectPosition: "50% 66%" }}
        />
        <div className="absolute inset-0 bg-primary/75" aria-hidden="true" />

        <div className="container relative py-16 sm:py-20">
          {/*
            text-accent (bright gold), not the usual text-eyebrow, on purpose:
            --eyebrow is tuned for contrast against the cream page background,
            not this section's crimson-photo overlay, where it would go
            dark-on-dark. Same reasoning as SchoolHistory's crimson bands.
          */}
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">
            Contact &amp; Visit
          </span>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-primary-foreground md:text-3xl">
            Come and see the school for yourself.
          </h2>

          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <div className="font-medium text-primary-foreground">Campus</div>
                  <div className="text-primary-foreground/80">
                    Kagina, Kamonyi District, Southern Province, Rwanda
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <div className="font-medium text-primary-foreground">Email</div>
                  <div className="text-primary-foreground/80">info@crimsonacademy.org</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Globe className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <div className="font-medium text-primary-foreground">Languages</div>
                  <div className="text-primary-foreground/80">English · Français · Kinyarwanda</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <div className="font-medium text-primary-foreground">Term dates</div>
                  <div className="text-primary-foreground/80">
                    See{" "}
                    <Link to="/news#calendar" className="font-medium text-accent underline underline-offset-4">
                      Calendar &amp; Term Dates
                    </Link>
                  </div>
                </div>
              </li>
            </ul>

            <Card className="border-none bg-background shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-heading text-lg font-semibold">Arrange a visit</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Prospective families are welcome to tour the campus, meet teachers, and see
                  classrooms in session. Email us to arrange a time.
                </p>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <Link to="/admissions#enroll" className={buttonVariants({ variant: "default" })}>
                    How to Enroll
                  </Link>
                  <Link to="/admissions#visit" className={buttonVariants({ variant: "outline" })}>
                    Plan a Visit
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
