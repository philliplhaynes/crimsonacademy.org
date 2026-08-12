import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { prefersReducedMotion } from "./lib/motion";
import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const AboutHistory = lazy(() => import("./pages/AboutHistory"));
const Academics = lazy(() => import("./pages/Academics"));
const StudentLife = lazy(() => import("./pages/StudentLife"));
const Admissions = lazy(() => import("./pages/Admissions"));
const News = lazy(() => import("./pages/News"));
const CrimsonForLife = lazy(() => import("./pages/CrimsonForLife"));
const Portal = lazy(() => import("./pages/Portal"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const NonDiscriminationPolicy = lazy(() => import("./pages/NonDiscriminationPolicy"));
const SiteMap = lazy(() => import("./pages/SiteMap"));
const NotFound = lazy(() => import("./pages/NotFound"));

/**
 * /support was the giving page until it became /crimson-for-life. Plain
 * <Navigate> would drop the fragment, so the hash is carried across by hand —
 * old links like /support#sponsor are in circulation and still have to land on
 * the right section.
 */
const SupportRedirect = () => {
  const { hash } = useLocation();
  return <Navigate to={`/crimson-for-life${hash}`} replace />;
};

const RouteEffects = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    // The target lives inside a lazy-loaded route, so it may not exist yet on
    // first paint. Keep looking across a few frames before giving up.
    let frames = 0;
    let raf = 0;
    const findAndScroll = () => {
      const el = document.getElementById(hash.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
        return;
      }
      if (frames++ < 60) raf = requestAnimationFrame(findAndScroll);
    };
    raf = requestAnimationFrame(findAndScroll);
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);

  return null;
};

const PageFallback = () => (
  <div className="container py-32 text-center text-muted-foreground">Loading…</div>
);

function App() {
  return (
    <BrowserRouter>
      <RouteEffects />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/history" element={<AboutHistory />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/student-life" element={<StudentLife />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/news" element={<News />} />
            <Route path="/crimson-for-life" element={<CrimsonForLife />} />
            <Route path="/support" element={<SupportRedirect />} />
            <Route path="/portal" element={<Portal />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/non-discrimination-policy" element={<NonDiscriminationPolicy />} />
            <Route path="/site-map" element={<SiteMap />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
    </BrowserRouter>
  );
}

export default App;
