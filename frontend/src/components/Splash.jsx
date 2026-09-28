import { useEffect, useState } from "react";

// Shown once per full page load of the home page.
const GREETINGS = [
  "Hello",
  "నమస్కారం",
  "नमस्ते",
  "Hola",
  "Bonjour",
  "Ciao",
  "こんにちは",
  "Hallo",
  "Hello",
];

const FIRST_WORD_MS = 700;
const WORD_MS = 150;
const LAST_WORD_MS = 450;
const EXIT_MS = 700;

function Splash({ onDone }) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const isLast = index === GREETINGS.length - 1;

  // Step through the greetings, then start the exit.
  useEffect(() => {
    if (leaving) return;
    const delay = index === 0 ? FIRST_WORD_MS : isLast ? LAST_WORD_MS : WORD_MS;
    const timer = setTimeout(() => {
      if (isLast) setLeaving(true);
      else setIndex((i) => i + 1);
    }, delay);
    return () => clearTimeout(timer);
  }, [index, isLast, leaving]);

  // Finish after the slide-up (a timer, so it can't get stuck if no transitionend fires).
  useEffect(() => {
    if (!leaving) return;
    const timer = setTimeout(onDone, EXIT_MS);
    return () => clearTimeout(timer);
  }, [leaving, onDone]);

  // Hold the page still while the splash covers it; any click or key skips it.
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const skip = () => setLeaving(true);
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, []);

  return (
    <div
      className={`splash${leaving ? " splash--leaving" : ""}`}
      aria-hidden="true"
    >
      <p className="splash__word" key={index}>
        {GREETINGS[index]}
      </p>
    </div>
  );
}

export default Splash;
