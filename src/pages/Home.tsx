import { About } from "@/components/About";
import { Cta } from "@/components/Cta";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Services } from "@/components/Services";
import { StatementBand } from "@/components/StatementBand";
import { Statistics } from "@/components/Statistics";
import { Team } from "@/components/Team";
import { Testimonials } from "@/components/Testimonials";

/**
 * / — mockup C ("The Statement") from content/home-redesign-mockups/.
 *
 * The home page is centred, full-bleed and typographic, while the interior
 * pages stay left-aligned and container-bound. That is a deliberate split,
 * not drift: berkeleycarroll.org draws exactly the same line on its own
 * site, and the reason holds here — an interior page opens with a
 * breadcrumb and a sticky sub-nav slab, and a home page has neither to make
 * room for.
 *
 * The two devices C introduced — two-tone display headings and full-bleed
 * statement bands — are now shared components (DisplayHeading,
 * StatementBand) used across the site, so the home page is the fullest
 * expression of the language rather than an exception to it.
 *
 * Two sections mockup C did not draw are kept anyway, restyled to its
 * language rather than deleted: Mission (the six scriptural values are
 * central to a Christian school's front page) and the FAQ (five real
 * answers, and the only admissions entry point above the footer). Their
 * absence from the mockup was a gap in a focused sketch, not a decision.
 *
 * Component filenames are inherited from the original template and no
 * longer describe what they render — About is Mission, HowItWorks is
 * Academics, Services is Student Life, Testimonials is Stories from Kagina.
 * Left alone deliberately: renaming eight files across an active branch
 * buys nothing this change needs.
 */
const Home = () => (
  <>
    <Hero />
    <Statistics />
    <StatementBand
      eyebrow="This is a school built on"
      lead="Faith. Character."
      pop="Academic excellence."
      body="Founded in 2011 with four classrooms and 181 students, on a hillside the village cleared by hand. Fourteen years on, Crimson Academy still admits the children of the families who built it."
    />
    <About />
    <HowItWorks />
    <Services />
    <Cta />
    <Testimonials />
    <Team />
    <FAQ />
  </>
);

export default Home;
