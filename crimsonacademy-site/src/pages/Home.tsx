import { About } from "@/components/About";
import { Cta } from "@/components/Cta";
import { FAQ } from "@/components/FAQ";
import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Services } from "@/components/Services";
import { Statistics } from "@/components/Statistics";
import { Team } from "@/components/Team";
import { Testimonials } from "@/components/Testimonials";

const Home = () => (
  <>
    <Hero />
    <Statistics />
    <About />
    <HowItWorks />
    <Features />
    <Services />
    <Cta />
    <Testimonials />
    <Team />
    <FAQ />
  </>
);

export default Home;
