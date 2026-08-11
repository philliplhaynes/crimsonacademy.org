/** True when the visitor has asked for reduced motion at the OS level. */
export const prefersReducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Smooth-scrolls to the top, unless the visitor prefers reduced motion. */
export const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
};
