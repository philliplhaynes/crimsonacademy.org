import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
const Support = lazy(() => import("./pages/Support"));
const Portal = lazy(() => import("./pages/Portal"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
            <Route path="/support" element={<Support />} />
            <Route path="/portal" element={<Portal />} />
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
