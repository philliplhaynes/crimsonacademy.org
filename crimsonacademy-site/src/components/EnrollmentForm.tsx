import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ENROLLMENT_EMAIL } from "@/lib/links";

/**
 * The enrollment inquiry form. Every "Enroll Your Child" button on the site
 * — Navbar, Hero, Footer, and the sub-nav pill on this page — now lands here
 * instead of jumping straight to the explanatory "Five steps" section
 * further down the page (#enroll, unchanged, still reachable from its own
 * sub-nav pill).
 *
 * ─────────────────────────────────────────────────────────────────────────
 * HOW SUBMISSION ACTUALLY WORKS, AND WHY.
 *
 * This site is a static build with no server of its own — confirmed over
 * several long conversations about hosting, none of which had settled on a
 * platform at the time this was written (Netlify, Cloudflare Pages and
 * fly.io were all still live options). That rules out anything that needs a
 * backend to exist: a REST endpoint, a database, a hosted form service tied
 * to one specific host.
 *
 * What doesn't need any of that is `mailto:`. On submit, this composes a
 * mailto: URL from the filled-in fields — recipient, subject, and a
 * plain-text body listing every answer — and hands it to the browser. That
 * opens the visitor's own configured mail client with the message already
 * written, addressed to news@crimsonfoundation.org as asked. It works
 * identically regardless of which host wins, requires zero configuration,
 * and never goes stale because there is no service to outlive.
 *
 * The real cost: it depends on the visitor having a mail client configured
 * on the device they're using, which is a genuine gap on some phones and
 * shared/public computers. It also means the school has no server-side
 * record of a submission if the visitor's mail client fails silently or
 * they close the tab before their mail app opens. If that gap matters more
 * than "works everywhere with no setup", the fix is one of:
 *   - Netlify Forms, if the site ends up on Netlify — netlify.toml already
 *     exists in the repo root; add `data-netlify="true"` and a hidden
 *     `form-name` field to this <form> and Netlify captures every
 *     submission server-side with zero code beyond that.
 *   - A small serverless function (Cloudflare Pages Function, a Netlify
 *     Function, or an endpoint on whatever fly.io service exists) that
 *     accepts the POST and sends the email itself via a transactional
 *     provider.
 * Both are a follow-up once hosting is decided, not a blocker on this form
 * existing today.
 * ─────────────────────────────────────────────────────────────────────────
 */

type Grade =
  | "Nursery"
  | "Primary 1"
  | "Primary 2"
  | "Primary 3"
  | "Primary 4"
  | "Primary 5"
  | "Primary 6";

const grades: Grade[] = [
  "Nursery",
  "Primary 1",
  "Primary 2",
  "Primary 3",
  "Primary 4",
  "Primary 5",
  "Primary 6",
];

interface FormState {
  parentName: string;
  childName: string;
  childAge: string;
  grade: Grade | "";
  email: string;
  phone: string;
  message: string;
}

const initialState: FormState = {
  parentName: "",
  childName: "",
  childAge: "",
  grade: "",
  email: "",
  phone: "",
  message: "",
};

/** Builds the mailto: URL. Exported so it can be unit-tested without a DOM. */
export const buildEnrollmentMailto = (f: FormState): string => {
  const subject = `Enrollment inquiry: ${f.childName || "a child"}${f.grade ? ` (${f.grade})` : ""}`;
  const lines = [
    `Parent/guardian name: ${f.parentName}`,
    `Child's name: ${f.childName}`,
    `Child's age: ${f.childAge}`,
    `Grade applying for: ${f.grade}`,
    `Email: ${f.email}`,
    `Phone: ${f.phone || "(not given)"}`,
    "",
    "Message:",
    f.message || "(none)",
  ];
  const params = new URLSearchParams({ subject, body: lines.join("\n") });
  // URLSearchParams encodes spaces as "+", which mail clients show literally
  // in the subject/body rather than decoding — swap for the %20 that mailto
  // actually expects.
  return `mailto:${ENROLLMENT_EMAIL}?${params.toString().replace(/\+/g, "%20")}`;
};

const Field = ({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div>
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-foreground">
      {label} {required && <span className="text-primary">*</span>}
    </label>
    <div className="mt-1.5">{children}</div>
  </div>
);

const inputClass =
  "w-full rounded-md border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring";

export const EnrollmentForm = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [touched, setTouched] = useState(false);

  const set = <K extends keyof FormState>(key: K) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const isValid =
    form.parentName.trim() !== "" &&
    form.childName.trim() !== "" &&
    form.grade !== "" &&
    // Deliberately loose — a real @ and a dot is enough to catch a typo'd
    // name entered in the wrong field. A strict RFC 5322 regex rejects real
    // addresses more often than it catches fake ones.
    /\S+@\S+\.\S+/.test(form.email);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;
    window.location.href = buildEnrollmentMailto(form);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <Field label="Parent or guardian name" htmlFor="ef-parent" required>
        <input
          id="ef-parent"
          type="text"
          required
          value={form.parentName}
          onChange={set("parentName")}
          placeholder="Your full name"
          className={inputClass}
        />
      </Field>

      <Field label="Child's name" htmlFor="ef-child" required>
        <input
          id="ef-child"
          type="text"
          required
          value={form.childName}
          onChange={set("childName")}
          placeholder="Your child's full name"
          className={inputClass}
        />
      </Field>

      <Field label="Child's age" htmlFor="ef-age">
        <input
          id="ef-age"
          type="text"
          inputMode="numeric"
          value={form.childAge}
          onChange={set("childAge")}
          placeholder="e.g. 6"
          className={inputClass}
        />
      </Field>

      <Field label="Grade applying for" htmlFor="ef-grade" required>
        <select
          id="ef-grade"
          required
          value={form.grade}
          onChange={set("grade")}
          className={cn(inputClass, "appearance-none")}
        >
          <option value="" disabled>
            Select a grade
          </option>
          {grades.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Your email" htmlFor="ef-email" required>
        <input
          id="ef-email"
          type="email"
          required
          value={form.email}
          onChange={set("email")}
          placeholder="you@example.com"
          className={inputClass}
        />
      </Field>

      <Field label="Your phone" htmlFor="ef-phone">
        <input
          id="ef-phone"
          type="tel"
          value={form.phone}
          onChange={set("phone")}
          placeholder="Optional"
          className={inputClass}
        />
      </Field>

      <div className="sm:col-span-2">
        <Field label="Anything else we should know" htmlFor="ef-message">
          <textarea
            id="ef-message"
            rows={4}
            value={form.message}
            onChange={set("message")}
            placeholder="Transferring from another school, questions about fees, when you'd like to visit — whatever's useful to know before we reply."
            className={cn(inputClass, "resize-y")}
          />
        </Field>
      </div>

      <div className="sm:col-span-2">
        {touched && !isValid && (
          <p role="alert" className="mb-3 text-sm font-medium text-destructive">
            Please fill in your name, your child&apos;s name, the grade, and a valid email address.
          </p>
        )}
        <button type="submit" className={cn(buttonVariants({ size: "lg" }), "rounded-full")}>
          Send enrollment inquiry
          <Send className="ml-2 h-4 w-4" aria-hidden="true" />
        </button>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          This opens your email app with the message already written to{" "}
          <span className="font-medium text-foreground">{ENROLLMENT_EMAIL}</span> — nothing sends
          until you do. No email app on this device? Write to us directly instead.
        </p>
      </div>
    </form>
  );
};
