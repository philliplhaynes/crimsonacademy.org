import { About } from "@/components/About";
import { Cta } from "@/components/Cta";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Services } from "@/components/Services";
import { Team } from "@/components/Team";
import { Testimonials } from "@/components/Testimonials";

/**
 * / — mockup B ("Editorial Front Door") from content/home-redesign-mockups/,
 * rebuilt on the design language the rest of the site converged on.
 *
 * Two sections are gone rather than restyled, and the components with them:
 *   • Statistics — the four proof points now sit inside Hero, the way the
 *     About page's dossier cover carries its own fact strip.
 *   • Features ("Five pillars") — merged into HowItWorks, which was making
 *     the adjacent claim one section earlier with its own header and grid.
 *
 * The component filenames are inherited from the original template (About,
 * HowItWorks, Services, Testimonials) and no longer describe what they
 * render — they are Mission, How We Teach, Student Life, and Stories from
 * Kagina respectively. Left as-is deliberately: renaming eight files across
 * an active branch buys nothing this change needs.
 */
const Home = () => (
  <>
    <Hero />
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
