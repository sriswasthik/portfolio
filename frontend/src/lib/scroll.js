export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Scrolls to a section and moves focus to it, so keyboard and screen reader
// users continue from the section they navigated to.
export function scrollToId(id, { smooth = true } = {}) {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({
    behavior: smooth && !prefersReducedMotion() ? "smooth" : "auto",
    block: "start",
  });
  el.focus({ preventScroll: true });
}
