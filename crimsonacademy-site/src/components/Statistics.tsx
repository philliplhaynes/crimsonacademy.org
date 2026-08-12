/**
 * The four proof points, on their own quiet cream band directly under the
 * hero (mockup C).
 *
 * Mockup B had put these inside the hero. C takes them back out: with the
 * hero now full-bleed and centred, a fact strip inside it competed with the
 * poster type instead of supporting it. On their own band they read as the
 * evidence for the claim just made above them.
 */
const stats = [
  { n: "#1", k: "Southern Province, National Exams" },
  { n: "90.4%", k: "P6 National Exam average, 2024–2025" },
  { n: "780+", k: "Students, Nursery–Primary 6" },
  { n: "3", k: "Languages of instruction" },
];

export const Statistics = () => (
  <section className="border-b py-12 sm:py-14">
    <dl className="container grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.k}>
          <dt className="sr-only">{s.k}</dt>
          <dd>
            <span className="block font-heading text-[clamp(1.9rem,4vw,2.75rem)] font-bold leading-none text-primary">
              {s.n}
            </span>
            <span className="mx-auto mt-2.5 block max-w-[22ch] text-xs leading-relaxed text-muted-foreground">
              {s.k}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  </section>
);
