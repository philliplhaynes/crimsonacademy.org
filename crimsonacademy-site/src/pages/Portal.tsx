import { Lock, ExternalLink, HelpCircle } from "lucide-react";
import { PosterHero, Band } from "@/components/PosterHero";
import { findSection } from "@/nav";
import { SectionHead } from "@/components/SectionHead";

import heroPhoto from "@/assets/portal-hero.jpg";
import studentsPhoto from "@/assets/contact-students.jpg";
import parentsPhoto from "@/assets/community-service-outreach.jpg";
import donorsPhoto from "@/assets/family-outreach-visit.jpg";
import staffPhoto from "@/assets/staff-group.jpg";

/**
 * /portal — applies content/portal-mockup/index.html to the live site, on
 * the same PosterHero + Band furniture as About/Academics/Admissions/
 * Student Life.
 *
 * The login section is deliberately not a login form. It is a single
 * external link to https://www.crimsonfoundation.org/portal/login — this
 * site never presents fields for a Portal username or password, so it can
 * never collect or see one. If a future request asks for an embedded or
 * "quick" login box here, that changes the security posture and is worth a
 * real conversation before building it.
 *
 * The copy below is written fresh, not copied from the Foundation's login
 * page — it explains the same ID-card-vs-email distinction in this site's
 * own voice. The Foundation's page also names a specific default password
 * string as public UI copy; that is left out here, since a second site
 * repeating it serves no purpose.
 */
const PORTAL_LOGIN_URL = "https://www.crimsonfoundation.org/portal/login";

const roles = [
  {
    role: "Students",
    title: "See your own progress",
    text: "Grades, assignments, attendance, and school announcements, from anywhere.",
    photo: studentsPhoto,
    alt: "Two Crimson Academy students in uniform",
  },
  {
    role: "Parents",
    title: "Stay close to their day",
    text: "Attendance, performance, and a direct line to your child's teachers.",
    photo: parentsPhoto,
    alt: "Crimson Academy staff and students visiting a family during a community outreach visit",
  },
  {
    role: "Donors",
    title: "Follow your impact",
    text: "Updates on the student you sponsor, plus giving history and receipts.",
    photo: donorsPhoto,
    alt: "A home visit with a sponsored student's family",
  },
  {
    role: "Staff & School Management",
    title: "Run the school day to day",
    text: "Student records, schedules, and administrative reporting in one place.",
    photo: staffPhoto,
    alt: "The Crimson Academy staff",
  },
];

const steps = [
  {
    n: 1,
    title: "Get your credential",
    text: "Staff and students receive an ID card from the school. Parents, donors, and administrators use the email address already on file with us.",
  },
  {
    n: 2,
    title: "Go to the Portal",
    text: (
      <>
        Use the Sign In button above, or go directly to{" "}
        <b className="text-foreground">crimsonfoundation.org/portal/login</b>. It is a separate
        site from crimsonacademy.org.
      </>
    ),
  },
  {
    n: 3,
    title: "Set a new password",
    text: "First-time accounts start with a temporary password. The Portal will ask you to choose your own the moment you sign in.",
  },
];

const Portal = () => {
  const section = findSection("/portal")!;

  return (
    <>
      <PosterHero
        section={section}
        title="Portal"
        lede="Students, parents, donors and staff all connect through one platform — the Crimson Foundation Portal. Sign in to see grades, attendance, sponsorship updates, and school records."
        image={heroPhoto}
        imagePosition="50% 38%"
      />

      {/* ---------- overview + sign in ---------- */}
      <Band id="overview">
        <SectionHead eyebrow="Portal" title="One account, everything about" pop="your child's education." />

        <div className="mt-7 grid gap-7 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div className="leading-relaxed text-muted-foreground">
            <p>
              The Portal is run by the <b className="text-foreground">Crimson Foundation</b> on
              behalf of Crimson Academy and every school it supports. It is where academic records
              live: attendance, grades, report cards, school announcements, and — for sponsors — a
              direct view of the student they support.
            </p>
            <p className="mt-4">
              Because the Portal serves the whole Crimson Foundation network, it lives on the
              Foundation's own site rather than this one. Signing in from here takes you to{" "}
              <b className="text-foreground">crimsonfoundation.org</b>, in a new tab, where your
              credentials are entered and checked. Nothing you type there is seen or stored by the
              Crimson Academy website.
            </p>
            <div className="mt-5 rounded-lg bg-secondary/60 p-4 text-sm">
              <b className="text-foreground">Staff and students</b> sign in with the ID printed on
              their credential card. <b className="text-foreground">Parents, donors, and
              administrators</b> sign in with their email address. New accounts are given a
              temporary password, which the Portal asks you to change the first time you sign in.
            </div>
          </div>

          <div id="login" className="scroll-mt-36 rounded-xl bg-primary p-7 text-primary-foreground">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-accent">
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              Secure external sign-in
            </div>
            <h3 className="mt-2.5 font-heading text-xl font-semibold">Sign In to the Portal</h3>
            <p className="mt-2.5 text-sm text-primary-foreground/85">
              Opens the Crimson Foundation Portal login page in a new tab.
            </p>
            <a
              href={PORTAL_LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-accent px-5 py-3.5 text-[0.95rem] font-bold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Sign In to the Portal
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
            <div className="mt-4 flex items-start gap-2 text-xs text-primary-foreground/70">
              <HelpCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>
                Don't have an account yet? You can request one from the Portal's sign-up page, or
                ask us — see "Need Help" below.
              </span>
            </div>
            <div className="mt-4 border-t border-primary-foreground/20 pt-4 text-xs text-primary-foreground/70">
              Hosted and secured by the Crimson Foundation, crimsonfoundation.org
            </div>
          </div>
        </div>
      </Band>

      {/* ---------- who can access ---------- */}
      <Band id="roles" ground="tint">
        <SectionHead eyebrow="Who Can Access the Portal" title="Built for four different people," pop="in one place." />
        <p className="mt-4 max-w-[65ch] text-muted-foreground">
          Everyone signs in to the same Portal — what you see depends on who you are.
        </p>

        <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((r) => (
            <li key={r.role} className="overflow-hidden rounded-xl border bg-background">
              <img
                src={r.photo}
                alt={r.alt}
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <div className="text-[0.65rem] font-bold uppercase tracking-wide text-eyebrow">
                  {r.role}
                </div>
                <h4 className="mt-1 font-heading text-base font-semibold">{r.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Band>

      {/* ---------- getting started ---------- */}
      <Band id="getting-started">
        <SectionHead eyebrow="First Time Here" title="Three things to know" pop="before you sign in." />
        <ol className="mt-7 grid gap-7 sm:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="border-t-[3px] border-primary pt-4">
              <div className="font-heading text-xs font-bold uppercase tracking-wide text-accent">
                Step {s.n}
              </div>
              <h4 className="mt-1.5 font-heading text-lg font-semibold">{s.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </Band>

      {/* ---------- need help ---------- */}
      <Band id="help" className="border-b-0">
        <div className="flex flex-wrap items-center justify-between gap-5 rounded-xl bg-secondary/60 p-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-eyebrow">
              Need Access?
            </div>
            <p className="mt-1.5 max-w-[46ch] text-sm text-muted-foreground">
              Don't have Portal credentials yet, or can't sign in? Contact the school and we'll get
              you connected.
            </p>
          </div>
          <a
            href="mailto:info@crimsonacademy.org"
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Contact Us
          </a>
        </div>
      </Band>
    </>
  );
};

export default Portal;
