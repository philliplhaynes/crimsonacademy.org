import { LegalPageHeader } from "@/components/LegalPageHeader";

/**
 * /non-discrimination-policy — linked from the footer's bottom bar.
 *
 * Scope and structure follow the genre berkeleycarroll.org/non-discrimination-
 * policy represents (a short statement naming protected characteristics and
 * the school activities it covers) — the wording itself is written fresh for
 * Crimson Academy, not copied. The closing paragraph states something this
 * site already says elsewhere and isn't inventing here: the Admissions FAQ
 * has long answered "Is the school only for Christian families?" with "No
 * ... families of all backgrounds are welcome and enrolled." This page
 * formalizes that same fact as policy rather than restating it as new.
 */
const NonDiscriminationPolicy = () => {
  return (
    <>
      <LegalPageHeader title="Non-Discrimination Policy" />

      <div className="container py-14">
        <div className="mx-auto max-w-3xl space-y-5 leading-relaxed text-muted-foreground">
          <p>
            Crimson Academy of Kagina does not discriminate on the basis of race, color, sex,
            national or ethnic origin, disability, or any other characteristic protected under
            applicable law, in the administration of its admissions policies, financial aid and
            sponsorship programs, educational policies, hiring and employment practices, or any
            other school-administered program.
          </p>
          <p>
            This policy applies equally to prospective and current students, families, staff,
            and volunteers, and to every level of the school — nursery through Primary 6.
          </p>
          <p>
            Crimson Academy is a Christian school, and its values are rooted in scripture. That
            character shapes how the school teaches and how it treats every person in its
            community — it is not a basis for turning any family away. Families of all
            backgrounds are welcomed and enrolled.
          </p>
          <p>
            Anyone with a concern about how this policy is applied is encouraged to contact the
            school directly at{" "}
            <a
              href="mailto:info@crimsonacademy.org"
              className="font-medium text-primary underline underline-offset-4"
            >
              info@crimsonacademy.org
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default NonDiscriminationPolicy;
