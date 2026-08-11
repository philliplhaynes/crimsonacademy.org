import { useMemo, useState } from "react";
import { Heart, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

import marieClaire from "@/assets/staff-marie-claire.webp";
import jeanDamascene from "@/assets/staff-jean-damascene.webp";
import martha from "@/assets/staff-martha.webp";
import jeanClaude from "@/assets/staff-jean-claude.webp";
/** Watermark for a leader with no photograph on file — see the team grid. */
import crest from "@/assets/crimson_tree.png";

/**
 * School leaders (photo grid), then a searchable staff directory (text only).
 *
 * The directory is modelled on berkeleycarroll.org's faculty/staff directory:
 * a name/role search box, a department filter, and a plain grid of name +
 * position, no photographs. Two things deliberately don't carry over:
 *  - Their pagination ("1–40 of 298") exists because their directory is
 *    database-backed. We have a few dozen, so showing all is less friction.
 *  - Their names link to individual bio pages. Ours don't yet — there are no
 *    per-person pages to link to. The crimson is styling, not a link colour;
 *    if bio pages ever exist, these become <Link>s.
 *
 * THE DATA IS PERSON-FIRST, NOT ROLE-FIRST, and that is load-bearing: several
 * staff hold two or more jobs (Frederic teaches P2B, is the school Pastor,
 * *and* leads Music; David teaches P5A *and* leads the Upper School). A
 * role-first list showed those people twice and inflated the headcount. Here
 * each person appears once and
 * carries all their roles, so `staff.length` is a true headcount and the
 * department filter matches a person if *any* of their roles is in that group.
 *
 * TO ADD A PHOTO: set `photo` on that person below.
 * TO NAME A REMAINING POST: add `name` to that entry.
 */

type Group = "Leadership & administration" | "Teaching" | "Activities" | "Operations";

/** Column order for the filter pills. */
const GROUPS: Group[] = [
  "Leadership & administration",
  "Teaching",
  "Activities",
  "Operations",
];

/** The school's academic departments — the three age divisions, plus Languages. */
type Department = "Nursery School" | "Upper School" | "Lower School" | "Languages";

interface Assignment {
  /**
   * The person's actual title for this job, e.g. "P3B Teacher" — not the
   * generic bucket ("Lower school teacher") that used to double up with the
   * department tag shown above it.
   */
  title: string;
  /** Extra qualifier shown after the title, e.g. "Uganda". */
  detail?: string;
  group: Group;
  /**
   * Only set for Teaching roles that belong to one of the school's
   * departments. Every classroom teacher, teaching assistant, and language
   * teacher currently has one assigned. Left as optional (not required) for
   * activities instructors and school-wide admin (Head Mistress, Accountant,
   * Pastor), who don't belong to one department, and as an escape hatch for
   * any future Teaching role that genuinely doesn't fit one — `roleTag`
   * falls back to a generic "Teaching" tag when this is unset.
   */
  department?: Department;
}

/**
 * Tag shown on each role line: label + colour. Three brand tones already
 * used elsewhere on the site (crimson, ink, gold) rather than new colours,
 * so a person's two roles (e.g. a department + Leadership) read as visually
 * distinct at a glance. Returns null for Operations — those lines render
 * plain, unchanged, per the owner (see StaffList).
 */
function roleTag(r: Assignment): { label: string; className: string } | null {
  if (r.group === "Operations") return null;
  if (r.group === "Activities") return { label: "Activities", className: "text-accent" };
  if (r.group === "Leadership & administration") {
    return { label: "Leadership", className: "text-primary" };
  }
  return { label: r.department ?? "Teaching", className: "text-foreground" };
}

/** Display order for the departments — the three age divisions, then Languages. */
const DEPARTMENT_ORDER: Department[] = ["Nursery School", "Lower School", "Upper School", "Languages"];

/**
 * Directory sort order: department, then the person's teacher title
 * (alphabetical) — computed, not hand-maintained, so reassigning someone's
 * department (as already happened twice) reorders the grid automatically
 * instead of requiring another manual pass over the array. The physical
 * order of `staff` below is just for readability; it doesn't drive display.
 *
 * A person's rank comes from their Teaching role, if they have one — that's
 * why David (teacher + Upper School leader) sorts with Upper School, not
 * with Leadership. People with no Teaching role keep the array's original
 * relative order within their bucket (Leadership-only first, then
 * Activities-only, then Operations), since nothing was asked to reorder them.
 */
function staffSortRank(p: StaffMember): { bucket: number; departmentRank: number; title: string } {
  const teaching = p.roles.find((r) => r.group === "Teaching");
  if (teaching) {
    const departmentRank = teaching.department
      ? DEPARTMENT_ORDER.indexOf(teaching.department)
      : DEPARTMENT_ORDER.length;
    return { bucket: 1, departmentRank, title: teaching.title };
  }
  if (p.roles.some((r) => r.group === "Leadership & administration")) {
    return { bucket: 0, departmentRank: 0, title: "" };
  }
  if (p.roles.some((r) => r.group === "Activities")) {
    return { bucket: 2, departmentRank: 0, title: "" };
  }
  return { bucket: 3, departmentRank: 0, title: "" }; // Operations
}

function compareStaff(a: StaffMember, b: StaffMember): number {
  const ra = staffSortRank(a);
  const rb = staffSortRank(b);
  if (ra.bucket !== rb.bucket) return ra.bucket - rb.bucket;
  if (ra.departmentRank !== rb.departmentRank) return ra.departmentRank - rb.departmentRank;
  return ra.title.localeCompare(rb.title);
}

interface StaffMember {
  /** Undefined = the post exists but we have no name for it yet. */
  name?: string;
  photo?: string;
  /** One entry per job this person holds. */
  roles: Assignment[];
}

/**
 * HEADCOUNT — 32 people, 31 named. The 2024–25 Annual School Report says 34
 * employees, but its breakdown counts *posts*, not people: it used to list a
 * Pastor separately from the 6 lower-school teachers when Robert held both
 * (Pastor has since moved to Frederic, who was already a lower-school
 * teacher — the same double-count logic still applies to whoever holds it).
 * Once the dual/triple-role staff are counted once each, the roster lands at
 * 33 — and then 32 once the Activities instructor Innocent (Gymnastics &
 * football) was removed at the owner's request; the other Innocent, the
 * Languages French teacher, is a different person and still on staff. The
 * remaining gap from the report's 34 is unexplained — possibly a second
 * administrator the report counts and we have no name for. Worth confirming
 * with the school.
 */
const staff: StaffMember[] = [
  // ── Leadership & administration (roles held on their own) ────────────────
  {
    name: "Marie Claire Mukabirinda",
    photo: marieClaire,
    roles: [{ title: "Head Mistress", group: "Leadership & administration" }],
  },
  {
    name: "Jean Claude Twizeyimana",
    photo: jeanClaude,
    roles: [{ title: "Accountant", group: "Leadership & administration" }],
  },

  // ── Nursery School — teachers, then their teaching assistants ───────────
  {
    name: "Martha Niyotwagira",
    photo: martha,
    roles: [
      { title: "Nursery C Teacher", group: "Teaching", department: "Nursery School" },
      { title: "Nursery School Leader", group: "Leadership & administration" },
    ],
  },
  {
    name: "Valentine",
    roles: [{ title: "Nursery A Teacher", group: "Teaching", department: "Nursery School" }],
  },
  {
    // NOTE: photo assumed to be this Damascene — see the caveat on `leaders`.
    name: "Damascene",
    photo: jeanDamascene,
    roles: [
      { title: "Nursery B Teacher", group: "Teaching", department: "Nursery School" },
      { title: "Lower School Leader", group: "Leadership & administration" },
    ],
  },
  {
    name: "Marie Louise",
    roles: [{ title: "Nursery A", detail: "Teacher Assistant", group: "Teaching", department: "Nursery School" }],
  },
  {
    name: "Francine",
    roles: [{ title: "Nursery B", detail: "Teacher Assistant", group: "Teaching", department: "Nursery School" }],
  },
  {
    name: "Judith",
    roles: [{ title: "Nursery C", detail: "Teacher Assistant", group: "Teaching", department: "Nursery School" }],
  },

  // ── Lower School — classroom teachers, then Clemance (French, assigned here) ──
  {
    name: "Robert",
    roles: [
      { title: "P3A Teacher", group: "Teaching", department: "Lower School" },
      { title: "Futbol Coach", group: "Activities" },
    ],
  },
  { name: "Ernestine", roles: [{ title: "P3B Teacher", group: "Teaching", department: "Lower School" }] },
  { name: "Brigitte", roles: [{ title: "P2A Teacher", group: "Teaching", department: "Lower School" }] },
  {
    // Pastor moved here from Robert, per the owner.
    name: "Frederic",
    roles: [
      { title: "P2B Teacher", detail: "Uganda", group: "Teaching", department: "Lower School" },
      { title: "Music lead", group: "Activities" },
      { title: "Pastor", group: "Leadership & administration" },
    ],
  },
  { name: "Elise", roles: [{ title: "P1A Teacher", group: "Teaching", department: "Lower School" }] },
  {
    name: "Esther",
    roles: [{ title: "P1B Teacher", detail: "Uganda", group: "Teaching", department: "Lower School" }],
  },

  // ── Upper School — classroom teachers ────────────────────────────────────
  { name: "Patrick", roles: [{ title: "P6 Teacher", group: "Teaching", department: "Upper School" }] },
  { name: "Abdallah", roles: [{ title: "P6 Teacher", group: "Teaching", department: "Upper School" }] },
  {
    name: "David",
    roles: [
      { title: "P5A Teacher", group: "Teaching", department: "Upper School" },
      { title: "Upper School Leader", group: "Leadership & administration" },
    ],
  },
  { name: "Henry", roles: [{ title: "P5B Teacher", group: "Teaching", department: "Upper School" }] },
  {
    name: "Phillip",
    roles: [{ title: "P4A Teacher", detail: "Uganda", group: "Teaching", department: "Upper School" }],
  },
  {
    name: "Elizabeth",
    roles: [
      { title: "P4B Teacher", group: "Teaching", department: "Upper School" },
      { title: "Chorus lead", group: "Activities" },
    ],
  },

  // ── Languages — teach across the school, not one age division ───────────
  {
    name: "Innocent",
    roles: [{ title: "French Teacher", group: "Teaching", department: "Languages" }],
  },
  {
    name: "Clemance",
    roles: [{ title: "French Teacher", group: "Teaching", department: "Languages" }],
  },
  {
    // NOTE: there are two people named Valentine — this is the Kinyarwanda
    // teacher, not the Nursery A teacher above. Don't conflate them.
    name: "Valentine",
    roles: [{ title: "Kinyarwanda Teacher", group: "Teaching", department: "Languages" }],
  },
  {
    name: "Vincent",
    roles: [{ title: "Kinyarwanda Teacher", group: "Teaching", department: "Languages" }],
  },

  // ── Activities ───────────────────────────────────────────────────────────
  { name: "Eugene", roles: [{ title: "Karate instructor", group: "Activities" }] },

  // ── Operations ───────────────────────────────────────────────────────────
  { roles: [{ title: "Driver", group: "Operations" }] },
  { name: "Salimin", roles: [{ title: "Cook", group: "Operations" }] },
  { name: "Christophe", roles: [{ title: "Cook", group: "Operations" }] },
  { name: "Ramazan", roles: [{ title: "Cook", group: "Operations" }] },
  { name: "Niragire", roles: [{ title: "Cleaner", group: "Operations" }] },
  { name: "Christophe", roles: [{ title: "Security guard", group: "Operations" }] },
  { name: "Alex", roles: [{ title: "Landscaper / Security Guard", group: "Operations" }] },
];

const total = staff.length;
const named = staff.filter((s) => s.name).length;

/**
 * The five leadership roles, with the person who holds each.
 *
 * TWO THINGS TO CONFIRM WITH THE SCHOOL:
 *  1. The photo used for Damascene is the one the sister site
 *     (crimsonfoundation.org /our-team) files under "Jean Damascene
 *     Twizeyimana", where he is listed as *Upper* School Leader. The owner
 *     says Damascene leads the *Lower* School and David leads the Upper. The
 *     names match so this is almost certainly the same man with an out-of-date
 *     title on the sister site — but if they are two different people, this is
 *     the wrong face against the name and must be removed.
 *  2. David has no photograph on file, so his card shows the heart placeholder.
 *
 * Ashela Claire Ineza was removed entirely — she no longer works at the school.
 */
interface Leader {
  name: string;
  title: string;
  photo?: string;
  note: string;
}

const leaders: Leader[] = [
  {
    name: "Marie Claire Mukabirinda",
    title: "Head Mistress",
    photo: marieClaire,
    note: "Crimson Academy's third head teacher, leading the school since 2017.",
  },
  {
    name: "David",
    title: "Upper School Leader",
    note: "Leads Primary 4 to Primary 6, including preparation for the National Examination. Also teaches Primary 5A.",
  },
  {
    name: "Damascene",
    title: "Lower School Leader",
    photo: jeanDamascene,
    note: "Leads Primary 1 to Primary 3, where core literacy and numeracy are built. Also teaches Nursery B.",
  },
  {
    name: "Martha Niyotwagira",
    title: "Nursery School Leader",
    photo: martha,
    note: "Leads the early years, from a child's first day at school through nursery graduation. Also teaches Nursery C.",
  },
  {
    name: "Jean Claude Twizeyimana",
    title: "Accountant",
    photo: jeanClaude,
    note: "Keeps the school's books, from fee collection to the annual report's financial statements.",
  },
];

/**
 * The Head Mistress leads the array and is rendered as the featured card; the
 * rest follow as portrait cards. Order matters here — if `leaders` is ever
 * reordered, the featured slot follows whoever is first.
 */
const [principal, ...team] = leaders;

const StaffList = () => {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<Group | "All">("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return staff
      .filter((p) => {
        // A person belongs to a department if ANY of their roles is in it —
        // that's how Robert shows under both Teaching and Leadership.
        if (group !== "All" && !p.roles.some((r) => r.group === group)) return false;
        if (!q) return true;
        const haystack = [p.name, ...p.roles.flatMap((r) => [r.title, r.detail, r.group])];
        return haystack.some((v) => v?.toLowerCase().includes(q));
      })
      .sort(compareStaff);
  }, [query, group]);

  return (
    <div>
      {/* search + department filter — the part of the reference directory
          that's genuinely useful at any size, unlike its pagination */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or role"
            aria-label="Search staff by name or role"
            className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-9 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {(["All", ...GROUPS] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGroup(g)}
              aria-pressed={group === g}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                group === g
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/60 text-muted-foreground hover:bg-secondary",
              )}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
        Showing {filtered.length} of {total}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          No one matches &ldquo;{query}&rdquo;. Try a different name, role, or department.
        </p>
      ) : (
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p, i) => (
            /*
              Translucent neutral panel. Uses --foreground at low alpha rather
              than --muted: every token in this theme sits at hue 40 (warm
              cream/tan), so --muted would tint these boxes beige. --foreground
              is near-neutral (0 12%), so a few percent of it desaturates the
              cream underneath into actual grey — and because it's alpha over
              whatever is behind, it inverts correctly in dark mode instead of
              staying a light box on a dark page.
            */
            <li
              key={`${p.name ?? "unfilled"}-${p.roles[0].title}-${i}`}
              className="flex gap-2.5 rounded-lg bg-foreground/[0.05] p-4"
            >
              {/*
                Decorative only — since the directory dropped photographs, the
                heart no longer means "photo missing"; it's a list marker
                carrying the school's motif. Kept small and at low opacity so
                33 of them read as texture, not 33 competing icons, and
                aria-hidden so a screen reader doesn't announce every one.
              */}
              <Heart
                className="mt-[0.3rem] h-3 w-3 shrink-0 fill-primary/25 text-primary/25"
                aria-hidden="true"
              />
              <div className="min-w-0">
                {/* Names carry the crimson; the "Name to come" placeholders
                    stay muted, since they aren't names. */}
                <div
                  className={cn(
                    "font-heading text-base font-semibold leading-snug",
                    p.name ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {p.name ?? "Name to come"}
                </div>
                {/*
                  One block per job — people with two roles show both. Every
                  role except Operations shows its actual title (e.g. "P3B
                  Teacher") stacked underneath a small bold coloured
                  department tag, so two roles on one card read as distinct
                  blocks rather than one run-on line. Operations is left as a
                  single plain title, per the owner: those posts (cook,
                  driver, cleaner, guard) don't have a department/title split
                  the way teaching and leadership roles do.

                  Leadership renders first when a person holds it — the
                  leadership title leads the card, then the department they
                  teach or work in, then the class if they have one — rather
                  than in whatever order the data happens to list the roles.
                  A stable sort only moves Leadership up; Teaching vs.
                  Activities keep their original relative order.
                */}
                {[...p.roles]
                  .sort((a, b) =>
                    Number(b.group === "Leadership & administration") -
                    Number(a.group === "Leadership & administration"),
                  )
                  .map((r, ri) => {
                  const tag = roleTag(r);
                  if (!tag) {
                    return (
                      <div key={ri} className="mt-1 text-sm leading-snug text-muted-foreground">
                        {r.title}
                      </div>
                    );
                  }
                  return (
                    <div key={ri} className="mt-2">
                      <div className={cn("text-[0.65rem] font-bold uppercase tracking-wide", tag.className)}>
                        {tag.label}
                      </div>
                      <div className="text-sm leading-snug text-muted-foreground">
                        {r.detail ? `${r.title} — ${r.detail}` : r.title}
                      </div>
                    </div>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const StaffDirectory = () => (
  <>
    {/* ---------- named leadership ---------- */}
    <div className="text-xs font-semibold uppercase tracking-wider text-eyebrow">
      School leaders
    </div>
    <h3 className="mt-2 font-heading text-2xl font-semibold md:text-3xl">
      Who leads each part of the school.
    </h3>

    {/*
      Five equal square photos in a row read as flat and undifferentiated —
      the page's own leadership had no hierarchy in it. Now the Head Mistress
      gets a featured crimson card (she runs the school; the layout should say
      so) and the other four sit as portrait cards with the name overlaid on
      the photo, reusing the gradient-over-photo treatment already established
      by the history page's chapter cards rather than inventing a sixth style.
    */}
    <div className="mt-6 flex flex-col items-center gap-6 rounded-xl bg-primary p-6 text-center text-primary-foreground sm:flex-row sm:gap-7 sm:p-7 sm:text-left">
      {principal.photo ? (
        <img
          src={principal.photo}
          alt={`Portrait of ${principal.name}, ${principal.title}`}
          className="h-32 w-32 shrink-0 rounded-full object-cover"
          loading="lazy"
          width={976}
          height={976}
        />
      ) : (
        <div className="h-32 w-32 shrink-0 rounded-full bg-primary-foreground/10" />
      )}
      <div className="min-w-0">
        <div className="text-xs font-bold uppercase tracking-widest text-accent">
          {principal.title}
        </div>
        <div className="mt-1.5 font-heading text-2xl font-semibold leading-tight">
          {principal.name}
        </div>
        <p className="mt-2.5 max-w-prose text-sm leading-relaxed text-primary-foreground/85">
          {principal.note}
        </p>
      </div>
    </div>

    <ul className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {team.map((l) => (
        <li key={l.title} className="rounded-lg bg-foreground/[0.04] p-4 text-center">
          {l.photo ? (
            <img
              src={l.photo}
              alt={`Portrait of ${l.name}, ${l.title}`}
              className="mx-auto h-20 w-20 rounded-full object-cover"
              loading="lazy"
              width={976}
              height={976}
            />
          ) : (
            /* No photograph on file. A crimson disc carrying the school crest,
               so the card keeps the same shape and weight as its neighbours
               instead of leaving a hole where a person should be. */
            <div
              role="img"
              aria-label={`${l.name} — photograph to come`}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
            >
              <img src={crest} alt="" aria-hidden="true" className="w-10 opacity-45" loading="lazy" />
            </div>
          )}
          <div className="mt-3 text-[0.65rem] font-bold uppercase tracking-wide text-eyebrow">
            {l.title}
          </div>
          <div className="mt-1 font-heading text-sm font-semibold leading-tight text-primary">
            {l.name}
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{l.note}</p>
        </li>
      ))}
    </ul>

    {/* ---------- searchable directory of everyone at the school ---------- */}
    <div className="mt-14 border-t pt-12">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-eyebrow">
            Our people
          </div>
          <h3 className="mt-2 font-heading text-2xl font-semibold md:text-3xl">
            {total} staff, post by post.
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">{named} of {total} named so far</p>
      </div>

      <p className="mt-4 max-w-3xl text-muted-foreground">
        Everyone who works at the school, listed once. Several staff hold two roles &mdash; a
        class teacher who also leads a division, or runs an activity &mdash; and both are shown.
      </p>

      <div className="mt-8">
        <StaffList />
      </div>
    </div>
  </>
);
