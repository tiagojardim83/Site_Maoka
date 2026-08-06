"use client";

import { useEffect } from "react";

/**
 * Titles/subtitles turn orange on hover. Touch devices have no hover, so
 * instead each one lights up while it crosses the vertical center of the
 * screen — in either scroll direction — via an IntersectionObserver whose
 * root margin collapses to a 1px line at 50% viewport height. Elements
 * opt in with the "hover-title" class; call this once per page.
 */
export function useHoverTitles() {
  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (canHover) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(".hover-title"));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("hover-title--active", entry.isIntersecting);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}
