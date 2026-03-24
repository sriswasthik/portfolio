import { useEffect, useState } from "react";

function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const addHover = () => setHover(true);
    const removeHover = () => setHover(false);

    window.addEventListener("mousemove", moveCursor);

    // detect hover on clickable elements
    const elements = document.querySelectorAll("button, li, a");

    elements.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        width: hover ? "16px" : "8px",
        height: hover ? "16px" : "8px",
        backgroundColor: "#00adb5",
        opacity: 0.6,
        borderRadius: "50%",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        transition: "width 0.2s ease, height 0.2s ease",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.7)",
        zIndex: 9999,
      }}
    />
  );
}

export default Cursor;