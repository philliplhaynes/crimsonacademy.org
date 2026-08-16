import { PageHero } from "@/components/PageHero";
import { SchoolHistory } from "@/components/SchoolHistory";
import { findSection } from "@/nav";

/**
 * Split out of About.tsx: the history timeline is ~1.7MB of photos across 8
 * chapters, and someone visiting /about for Leadership or Contact shouldn't
 * have to load it. Uses the same "About" nav section as About.tsx (not a
 * section of its own) so the sub-nav pills stay the family's shared set —
 * PageHero's sub-nav resolves cross-page links via <Link>, so jumping from
 * here to "Leadership & Staff" navigates to /about#leadership correctly.
 */
const AboutHistory = () => {
  const section = findSection("/about")!;
  return (
    <>
      <PageHero
        section={section}
        title="From one visit to a full campus."
        lede="Crimson Academy did not start with a building. It started with a visit, and with parents in a Rwandan village asking for something their children could not otherwise get."
      />
      <SchoolHistory />
    </>
  );
};

export default AboutHistory;
