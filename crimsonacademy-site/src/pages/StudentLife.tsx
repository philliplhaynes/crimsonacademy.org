import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PosterHero, Band } from "@/components/PosterHero";
import { ActivityTile, type ActivityTileProps } from "@/components/ActivityTile";
import { findSection } from "@/nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import heroPhoto from "@/assets/sl-hero-team.webp";
import dancePhoto from "@/assets/sl-dance.webp";
import musicPhoto from "@/assets/sl-music.webp";
import karatePhoto from "@/assets/sl-karate.webp";
import basketballPhoto from "@/assets/sl-basketball.webp";
import footballPhoto from "@/assets/sl-football.webp";
import debatePhoto from "@/assets/sl-debate.webp";
import chessPhoto from "@/assets/sl-chess.webp";
import coachingPhoto from "@/assets/sl-coaching.webp";
import tournamentPhoto from "@/assets/sl-tournament.webp";
import servicePhoto from "@/assets/family-outreach-visit.jpg";
import mealsPhoto from "@/assets/history-2019-food-programme.webp";

/*
 ═══════════════════════════════════════════════════════════════════════════
 DETAIL THE SCHOOL STILL HAS TO SUPPLY

 Anything below tagged with a leading "?" in a tile's `meta` renders as a
 dashed "to confirm" chip. Those gaps are deliberate — a parent who turns up
 on the wrong afternoon does not come back, so an invented timetable is the
 one error worth leaving visible. Outstanding:

   1. Which day and time each activity meets.
   2. Current numbers taking part in each activity. (The 2024–2025 report
      counts choir, karate, soccer and acrobatics — a different list from what
      the school now offers, so those figures no longer describe the
      programme and are deliberately not reused here.)
   3. The lead teacher for basketball, debate and chess. The four names that
      do appear — Eugene, Robert, Elizabeth, Frederic — are all from
      StaffDirectory.tsx.
   4. A photograph of the chess club. `sl-chess.webp` is a STAND-IN: it shows
      igisoro, the Rwandan mancala, played on a mat at Kagina — not chess. The
      narrative names that tradition rather than passing the picture off as a
      chess match, but it should be swapped when a real photo exists.
 ═══════════════════════════════════════════════════════════════════════════
*/

const onTheStage: ActivityTileProps[] = [
  {
    name: "Dance",
    hook: "Traditional Rwandan dance, rehearsed after lessons",
    image: dancePhoto,
    imageAlt: "Crimson Academy children clapping and dancing in the school yard",
    meta: ["Primary 2 – Primary 6", "?Days to confirm"],
    body: [
      "Rwandan dance is not something our children learn for visitors. It is how an assembly starts and how every graduation ends. In nursery it begins as clapping games and song — movement is one of the six pre-primary learning areas, not an extra.",
      "From Primary 2 the dance group takes it further: traditional forms rehearsed after lessons and performed at assemblies, at the nursery graduation in caps and gowns, and for partners visiting the school. It is the activity with the largest audience and the lowest barrier to entry — no kit, no fee, no trials.",
    ],
  },
  {
    name: "Music",
    hook: "Choir, and singing that runs through the week",
    image: musicPhoto,
    imageAlt: "Crimson Academy pupils singing and clapping together",
    meta: ["Primary 2 – Primary 6", "Chorus: Elizabeth", "Music: Frederic"],
    body: [
      "Our choir is the most-subscribed activity in the school. It leads worship at morning devotions, sings at assemblies, and carries both graduation ceremonies — the nursery's, and Primary 6's on their way to secondary school.",
      "Elizabeth, who teaches Primary 4, leads the chorus; Frederic, who teaches Primary 2 and pastors the school, leads music. Because both are class teachers rather than visiting specialists, singing turns up through the week instead of sitting in one slot on a Friday afternoon.",
    ],
  },
];

const onTheCourt: ActivityTileProps[] = [
  {
    name: "Karate",
    hook: "Belts, gradings, and a visible ladder",
    image: karatePhoto,
    imageAlt: "Four Crimson Academy pupils in karate gi with yellow belts",
    meta: ["Primary 2 – Primary 6", "Instructor: Eugene"],
    body: [
      "Karate is the most evenly balanced activity at Crimson between girls and boys, and the only one with a ladder a child can see. Belts are graded; a seven-year-old can point at exactly what she is working towards and roughly how long it will take.",
      "Eugene, our karate instructor, is on staff rather than visiting, which is why the group trains through the year on the hard court instead of in bursts around a visitor's calendar. Discipline is one of our six core values, and this is the place it is least abstract.",
    ],
  },
  {
    name: "Basketball",
    hook: "The newest sport on campus",
    image: basketballPhoto,
    imageAlt: "Crimson Academy pupils in team kit on the school basketball court",
    meta: ["Primary 4 – Primary 6", "?Coach to confirm"],
    body: [
      "Basketball exists at Crimson because there is finally a court to play it on. It is the newest thing on campus and the only sport here that almost nobody arrived already knowing — which turns out to be the point.",
      "Sides are picked by class first, and the strongest players go on to represent the school. For children who had only ever played football, learning a sport from zero in front of your friends is the harder and more useful lesson.",
    ],
  },
  {
    name: "Football & Futsal",
    hook: "Inter-class first, district fixtures next, and the hard court when it rains",
    image: footballPhoto,
    imageAlt: "A Crimson Academy goalkeeper spread across the goalmouth on the school pitch",
    meta: ["Primary 3 – Primary 6", "Coach: Robert", "?Fixture list to confirm"],
    span: "full",
    body: [
      "Football is the sport every child already plays, so our job is not to teach it but to organise it: inter-class matches first, then a school side for district fixtures. Robert, who teaches Primary 3, coaches.",
      "When the rains make the pitch unplayable the game moves onto the hard court as futsal — smaller sides, a heavier ball, faster touches, and nowhere to hide. Several of our strongest players came up through those wet-season sessions rather than through the eleven-a-side game.",
    ],
  },
];

const atTheTable: ActivityTileProps[] = [
  {
    name: "Debate Team",
    hook: "Where English stops being a subject",
    image: debatePhoto,
    imageAlt: "A Crimson Academy pupil speaking into a microphone in front of the school",
    meta: ["Primary 4 – Primary 6", "?Lead teacher to confirm"],
    body: [
      "From Primary 4 the language of instruction becomes English. Debate is where that change stops being a timetable line and starts being a voice. Students take a motion, prepare both sides of it, and argue in front of the school.",
      "It is the fastest route we know from a child who can read English to a child who can think in it. It also teaches the thing a national exam never tests: how to lose an argument well, and how to be persuaded by a better one.",
    ],
  },
  {
    name: "Chess Club",
    hook: "For the children who go quiet in a crowd",
    image: chessPhoto,
    imageAlt: "Children and adults gathered around a strategy board game played on a mat outdoors",
    meta: ["Primary 3 – Primary 6", "?Photo & lead to confirm"],
    body: [
      "Chess rewards nothing that football rewards. Not speed, not volume, not height. Only sitting with a hard problem for longer than it is comfortable to sit with it — which is exactly the muscle a national exam asks for and almost nothing else in a child's week trains.",
      "It also sits in a long local tradition. Strategy games are played on mats all over Kagina, and a child who has spent evenings on a board of seeds already understands trading a piece now for a position later.",
    ],
  },
  {
    name: "After-School Coaching",
    hook: "Revisions and Lesson Reviews — the least glamorous thing on this page, and the one that changes the most",
    image: coachingPhoto,
    imageAlt: "A teacher at the blackboard with young pupils raising their hands",
    meta: ["All grades · aimed at Primary 1 – Primary 3", "Own class teacher", "?Session times to confirm"],
    span: "full",
    body: [
      "Every child at Crimson is assessed three times a term. That rhythm is useful for exactly one reason: it tells us in October which children will struggle in June, while there is still time to do something about it.",
      <>
        <strong className="font-semibold text-foreground">Revisions</strong> are small-group sessions
        before each test — going over what is about to be examined, with the children who need it most
        in a group small enough to ask a question in.{" "}
        <strong className="font-semibold text-foreground">Lesson Reviews</strong> go back over a lesson
        a child did not get the first time, with their own class teacher, in Kinyarwanda if that is what
        it takes.
      </>,
      "It is aimed squarely at Primary 1 to Primary 3, where our repetition rate is highest and where catching a child early is still cheap. We are putting it on the same page as karate and choir, at the same size, on purpose.",
    ],
  },
];

const provisions = [
  <>
    A daily <strong className="font-semibold text-primary-foreground">food programme</strong> through
    the nursery day, cooked on site by three staff cooks
  </>,
  <>
    <strong className="font-semibold text-primary-foreground">School transport</strong> for children
    who live too far from Kagina to walk — which is also what makes staying late possible
  </>,
  <>
    Access to{" "}
    <strong className="font-semibold text-primary-foreground">medical and socio-emotional care</strong>{" "}
    for students and for their families
  </>,
  <>
    <strong className="font-semibold text-primary-foreground">Micro-loan and livestock programmes</strong>{" "}
    for households in the village around the school
  </>,
];

// ── local presentational pieces ────────────────────────────────────────────

const Eyebrow = ({ children, dark }: { children: React.ReactNode; dark?: boolean }) => (
  <span
    className={cn(
      "text-[0.7rem] font-bold uppercase tracking-[0.12em]",
      dark ? "text-accent" : "text-eyebrow",
    )}
  >
    {children}
  </span>
);

const Poster = ({
  children,
  dark,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) => (
  <h2
    className={cn(
      "mt-2 font-heading text-[clamp(1.75rem,4vw,3rem)] font-black uppercase leading-[0.95] tracking-[-0.015em]",
      dark ? "text-primary-foreground" : "text-foreground",
    )}
  >
    {children}
  </h2>
);

/** Cluster header: title on the left, the cluster's argument on the right. */
const ClusterHead = ({
  index,
  title,
  blurb,
  dark,
}: {
  index: string;
  title: React.ReactNode;
  blurb: React.ReactNode;
  dark?: boolean;
}) => (
  <div className="grid items-end gap-4 lg:grid-cols-2 lg:gap-10">
    <div>
      <Eyebrow dark={dark}>{index}</Eyebrow>
      <Poster dark={dark}>{title}</Poster>
    </div>
    <p
      className={cn(
        "text-[0.97rem] leading-relaxed",
        dark ? "text-primary-foreground/85" : "text-muted-foreground",
      )}
    >
      {blurb}
    </p>
  </div>
);

const Tiles = ({ items }: { items: ActivityTileProps[] }) => (
  <div className="mt-9 grid gap-6 sm:grid-cols-2">
    {items.map((a) => (
      <ActivityTile key={a.name} {...a} />
    ))}
  </div>
);

/** Full-bleed photo strip with a caption. */
const Strip = ({ src, alt, caption }: { src: string; alt: string; caption: string }) => (
  <div className="relative h-[clamp(13.75rem,34vw,26rem)] overflow-hidden">
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover object-[50%_62%]"
      loading="lazy"
    />
    <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,hsl(var(--ink)/0.82),transparent)] px-6 pb-4 pt-12">
      <p className="container text-xs font-semibold uppercase tracking-[0.05em] text-primary-foreground">
        {caption}
      </p>
    </div>
  </div>
);

// ── the page ───────────────────────────────────────────────────────────────

const StudentLife = () => {
  const section = findSection("/student-life")!;

  return (
    <>
      <PosterHero
        section={section}
        title="Student"
        titleAccent="Life"
        lede="Eight things a child can join at Crimson, and one that finds them. Character is formed on the stage, on the court, at the table, and in the village."
        image={heroPhoto}
        imagePosition="50% 38%"
      />

      {/* ── the statement ─────────────────────────────────────────────── */}
      <section className="container pt-16 sm:pt-20">
        <h2 className="max-w-[30ch] font-heading text-[clamp(1.7rem,3.6vw,2.75rem)] font-bold leading-[1.1] text-primary">
          The bell at four is not the end of the day. For a lot of our children it is the best part of
          it.
        </h2>
        <div className="mt-7 grid gap-x-10 gap-y-5 text-base leading-relaxed text-muted-foreground md:grid-cols-2">
          <p>
            Crimson Academy is a small school in a rural district, and everything on this page had to
            be built rather than inherited — a pitch, a hard court, a hall, a staff willing to stay
            behind. Activities are open to every child from{" "}
            <strong className="text-foreground">Primary 2 upward</strong>, and they are not a reward
            for finishing your work. Artistic expression and physical education are timetabled from
            nursery as part of the national curriculum; what happens after four is where a child gets
            to choose.
          </p>
          <p>
            Some of what follows is a stage, some of it is a court, and some of it is a desk with a
            teacher who has stayed late. We have deliberately put{" "}
            <strong className="text-foreground">after-school coaching</strong> on the same page as
            karate and choir, at the same size, because in the year we have just measured it is the
            thing that moved the most children.
          </p>
        </div>
      </section>

      {/* ── on the stage ──────────────────────────────────────────────── */}
      <Band id="arts" ground="tint">
        <ClusterHead
          index="Cluster One"
          title={<>On the stage</>}
          blurb="Music and dance are not the school's decoration. They open the morning, they carry both graduations, and they are the first place a shy child is ever applauded by 780 people."
        />
        <Tiles items={onTheStage} />
      </Band>

      {/* ── on the court ──────────────────────────────────────────────── */}
      <Band id="sports" ground="crimson">
        <ClusterHead
          dark
          index="Cluster Two"
          title={<>On the court</>}
          blurb="Three sports, one hard court and one pitch. Karate is the most evenly balanced activity in the school between girls and boys; basketball is the newest thing on campus; football is the one everybody already plays."
        />
        <Tiles items={onTheCourt} />
      </Band>

      <Strip
        src={tournamentPhoto}
        alt=""
        caption="Tournament day · Kagina · sides from across the district"
      />

      {/* ── at the table ──────────────────────────────────────────────── */}
      <Band id="table" ground="tint">
        <ClusterHead
          index="Cluster Three"
          title={<>At the table</>}
          blurb="For the children who are not going to be found on a pitch. Argument, strategy, and the least glamorous programme we run — the one that has moved the most children."
        />
        <Tiles items={atTheTable} />
      </Band>

      {/* ── where & when ──────────────────────────────────────────────── */}
      <Band id="day">
        <Eyebrow>Practicalities</Eyebrow>
        <Poster>Where &amp; when</Poster>
        <p className="mt-4 max-w-[62ch] leading-relaxed text-muted-foreground">
          Everything on this page happens on campus, after lessons, on the pitch, the hard court, or
          in a classroom. Nothing here costs a family anything beyond being able to get a child home
          afterwards — which is what the buses are for. The school year runs in three terms from
          September through July; exact dates are published under{" "}
          <Link
            to="/news#calendar"
            className="font-medium text-primary underline underline-offset-4"
          >
            Calendar &amp; Term Dates
          </Link>
          .
        </p>

        <div className="mt-9 rounded-2xl border bg-card px-7 py-7 sm:px-8">
          <h3 className="font-heading text-xl font-semibold">What a child needs to take part</h3>
          <p className="mt-2.5 max-w-[66ch] text-sm leading-relaxed text-muted-foreground">
            No fees, no trials, and for most activities no kit. Football and basketball squads are
            issued match shirts by the school. Karate gi are shared and handed on as children grow out
            of them.
          </p>
          <dl className="mt-6 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "P2+", k: "Open from Primary 2" },
              { n: "8", k: "Programmes offered" },
              { n: "0 RWF", k: "Cost to families" },
              { n: "On site", k: "Pitch, hard court, hall, classrooms" },
            ].map((s) => (
              <div key={s.k} className="flex flex-col bg-card px-5 py-4">
                <dd className="font-heading text-2xl font-bold leading-none text-primary">{s.n}</dd>
                <dt className="mt-auto pt-2 text-[0.7rem] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                  {s.k}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </Band>

      {/* ── faith & service ───────────────────────────────────────────── */}
      <Band id="chapel" ground="ink">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <Eyebrow dark>Faith &amp; Service</Eyebrow>
            <Poster dark>The one nobody signs up for</Poster>
            <div className="mt-4 space-y-4 leading-relaxed text-primary-foreground/90">
              <p>
                Every school day opens together — prayer, song, and a short reading — before a single
                lesson starts. Our six core values are each anchored in scripture and taught
                explicitly rather than left to be absorbed.
              </p>
              <p>
                And once a month the oldest class in the school walks out of the gate. Primary 6 goes
                into Kagina village with their teachers to teach, to encourage, and to carry rice and
                beans to the families who open their doors to them. It is not an option on a form. It
                is written into the year, and for many of our students it is the part of Crimson they
                still talk about years later.
              </p>
              <p className="text-primary-foreground/80">
                Families of all backgrounds are welcome here. What we believe is described under{" "}
                <Link to="/about#faith" className="font-medium text-accent underline underline-offset-4">
                  Our Christian Faith
                </Link>
                .
              </p>
            </div>
            <blockquote className="mt-6 border-l-[3px] border-accent py-2 pl-5 font-heading text-base italic leading-relaxed">
              &ldquo;For even the Son of Man did not come to be served, but to serve.&rdquo;
              <cite className="mt-1.5 block text-[0.7rem] font-bold not-italic uppercase tracking-[0.06em] text-accent">
                Mark 10:45
              </cite>
            </blockquote>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <img
              src={servicePhoto}
              alt="Primary 6 pupils visiting a family during the monthly community outreach"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </Band>

      {/* ── health & wellbeing ────────────────────────────────────────── */}
      <Band id="wellbeing" ground="crimson">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="lg:order-2">
            <Eyebrow dark>Health &amp; Wellbeing</Eyebrow>
            <Poster dark>A child cannot join anything on an empty stomach</Poster>
            <p className="mt-4 leading-relaxed text-primary-foreground/90">
              Support Services is one of the five pillars of our educational model, and it is the
              reason the rest of this page is possible at all. A child who is hungry, unwell, or
              carrying something heavy from home does not join the choir and does not stay for
              revisions.
            </p>
            <ul className="mt-6">
              {provisions.map((p, i) => (
                <li
                  key={i}
                  className="flex gap-3 border-b border-dashed border-primary-foreground/25 py-2.5 text-[0.92rem] leading-relaxed text-primary-foreground/90 last:border-b-0"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-2xl lg:order-1">
            <img
              src={mealsPhoto}
              alt="Crimson Academy children eating a meal from the school food programme"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </Band>

      {/* ── closing CTA ───────────────────────────────────────────────── */}
      <section className="bg-accent py-14">
        <div className="container flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="max-w-[24ch] font-heading text-[clamp(1.5rem,3vw,2.125rem)] font-bold text-accent-foreground">
              Come on a Tuesday afternoon.
            </h2>
            <p className="mt-2.5 max-w-[46ch] text-accent-foreground/85">
              The best time to see this school is not during a lesson. It is at four o&apos;clock.
            </p>
          </div>
          <Link
            to="/admissions#visit"
            className={cn(buttonVariants({ size: "lg" }), "rounded-full")}
          >
            Arrange a visit
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default StudentLife;
