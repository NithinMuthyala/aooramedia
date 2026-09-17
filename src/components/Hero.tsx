"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

gsap.registerPlugin(ScrollTrigger);

/* Lazy-load StackCard so it doesn't block SSR */
const StackCard = dynamic(() => import("./StackCard"), { ssr: false });

export default function Hero() {
  const heroRef    = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const descRef    = useRef<HTMLParagraphElement>(null);
  const buttonRef  = useRef<HTMLAnchorElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);
  const spotRef    = useRef<HTMLDivElement>(null);
  const visualRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ------------------------------------------------
         CURSOR SPOTLIGHT
      ------------------------------------------------ */
      const xTo = gsap.quickTo(spotRef.current, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(spotRef.current, "y", { duration: 0.6, ease: "power3.out" });

      const onMouseMove = (e: MouseEvent) => {
        const rect = heroRef.current?.getBoundingClientRect();
        if (!rect) return;
        xTo(e.clientX - rect.left - 200);
        yTo(e.clientY - rect.top  - 200);
      };

      heroRef.current?.addEventListener("mousemove", onMouseMove);

      /* ------------------------------------------------
         BADGE
      ------------------------------------------------ */
      gsap.fromTo(
        badgeRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 0.2, ease: "power3.out" }
      );

      /* ------------------------------------------------
         TITLE TYPEWRITER
      ------------------------------------------------ */
      const titleLines = titleRef.current?.querySelectorAll(".hero-title-line");
      let currentDelay = 0;

      titleLines?.forEach((line) => {
        const text = line.textContent?.trim() ?? "";
        line.innerHTML = "";

        [...text].forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char === " " ? "\u00A0" : char;
          span.style.opacity = "0";
          span.style.display = "inline-block";
          line.appendChild(span);

          gsap.to(span, {
            opacity: 1,
            duration: 0.035,
            delay: currentDelay,
            ease: "none",
          });

          currentDelay += 0.045;
        });

        currentDelay += 0.12;
      });

      /* ------------------------------------------------
         DESCRIPTION
      ------------------------------------------------ */
      gsap.fromTo(
        descRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: currentDelay + 0.2, ease: "power3.out" }
      );

      /* ------------------------------------------------
         BUTTON — with magnetic hover
      ------------------------------------------------ */
      gsap.fromTo(
        buttonRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: currentDelay + 0.4, ease: "power3.out" }
      );

      /* Magnetic hover on CTA button */
      const btn = buttonRef.current;
      if (btn) {
        const onBtnMove = (e: MouseEvent) => {
          const r = btn.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width  / 2);
          const dy = e.clientY - (r.top  + r.height / 2);
          gsap.to(btn, { x: dx * 0.3, y: dy * 0.3, duration: 0.4, ease: "power2.out" });
        };
        const onBtnLeave = () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
        };
        btn.addEventListener("mousemove", onBtnMove);
        btn.addEventListener("mouseleave", onBtnLeave);
      }

      /* ------------------------------------------------
         RIGHT VISUAL ENTRANCE
      ------------------------------------------------ */
      gsap.fromTo(
        visualRef.current,
        { scale: 0.82, opacity: 0, rotate: -6 },
        { scale: 1, opacity: 1, rotate: 0, duration: 1.3, delay: 0.35, ease: "power3.out" }
      );

      /* ------------------------------------------------
         SCROLL PARALLAX
      ------------------------------------------------ */
      gsap.to(visualRef.current, {
        yPercent: -15,
        rotate: 3,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".hero-content", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* ------------------------------------------------
         ORBITAL RINGS — continuous spin
      ------------------------------------------------ */
      gsap.to(".orbital-1", { rotation: 360, duration: 22, repeat: -1, ease: "none" });
      gsap.to(".orbital-2", { rotation: -360, duration: 16, repeat: -1, ease: "none" });

      return () => {
        heroRef.current?.removeEventListener("mousemove", onMouseMove);
      };
    }, heroRef);

    return () => { ctx.revert(); };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-[#F8FAFC]"
    >
      {/* =========================================
          CURSOR SPOTLIGHT
      ========================================== */}
      <div
        ref={spotRef}
        className="pointer-events-none absolute z-0 h-[400px] w-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.12) 0%, rgba(124,58,237,0.06) 50%, transparent 75%)",
          filter: "blur(40px)",
          willChange: "transform",
        }}
      />

      {/* =========================================
          BACKGROUND GLOWS
      ========================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Blue glow top-left */}
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#38BDF8]/12 blur-[130px] animate-pulse-glow" />

        {/* Purple glow bottom-right */}
        <div className="absolute -bottom-40 -right-40 h-[700px] w-[700px] rounded-full bg-[#7C3AED]/10 blur-[150px] animate-pulse-glow-purple" />

        {/* Center faint glow */}
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#38BDF8]/5 blur-[100px]" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(31,41,55,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(31,41,55,1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* =========================================
          HERO CONTENT
      ========================================== */}
      <div className="hero-content relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-16 pt-32 lg:px-8">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">

          {/* =====================================
              LEFT CONTENT
          ====================================== */}
          <div className="max-w-3xl">

            {/* Badge */}
            <div
              ref={badgeRef}
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#C0C7D1]/60 bg-white/65 px-5 py-2.5 shadow-sm backdrop-blur-xl"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#38BDF8]" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1F2937]/60">
                Digital Solutions
              </span>
            </div>

            {/* Title */}
            <h1
              ref={titleRef}
              className="max-w-4xl text-[clamp(3rem,5.8vw,5.5rem)] font-bold leading-[0.92] tracking-[-0.045em] text-[#1F2937]"
            >
              <span className="hero-title-line block whitespace-nowrap">
                WE BUILD DIGITAL
              </span>
              <span className="hero-title-line block whitespace-nowrap text-gradient">
                EXPERIENCES
              </span>
            </h1>

            {/* Accent bar */}
            <div className="mt-7 h-[3px] w-24 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#7C3AED] shimmer-btn relative overflow-hidden" />

            {/* Description */}
            <p
              ref={descRef}
              className="mt-7 max-w-xl text-base leading-7 text-[#1F2937]/65 md:text-lg md:leading-8"
            >
              We design and develop modern digital experiences that help
              businesses grow, connect with their customers, and move faster.
            </p>

            {/* CTA + secondary link */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                ref={buttonRef}
                href="/contact"
                className="shimmer-btn relative inline-flex items-center gap-3 rounded-xl bg-[#1F2937] px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-slate-900/15 transition-colors duration-300 hover:bg-[#7C3AED] hover:shadow-purple-500/25 overflow-hidden"
              >
                Book Now
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#1F2937]/60 transition-colors duration-300 hover:text-[#7C3AED]"
              >
                View Services
                <span className="text-xs">↓</span>
              </Link>
            </div>

            {/* Social proof strip */}
            <div className="mt-10 flex items-center gap-5">
              {/* Avatar stack */}
              <div className="flex -space-x-2">
                {["#38BDF8", "#7C3AED", "#1F2937", "#38BDF8"].map((color, i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-white"
                    style={{ background: `linear-gradient(135deg, ${color}cc, ${color}55)` }}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-3 w-3 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-0.5 text-xs text-[#1F2937]/50">
                  Trusted by <span className="font-semibold text-[#1F2937]">20+</span> businesses
                </p>
              </div>
            </div>
          </div>

          {/* =====================================
              RIGHT — STACK CARD + ORBITAL RINGS
          ====================================== */}
          <div
            ref={visualRef}
            className="relative mx-auto flex h-[480px] w-full max-w-lg items-start justify-center pt-10"
          >
            {/* Orbital decorative rings */}
            <div className="orbital-1 orbital-ring pointer-events-none absolute h-[380px] w-[380px] opacity-40" />
            <div className="orbital-2 orbital-ring pointer-events-none absolute h-[460px] w-[460px] border-dashed opacity-20" />

            {/* Glow blobs */}
            <div className="pointer-events-none absolute h-[260px] w-[260px] rounded-full bg-[#38BDF8]/20 blur-[90px]" />
            <div className="pointer-events-none absolute right-4 top-0 h-[200px] w-[200px] rounded-full bg-[#7C3AED]/20 blur-[80px]" />

            {/* STACK CARD */}
            <div className="relative z-10 w-full">
              <StackCard />
            </div>

            {/* Floating micro-badge — bottom left */}
            <div className="animate-float-delayed absolute bottom-6 left-2 z-20 rounded-2xl border border-white/80 bg-white/75 px-4 py-3 shadow-xl backdrop-blur-2xl">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-[#1F2937]">Available for work</span>
              </div>
            </div>

            {/* Floating micro-badge — top right */}
            <div className="animate-float-slow absolute right-0 top-2 z-20 rounded-2xl border border-white/80 bg-white/75 px-4 py-3 shadow-xl backdrop-blur-2xl">
              <p className="text-[10px] text-[#1F2937]/45">Est. response</p>
              <p className="mt-0.5 text-xs font-bold text-[#1F2937]">{"< 24 hours"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          SCROLL INDICATOR
      ========================================== */}
      <div className="absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <div className="animate-bounce-y h-12 w-px bg-gradient-to-b from-transparent via-[#C0C7D1] to-[#38BDF8]" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#1F2937]/40">
          Scroll
        </span>
      </div>
    </section>
  );
}