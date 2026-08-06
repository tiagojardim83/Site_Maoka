"use client";

import { useEffect } from "react";

/**
 * Titles/subtitles light up on hover. Touch devices have no hover, so
 * instead each one activates while it crosses the vertical center of the
 * screen — in either scroll direction — via an IntersectionObserver whose
 * root margin collapses to a 1px line at 50% viewport height. Elements
 * opt in with the "hover-title" class (toggles "hover-title--active") or
 * "hover-interactive" (toggles "hover-interactive--active", for buttons/
 * links that need a different active treatment than a text color swap).
 * Call this once per page.
 */
export function useHoverTitles() {
  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (canHover) return;

    const targets: [string, string][] = [
      [".hover-title", "hover-title--active"],
      [".hover-interactive", "hover-interactive--active"],
    ];
    const entriesToWatch = targets.flatMap(([selector, activeClass]) =>
      Array.from(document.querySelectorAll<HTMLElement>(selector)).map((element) => ({ element, activeClass })),
    );
    if (entriesToWatch.length === 0) return;

    const activeClassByElement = new Map(entriesToWatch.map(({ element, activeClass }) => [element, activeClass]));
    const observer = new IntersectionObserver(
      (observed) => {
        observed.forEach((entry) => {
          const activeClass = activeClassByElement.get(entry.target as HTMLElement);
          if (activeClass) entry.target.classList.toggle(activeClass, entry.isIntersecting);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    entriesToWatch.forEach(({ element }) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}
