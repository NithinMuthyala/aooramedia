"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";
import services from "@/data/service.json";

gsap.registerPlugin(ScrollTrigger);

const serviceIcons: Record<string, string> = {
  "web-development":          "◈",
  "mobile-app-development":   "◉",
  "digital-marketing":        "◇",
  "cyber-security":           "⛊",
  "software-testing":         "✔",
  "ai-ml-solutions":          "⬡",
  "ui-ux-design":             "◆",
  "devops-cloud":             "▲",
  "data-analytics":           "📈",
  "erp-solutions":            "⚙",
  "ads-linkedin-google-meta": "◎",
  "ai-ads":                   "✦",
  "product-shoot":            "⬤",
  "personal-branding":        "◐",
};

/* Red-palette accent per card index — all shades of the brand red */
const accentColors = [
  "#A90016",
  "#B71C2B",
  "#72000F",
  "#B71C2B",
  "#A90016",
  "#B71C2B",
  "#72000F",
  "#B71C2B",
  "#A90016",
  "#B71C2B",
  "#72000F",
  "#B71C2B",
  "#A90016",
  "#B71C2B",
];

const STACK = [
  { scale: 1,    y: 0,  opacity: 1,    zIndex: 4, rotateZ: 0 },
  { scale: 0.93, y: 16, opacity: 0.7,  zIndex: 3, rotateZ: -1.2 },
  { scale: 0.86, y: 30, opacity: 0.4,  zIndex: 2, rotateZ: 0.8 },
  { scale: 0.79, y: 42, opacity: 0.18, zIndex: 1, rotateZ: -0.5 },
];

export default function ServicesStackScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const serviceList = services;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const sticky = stickyRef.current;
      if (!sticky) return;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${serviceList.length * window.innerHeight * 0.75}`,
        pin: sticky,
        scrub: false,
        onUpdate(self) {
          const idx = Math.min(
            Math.floor(self.progress * serviceList.length),
            serviceList.length - 1
          );
          setActiveIndex(idx);
        },
      });
    }, section);

    return () => ctx.revert();
  }, [serviceList.length]);

  const deck = Array.from({ length: Math.min(4, serviceList.length) }, (_, i) =>
    serviceList[(activeIndex + i) % serviceList.length]
  );

  const currentService = serviceList[activeIndex];
  const currentAccent  = accentColors[activeIndex % accentColors.length];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-[#FDF8EF]"
      style={{ minHeight: `${serviceList.length * 75 + 100}vh` }}
    >
      {/* Ambient glows — deep red palette */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-200px] top-[5%] h-[500px] w-[500px] rounded-full bg-[#A90016]/8 blur-[140px]" />
        <div className="absolute right-[-200px] top-[35%] h-[600px] w-[600px] rounded-full bg-[#F5B800]/10 blur-[160px]" />
        <div className="absolute left-[30%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-[#A90016]/6 blur-[120px]" />
      </div>

      {/* ── Sticky panel ─────────────────────── */}
      <div
        ref={stickyRef}
        className="sticky top-0 z-10 flex h-screen w-full items-center"
      >
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">

          {/* LEFT — text changes with activeIndex */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -25, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {/* Number + label + count badge */}
                <div className="flex items-center gap-3">
                  {/* Gold number */}
                  <span className="text-sm font-bold tracking-[0.2em] text-[#F5B800]">
                    {currentService.number}
                  </span>
                  {/* Red-to-gold line */}
                  <div className="h-px w-12 bg-gradient-to-r from-[#A90016] to-[#F5B800]" />
                  <span className="text-xs uppercase tracking-[0.15em] text-[#1D1D1F]/40">
                    Service {activeIndex + 1} of {serviceList.length}
                  </span>
                </div>

                {/* Title */}
                <h2 className="mt-5 text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-[#1D1D1F] sm:text-5xl md:text-6xl">
                  {currentService.title}
                </h2>

                {/* Description */}
                <p className="mt-5 max-w-lg text-base leading-7 text-[#1D1D1F]/65 md:text-lg md:leading-8">
                  {currentService.description || currentService.shortDescription}
                </p>

                {/* Highlights */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {currentService.highlights?.slice(0, 4).map((h) => (
                    <span
                      key={h}
                      className="rounded-full border border-[#A90016]/20 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-[#1D1D1F]/70 shadow-sm backdrop-blur-xl transition-colors hover:border-[#A90016]/40 hover:text-[#A90016]"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* CTAs — deep red primary button */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/services/${currentService.slug}`}
                    className="shimmer-btn relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-[#A90016] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#A90016]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#72000F] hover:shadow-[#A90016]/35"
                  >
                    Explore {currentService.title}
                    <span>→</span>
                  </Link>

                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#1D1D1F]/60 transition-colors hover:text-[#A90016]"
                  >
                    View All {serviceList.length} Services
                    <span className="text-xs">↗</span>
                  </Link>
                </div>

                {/* Progress dots — active = red-to-gold gradient */}
                <div className="mt-9 flex items-center gap-1.5">
                  {serviceList.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Go to service ${i + 1}`}
                      onClick={() => setActiveIndex(i)}
                      className="group p-1"
                    >
                      <span
                        className="block h-1.5 rounded-full transition-all duration-300"
                        style={{
                          width: i === activeIndex ? 28 : 7,
                          background: i === activeIndex
                            ? "linear-gradient(to right, #A90016, #F5B800)"
                            : "rgba(142,27,27,0.20)",
                        }}
                      />
                    </button>
                  ))}
                </div>

                {/* Scroll hint */}
                <p className="mt-3 text-[11px] text-[#1D1D1F]/35 uppercase tracking-[0.2em]">
                  Scroll to view all {serviceList.length} services or click dots
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT — Stack cards */}
          <div className="relative flex h-[400px] items-start justify-center perspective-1000">

            {/* Orbital decorative ring — red tint */}
            <div className="pointer-events-none absolute h-[380px] w-[380px] rounded-full border border-[#A90016]/12 animate-spin-slow" />

            <AnimatePresence mode="popLayout">
              {deck.map((service, i) => {
                const s    = STACK[i];
                const icon = serviceIcons[service.slug] ?? "◈";
                const sIdx = services.findIndex(sv => sv.id === service.id);
                const accent = accentColors[sIdx >= 0 ? sIdx % accentColors.length : 0];
                const isTop  = i === 0;

                return (
                  <motion.div
                    key={service.id}
                    layout
                    animate={{
                      scale: s.scale,
                      y: s.y,
                      opacity: s.opacity,
                      rotateZ: s.rotateZ,
                      zIndex: s.zIndex,
                    }}
                    transition={{ type: "spring", stiffness: 220, damping: 28 }}
                    style={{ position: "absolute", width: "100%", top: 0 }}
                  >
                    <Link
                      href={`/services/${service.slug}`}
                      className="group block relative overflow-hidden rounded-[2rem] border border-[#A90016]/18 bg-white/85 p-7 shadow-2xl shadow-[#A90016]/10 backdrop-blur-2xl transition-all duration-300 hover:border-[#A90016]/35"
                    >
                      {/* Bg tint — red shade */}
                      <div
                        className="absolute inset-0 opacity-25 transition-opacity duration-300 group-hover:opacity-45"
                        style={{
                          background: `linear-gradient(135deg, ${accent}18 0%, transparent 70%)`,
                        }}
                      />

                      {/* Glow blob */}
                      <div
                        className="absolute -right-8 -top-8 h-28 w-28 rounded-full blur-[50px]"
                        style={{ background: accent, opacity: 0.15 }}
                      />

                      <div className="relative z-10">
                        {/* Top row */}
                        <div className="flex items-center justify-between">
                          <div
                            className="flex h-12 w-12 items-center justify-center rounded-2xl text-xl shadow-sm"
                            style={{
                              background: `${accent}15`,
                              border: `1px solid ${accent}25`,
                              color: accent,
                            }}
                          >
                            {icon}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold tracking-[0.2em]" style={{ color: accent }}>
                              {service.number}
                            </span>
                            {isTop && (
                              <span className="rounded-full bg-[#A90016]/10 px-2 py-0.5 text-[10px] font-semibold text-[#A90016]">
                                Active
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="mt-5 text-2xl font-bold tracking-[-0.03em] text-[#1D1D1F] transition-colors group-hover:text-[#A90016]">
                          {service.title}
                        </h3>

                        {/* Short desc */}
                        <p className="mt-2 text-sm leading-6 text-[#1D1D1F]/60 line-clamp-2">
                          {service.shortDescription ?? service.description}
                        </p>

                        {/* Divider — red to gold */}
                        <div className="mt-5 h-px bg-gradient-to-r from-transparent via-[#F5B800]/45 to-transparent" />

                        {/* Bottom row */}
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex flex-wrap gap-1.5">
                            {service.highlights?.slice(0, 3).map((h) => (
                              <span
                                key={h}
                                className="rounded-full border border-[#A90016]/18 bg-white/60 px-2 py-0.5 text-[10px] font-medium text-[#1D1D1F]/55"
                              >
                                {h}
                              </span>
                            ))}
                          </div>
                          {/* Gold text for "View details" link */}
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#F5B800] transition-transform group-hover:translate-x-1">
                            View details →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
