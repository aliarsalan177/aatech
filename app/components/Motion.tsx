"use client";

import { useEffect } from "react";

/**
 * Lightweight, dependency-free page motion:
 *  - Scroll-reveal: elements with `.reveal` fade/slide in when they enter view.
 *  - Count-up: `.stat__value[data-count]` animates 0 → target on first view.
 *  - Header shadow: adds `.header--scrolled` once the page is scrolled.
 * Respects `prefers-reduced-motion`.
 */
export function Motion() {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // ---- Reveal on scroll ----
    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal")
    );

    if (reduce) {
      reveals.forEach((el) => el.classList.add("is-in"));
    } else {
      const io = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
      );
      reveals.forEach((el) => io.observe(el));

      // ---- Count-up numbers (supports prefix, suffix, decimals, commas) ----
      const counters = Array.from(
        document.querySelectorAll<HTMLElement>("[data-count]")
      );
      const countIO = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            obs.unobserve(el);
            const target = Number(el.dataset.count || "0");
            const prefix = el.dataset.prefix || "";
            const suffix = el.dataset.suffix || "";
            const decimals = Number(el.dataset.decimals || "0");
            const duration = 1500;
            let startTs = 0;
            const render = (n: number) =>
              prefix +
              n.toLocaleString("en-US", {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
              }) +
              suffix;
            const tick = (ts: number) => {
              if (!startTs) startTs = ts;
              const p = Math.min((ts - startTs) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              el.textContent = render(target * eased);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach((el) => countIO.observe(el));
    }

    // ---- Header shadow on scroll ----
    const header = document.querySelector(".header");
    const onScroll = () => {
      if (!header) return;
      header.classList.toggle("header--scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
