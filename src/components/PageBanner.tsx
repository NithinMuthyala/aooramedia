"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageBannerProps {
  /** Small eyebrow tag above heading  */
  tag?: string;
  /** Main h1 heading — can include a <span> part that renders in gradient */
  heading: string;
  /** Part of the heading to render as gradient-coloured text */
  headingAccent?: string;
  /** Sub-text below the heading */
  description?: string;
  /** Breadcrumb trail shown above tag */
  breadcrumbs?: BreadcrumbItem[];
  /** Optional CTA button */
  cta?: { label: string; href: string };
  /** Optional secondary link */
  secondaryLink?: { label: string; href: string };
  /** Left glow color override (default blue) */
  glowLeft?: string;
  /** Right glow color override (default purple) */
  glowRight?: string;
  /** Show the scroll indicator at bottom */
  showScroll?: boolean;
}

export default function PageBanner({
  tag,
  heading,
  headingAccent,
  description,
  breadcrumbs,
  cta,
  secondaryLink,
  glowLeft  = "#38BDF8",
  glowRight = "#7C3AED",
  showScroll = true,
}: PageBannerProps) {
  const bannerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (bannerRef.current?.querySelector(".pb-breadcrumb")) {
        tl.fromTo(".pb-breadcrumb", { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 });
      }
      if (bannerRef.current?.querySelector(".pb-tag")) {
        tl.fromTo(".pb-tag", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.25");
      }
      if (bannerRef.current?.querySelector(".pb-heading")) {
        tl.fromTo(".pb-heading", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85 }, "-=0.2");
      }
      if (bannerRef.current?.querySelector(".pb-desc")) {
        tl.fromTo(".pb-desc", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.4");
      }
      if (bannerRef.current?.querySelector(".pb-cta")) {
        tl.fromTo(".pb-cta", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, "-=0.4");
      }

      /* Floating glows */
      gsap.to(".pb-glow-left", {
        y: -20, x: 10, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
      gsap.to(".pb-glow-right", {
        y: 20, x: -15, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1,
      });

      /* Scroll-parallax on banner content */
      gsap.to(".pb-inner", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={bannerRef}
      className="relative overflow-hidden bg-[#F8FAFC] pt-32 pb-20 md:pt-40 md:pb-28"
    >
      {/* ── Background grid ─────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(31,41,55,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(31,41,55,1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Glow blobs ──────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="pb-glow-left absolute -left-48 -top-48 h-[600px] w-[600px] rounded-full blur-[150px]"
          style={{ background: `${glowLeft}18` }}
        />
        <div
          className="pb-glow-right absolute -bottom-32 -right-48 h-[500px] w-[500px] rounded-full blur-[140px]"
          style={{ background: `${glowRight}12` }}
        />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#38BDF8]/4 blur-[100px]" />
      </div>

      {/* ── Decorative orbital rings ─────────────── */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full border border-[#38BDF8]/8 animate-spin-slow" />
        <div className="absolute h-[700px] w-[700px] rounded-full border border-dashed border-[#7C3AED]/6 animate-spin-slow-reverse" />
      </div>

      {/* ── Main content ────────────────────────── */}
      <div className="pb-inner relative z-10 mx-auto max-w-7xl px-6 lg:px-8">

        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="pb-breadcrumb mb-8 flex items-center gap-2 text-xs text-[#1F2937]/45">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-[#C0C7D1]">/</span>}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="font-medium transition-colors hover:text-[#7C3AED]"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-[#1F2937]/70">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Tag pill */}
        {tag && (
          <div className="pb-tag mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#C0C7D1]/60 bg-white/65 px-5 py-2.5 shadow-sm backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-75 animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-[#38BDF8]" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1F2937]/60">
              {tag}
            </span>
          </div>
        )}

        {/* Heading */}
        <h1 className="pb-heading max-w-5xl text-[clamp(2.6rem,5.5vw,5rem)] font-bold leading-[0.93] tracking-[-0.045em] text-[#1F2937]">
          {heading}
          {headingAccent && (
            <>
              {" "}
              <span className="text-gradient">{headingAccent}</span>
            </>
          )}
        </h1>

        {/* Description */}
        {description && (
          <p className="pb-desc mt-7 max-w-2xl text-base leading-7 text-[#1F2937]/60 md:text-lg md:leading-8">
            {description}
          </p>
        )}

        {/* CTAs */}
        {(cta || secondaryLink) && (
          <div className="mt-9 flex flex-wrap items-center gap-4">
            {cta && (
              <Link
                href={cta.href}
                className="pb-cta shimmer-btn relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-[#1F2937] px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-slate-900/15 transition-colors duration-300 hover:bg-[#7C3AED] hover:shadow-purple-500/20"
              >
                {cta.label}
                <span>→</span>
              </Link>
            )}
            {secondaryLink && (
              <Link
                href={secondaryLink.href}
                className="pb-cta inline-flex items-center gap-2 text-sm font-medium text-[#1F2937]/60 transition-colors hover:text-[#7C3AED]"
              >
                {secondaryLink.label}
                <span className="text-xs">↓</span>
              </Link>
            )}
          </div>
        )}
      </div>

      {/* ── Scroll indicator ────────────────────── */}
      {showScroll && (
        <div className="absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
          <div className="animate-bounce-y h-12 w-px bg-gradient-to-b from-transparent via-[#C0C7D1] to-[#38BDF8]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#1F2937]/35">
            Scroll
          </span>
        </div>
      )}
    </section>
  );
}
