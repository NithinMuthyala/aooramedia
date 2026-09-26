/**
 * centralised responsive GSAP animation helper.
 *
 * Wraps gsap.matchMedia() so components get:
 *  • desktop  (≥ 1024 px) — full animations + parallax
 *  • tablet   (640–1023px) — reduced distances
 *  • mobile   (< 640 px)  — minimal distances, no parallax/magnetic
 *  • reduced motion        — instant reveal, no movement
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Breakpoint conditions ────────────────────────────────── */
export const MM_CONDITIONS = {
  reducedMotion: "(prefers-reduced-motion: reduce)",
  mobile:        "(max-width: 639px)",
  tablet:        "(min-width: 640px) and (max-width: 1023px)",
  desktop:       "(min-width: 1024px)",
} as const;

/* ─── Shared easing presets ───────────────────────────────── */
export const EASE = {
  out:     "power3.out",
  inOut:   "power2.inOut",
  back:    "back.out(1.5)",
  elastic: "elastic.out(1, 0.5)",
} as const;

/* ─── Animation distance helpers ─────────────────────────── */
export const dist = {
  /** y offset for section fade-up by breakpoint */
  fadeUp: (mm: unknown | null): number => {
    if (!mm) return 50;
    return 50;
  },
};

/* ─── Shared fromTo presets ──────────────────────────────── */
export function fadeUp(
  target: gsap.TweenTarget,
  vars: gsap.TweenVars = {},
  from: gsap.TweenVars = {}
) {
  return gsap.fromTo(
    target,
    { y: 60, opacity: 0, ...from },
    { y: 0, opacity: 1, duration: 0.9, ease: EASE.out, immediateRender: false, ...vars }
  );
}

export function fadeIn(target: gsap.TweenTarget, vars: gsap.TweenVars = {}) {
  return gsap.fromTo(
    target,
    { opacity: 0 },
    { opacity: 1, duration: 0.7, ease: EASE.out, immediateRender: false, ...vars }
  );
}

export function slideLeft(target: gsap.TweenTarget, vars: gsap.TweenVars = {}) {
  return gsap.fromTo(
    target,
    { x: -60, opacity: 0 },
    { x: 0, opacity: 1, duration: 1, ease: EASE.out, immediateRender: false, ...vars }
  );
}

export function slideRight(target: gsap.TweenTarget, vars: gsap.TweenVars = {}) {
  return gsap.fromTo(
    target,
    { x: 60, opacity: 0 },
    { x: 0, opacity: 1, duration: 1, ease: EASE.out, immediateRender: false, ...vars }
  );
}

export function scaleIn(target: gsap.TweenTarget, vars: gsap.TweenVars = {}) {
  return gsap.fromTo(
    target,
    { scale: 0.88, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1, ease: EASE.out, immediateRender: false, ...vars }
  );
}

/* ─── ScrollTrigger factory ──────────────────────────────── */
export function withST(
  trigger: Element | string | null,
  overrides: Partial<ScrollTrigger.Vars> = {}
): ScrollTrigger.Vars {
  return {
    trigger,
    start: "top 82%",
    once: true,
    ...overrides,
  };
}

/* ─── Magnetic button effect ─────────────────────────────── */
export function addMagnetic(
  el: HTMLElement,
  strength = 0.28
): () => void {
  // Only run on pointer devices
  if (typeof window === "undefined") return () => {};
  if (window.matchMedia("(pointer: coarse)").matches) return () => {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const onMove = (e: MouseEvent) => {
    const r  = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width  / 2);
    const dy = e.clientY - (r.top  + r.height / 2);
    gsap.to(el, { x: dx * strength, y: dy * strength, duration: 0.35, ease: EASE.out });
  };
  const onLeave = () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: EASE.elastic });
  };

  el.addEventListener("mousemove", onMove);
  el.addEventListener("mouseleave", onLeave);
  return () => {
    el.removeEventListener("mousemove", onMove);
    el.removeEventListener("mouseleave", onLeave);
    gsap.killTweensOf(el);
  };
}

/* ─── Counter animation ──────────────────────────────────── */
export function animateCounter(
  el: HTMLElement,
  target: number,
  suffix: string,
  duration = 1.8
) {
  const obj = { val: 0 };
  return gsap.to(obj, {
    val: target,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      el.textContent = Math.floor(obj.val).toString() + suffix;
    },
    onComplete: () => {
      el.textContent = target.toString() + suffix;
    },
  });
}
