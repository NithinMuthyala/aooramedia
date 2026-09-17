"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only run on non-touch devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Fast quickTo for dot
    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });

    // Smooth spring quickTo for trailing ring
    const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power2.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power2.out" });

    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);

      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        "a, button, input, textarea, select, [role='button'], .stat-card, .service-item, .project-card"
      );

      if (interactive && !isHovering) {
        isHovering = true;
        gsap.to(dot, { scale: 2.2, duration: 0.25, ease: "power2.out" });
        gsap.to(ring, {
          scale: 1.6,
          borderColor: "rgba(124, 58, 237, 0.7)",
          backgroundColor: "rgba(56, 189, 248, 0.08)",
          duration: 0.3,
          ease: "power2.out",
        });
      } else if (!interactive && isHovering) {
        isHovering = false;
        gsap.to(dot, { scale: 1, duration: 0.25, ease: "power2.out" });
        gsap.to(ring, {
          scale: 1,
          borderColor: "rgba(56, 189, 248, 0.5)",
          backgroundColor: "transparent",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [visible]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
      aria-hidden="true"
    >
      {/* Center glowing dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#7C3AED] shadow-[0_0_12px_rgba(56,189,248,0.8)]"
      />

      {/* Outer fluid trailing ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#38BDF8]/50 backdrop-blur-[1px] transition-[border-color,background-color] duration-200"
      />
    </div>
  );
}
