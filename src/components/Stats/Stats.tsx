"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: 50,
    suffix: "+",
    label: "Projects Delivered",
    description: "Digital products built for modern businesses",
    icon: "◈",
  },
  {
    value: 20,
    suffix: "+",
    label: "Happy Clients",
    description: "Businesses growing with our solutions",
    icon: "◆",
  },
  {
    value: 5,
    suffix: "+",
    label: "Years Experience",
    description: "Experience across modern technologies",
    icon: "◉",
  },
  {
    value: 99,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Focused on quality and long-term partnerships",
    icon: "⬡",
  },
];

const marqueeItems = [
  "Next.js", "React", "TypeScript", "Node.js", "Python",
  "AWS", "Firebase", "PostgreSQL", "Figma", "Tailwind",
  "GSAP", "Framer Motion", "Three.js", "GraphQL", "Docker",
  "Next.js", "React", "TypeScript", "Node.js", "Python",
  "AWS", "Firebase", "PostgreSQL", "Figma", "Tailwind",
  "GSAP", "Framer Motion", "Three.js", "GraphQL", "Docker",
];

export default function Stats() {
  const sectionRef  = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(
        ".stats-heading",
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );

      gsap.fromTo(
        ".stat-card",
        { y: 70, opacity: 0, scale: 0.92 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.9, stagger: 0.13, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );

      counterRefs.current.forEach((element, index) => {
        if (!element) return;
        const target = stats[index].value;
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.8,
          delay: 0.2 + index * 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 85%", once: true },
          onUpdate: () => {
            if (element) element.textContent = Math.floor(counter.value).toString();
          },
          onComplete: () => {
            if (element) element.textContent = target.toString();
          },
        });
      });

      gsap.to(".marquee-inner", {
        xPercent: -50,
        duration: 28,
        repeat: -1,
        ease: "none",
      });

    }, sectionRef);

    return () => { ctx.revert(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #3D0008 0%, #72000F 28%, #A90016 50%, #72000F 72%, #3D0008 100%)" }}
    >
      {/* =============================================
          BACKGROUND EFFECTS — deep red palette
      ============================================= */}
      <div className="pointer-events-none absolute inset-0">
        {/* Deep red glow — left */}
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#A90016]/25 blur-[150px]" />
        {/* Gold glow — bottom-right */}
        <div className="absolute -bottom-20 right-0 h-[450px] w-[450px] rounded-full bg-[#F5B800]/10 blur-[140px]" />
        {/* Subtle red grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(232,178,51,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(232,178,51,1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* =============================================
          MARQUEE TICKER — top
      ============================================= */}
      <div className="relative overflow-hidden border-b border-white/6 py-4">
        <div className="marquee-inner flex gap-10 whitespace-nowrap" style={{ width: "200%" }}>
          {marqueeItems.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/25"
            >
              <span className="h-1 w-1 rounded-full bg-[#F5B800]/50" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* =============================================
          MAIN CONTENT
      ============================================= */}
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 md:py-32">

        {/* HEADING */}
        <div className="stats-heading mx-auto max-w-2xl text-center">
          {/* Gold eyebrow */}
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F5B800]">
            Our Impact
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
            Turning ideas into
            <span className="block text-gradient">
              digital experiences.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/50">
            We combine technology, design, and strategy to create digital
            solutions that help businesses move forward.
          </p>
        </div>

        {/* STATS GRID */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="stat-card group relative overflow-hidden rounded-3xl border border-[#A90016]/30 bg-[#A90016]/10 p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#F5B800]/30 hover:bg-[#A90016]/18 hover:shadow-2xl hover:shadow-[#A90016]/20"
            >
              {/* Hover glow overlay — red to gold tint */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#A90016]/0 to-[#F5B800]/0 opacity-0 transition-opacity duration-500 group-hover:from-[#A90016]/12 group-hover:to-[#F5B800]/6 group-hover:opacity-100" />

              {/* Top right icon */}
              <div className="absolute right-6 top-6 text-2xl text-white/10 transition-all duration-500 group-hover:scale-110 group-hover:text-[#F5B800]/35">
                {stat.icon}
              </div>

              {/* NUMBER */}
              <div className="relative flex items-baseline gap-1">
                <span
                  ref={(el) => { counterRefs.current[index] = el; }}
                  className="stat-number text-5xl font-bold tracking-[-0.04em] text-white md:text-6xl"
                >
                  0
                </span>
                {/* Gold suffix */}
                <span className="text-2xl font-bold text-[#F5B800]">
                  {stat.suffix}
                </span>
              </div>

              {/* Divider — red to gold */}
              <div className="mt-6 h-px w-full bg-gradient-to-r from-[#A90016]/40 via-[#F5B800]/20 to-transparent" />

              {/* Label */}
              <h3 className="mt-5 text-base font-semibold text-white/90">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm leading-6 text-white/40">
                {stat.description}
              </p>

              {/* Animated accent bar — red to gold */}
              <div className="mt-6 h-[3px] w-8 rounded-full bg-gradient-to-r from-[#A90016] to-[#F5B800] transition-all duration-500 group-hover:w-16" />
            </div>
          ))}
        </div>

      </div>

      {/* =============================================
          MARQUEE TICKER — bottom
      ============================================= */}
      <div className="relative overflow-hidden border-t border-white/6 py-4">
        <div className="marquee-inner flex gap-10 whitespace-nowrap" style={{ width: "200%" }}>
          {[...marqueeItems].reverse().map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/20"
            >
              <span className="h-1 w-1 rounded-full bg-[#A90016]/60" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}