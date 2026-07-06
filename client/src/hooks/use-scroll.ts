"use client";

import { useEffect, useRef, useState } from "react";

export type ScrollDirection = "up" | "down";

/**
 * Tracks the window scroll position and direction, throttled to one update per
 * animation frame. A small delta threshold avoids direction flicker from tiny
 * sub-pixel scrolls (e.g. momentum settling on mobile).
 */
export function useScroll() {
  const [y, setY] = useState(0);
  const [direction, setDirection] = useState<ScrollDirection>("up");
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      const currentY = window.scrollY;
      if (Math.abs(currentY - lastY.current) > 4) {
        setDirection(currentY > lastY.current ? "down" : "up");
        lastY.current = currentY;
      }
      setY(currentY);
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        window.requestAnimationFrame(update);
      }
    };

    lastY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    // Initialise via the rAF path so we never call setState synchronously in
    // the effect body (picks up the position if the page loads pre-scrolled).
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { y, direction };
}
