"use client";

import { useEffect } from "react";

// Splits every text node under `root` into one <span class="tw-char"> per
// non-space character (spaces stay as plain text so wrapping still works
// naturally), tagging each with --i so CSS can stagger their reveal delay.
// Recurses through element children (br, em, etc.) so inline formatting
// inside a title survives — only the text content gets split. Each word's
// characters are grouped inside an inline-block "tw-word-wrap" — without
// it, adjacent inline-block char spans are individually breakable, so the
// browser would happily wrap mid-word instead of only at real spaces.
function splitChars(root: Node, counter: { i: number }) {
  if (root.nodeType === Node.TEXT_NODE) {
    const text = root.textContent ?? "";
    const frag = document.createDocumentFragment();
    const words = text.split(/( +)/);
    words.forEach((word) => {
      if (word === "") return;
      if (/^ +$/.test(word)) {
        frag.appendChild(document.createTextNode(word));
        return;
      }
      const wordWrap = document.createElement("span");
      wordWrap.className = "tw-word-wrap";
      for (const ch of word) {
        const span = document.createElement("span");
        span.className = "tw-char";
        span.style.setProperty("--i", String(counter.i++));
        span.textContent = ch;
        wordWrap.appendChild(span);
      }
      frag.appendChild(wordWrap);
    });
    root.parentNode?.replaceChild(frag, root);
    return;
  }
  if (root.nodeType === Node.ELEMENT_NODE) {
    Array.from(root.childNodes).forEach((child) => splitChars(child, counter));
  }
}

// Same idea, but the atomic unit is a whole word — used for longer copy
// (paragraphs) where a per-letter stagger would take too long to resolve.
function splitWords(root: Node, counter: { i: number }) {
  if (root.nodeType === Node.TEXT_NODE) {
    const text = root.textContent ?? "";
    const frag = document.createDocumentFragment();
    const parts = text.split(/( +)/);
    parts.forEach((part) => {
      if (part === "") return;
      if (/^ +$/.test(part)) {
        frag.appendChild(document.createTextNode(part));
        return;
      }
      const span = document.createElement("span");
      span.className = "tw-word";
      span.style.setProperty("--i", String(counter.i++));
      span.textContent = part;
      frag.appendChild(span);
    });
    root.parentNode?.replaceChild(frag, root);
    return;
  }
  if (root.nodeType === Node.ELEMENT_NODE) {
    Array.from(root.childNodes).forEach((child) => splitWords(child, counter));
  }
}

/**
 * Typewriter-style reveal for titles ("typewriter", per-character) and
 * short copy ("typewriter-words", per-word). Unlike the one-shot .reveal
 * fade, this replays every time the element crosses into view — scrolling
 * back up re-triggers it too, matching useHoverTitles' mechanic.
 *
 * Splitting is detected via presence of .tw-char/.tw-word children rather
 * than a one-time marker, so passing a `watch` value (e.g. the current
 * locale) that changes the underlying copy makes the effect re-split the
 * fresh text React just wrote in place of our spans, instead of silently
 * losing the effect after a language toggle.
 */
export function useTypewriterReveal(watch?: unknown) {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const charEls = Array.from(document.querySelectorAll<HTMLElement>(".typewriter"));
    const wordEls = Array.from(document.querySelectorAll<HTMLElement>(".typewriter-words"));
    const allEls = [...charEls, ...wordEls];
    if (allEls.length === 0) return;

    if (reducedMotion) return; // leave plain text intact, no split, no motion

    charEls.forEach((el) => {
      if (el.querySelector(".tw-char")) return;
      const counter = { i: 0 };
      Array.from(el.childNodes).forEach((child) => splitChars(child, counter));
    });

    wordEls.forEach((el) => {
      if (el.querySelector(".tw-word")) return;
      const counter = { i: 0 };
      Array.from(el.childNodes).forEach((child) => splitWords(child, counter));
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-typing", entry.isIntersecting);
        });
      },
      { threshold: 0.2 },
    );
    allEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [watch]);
}
