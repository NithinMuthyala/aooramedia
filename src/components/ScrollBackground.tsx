"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollBackground
 * ────────────────
 * Renders a fixed full-screen canvas of blob glows that dynamically
 * respond to the user's scroll position using GSAP ScrollTrigger scrub.
 *
 * Blobs shift in colour, scale, and position as the page scrolls,
 * creating a live, interactive ambient lighting effect behind all content.
 *
 * Place this ONCE in layout.tsx (before {children}).
 */
export default function ScrollBackground() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bgRef.current) return;

    /* ── Blob refs ───────────────────────────── */
    const blobA = bgRef.current.querySelector<HTMLDivElement>(".sb-blob-a");
    const blobB = bgRef.current.querySelector<HTMLDivElement>(".sb-blob-b");
    const blobC = bgRef.current.querySelector<HTMLDivElement>(".sb-blob-c");
    const blobD = bgRef.current.querySelector<HTMLDivElement>(".sb-blob-d");
    const grid  = bgRef.current.querySelector<HTMLDivElement>(".sb-grid");

    /* ── ctx ─────────────────────────────────── */
    const ctx = gsap.context(() => {

      /* Blob A — blue, top-left  — moves right+down on scroll */
      gsap.to(blobA, {
        x: "25vw",
        y: "20vh",
        scale: 1.4,
        opacity: 0.18,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
      });

      /* Blob B — purple, bottom-right — moves left+up on scroll */
      gsap.to(blobB, {
        x: "-22vw",
        y: "-18vh",
        scale: 1.3,
        opacity: 0.16,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 2.5,
        },
      });

      /* Blob C — blue, centre — pulses in opacity */
      gsap.to(blobC, {
        scale: 1.6,
        opacity: 0.07,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 3,
        },
      });

      /* Blob D — purple accent, right-mid — drifts diagonally */
      gsap.to(blobD, {
        x: "-30vw",
        y: "-25vh",
        scale: 1.2,
        opacity: 0.14,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.8,
        },
      });

      /* Grid opacity fades in then back out */
      gsap.to(grid, {
        opacity: 0.045,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "40% bottom",
          scrub: 1,
        },
      });

      /* Mouse-parallax layer — subtle blob nudge following cursor */
      const handleMouseMove = (e: MouseEvent) => {
        const nx = (e.clientX / window.innerWidth  - 0.5) * 2; // -1 to 1
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;

        gsap.to(blobA, { x: `+=${nx * 18}`, y: `+=${ny * 12}`, duration: 1.8, ease: "power2.out", overwrite: "auto" });
        gsap.to(blobB, { x: `+=${nx * -14}`, y: `+=${ny * -10}`, duration: 2.2, ease: "power2.out", overwrite: "auto" });
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={bgRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Blob A — blue, top-left */}
      <div
        className="sb-blob-a absolute -left-[15vw] -top-[15vh] h-[55vw] w-[55vw] max-h-[700px] max-w-[700px] rounded-full opacity-[0.10]"
        style={{
          background: "radial-gradient(circle, #38BDF8 0%, #7C3AED 60%, transparent 80%)",
          filter: "blur(120px)",
          willChange: "transform, opacity",
        }}
      />

      {/* Blob B — purple, bottom-right */}
      <div
        className="sb-blob-b absolute -bottom-[15vh] -right-[15vw] h-[60vw] w-[60vw] max-h-[750px] max-w-[750px] rounded-full opacity-[0.09]"
        style={{
          background: "radial-gradient(circle, #7C3AED 0%, #38BDF8 60%, transparent 80%)",
          filter: "blur(140px)",
          willChange: "transform, opacity",
        }}
      />

      {/* Blob C — centre */}
      <div
        className="sb-blob-c absolute left-1/2 top-1/2 h-[40vw] w-[40vw] max-h-[500px] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, #38BDF8 0%, transparent 70%)",
          filter: "blur(100px)",
          willChange: "transform, opacity",
        }}
      />

      {/* Blob D — purple right-mid */}
      <div
        className="sb-blob-d absolute right-[5vw] top-[35vh] h-[35vw] w-[35vw] max-h-[450px] max-w-[450px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)",
          filter: "blur(110px)",
          willChange: "transform, opacity",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="sb-grid absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(56,189,248,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}
