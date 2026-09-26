"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import services from "@/data/service.json";

gsap.registerPlugin(ScrollTrigger);

const ctaWords = ["Let's", "build", "something", "remarkable."];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(
        ".footer-word",
        { y: 60, opacity: 0, rotateX: -25 },
        {
          y: 0, opacity: 1, rotateX: 0,
          duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 85%", once: true },
        }
      );

      gsap.fromTo(
        ".footer-sub",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: footerRef.current, start: "top 85%", once: true },
        }
      );

      gsap.fromTo(
        ".footer-column",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: footerRef.current, start: "top 85%", once: true },
        }
      );

      gsap.fromTo(
        ".footer-link",
        { x: -8, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: footerRef.current, start: "top 80%", once: true },
        }
      );

      gsap.to(".footer-glow", {
        x: 50, y: -20, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut",
      });

      gsap.fromTo(
        ".footer-divider",
        { scaleX: 0, transformOrigin: "center center" },
        {
          scaleX: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 80%", once: true },
        }
      );

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden text-white"
      style={{
        /* Symmetric dark: thick burgundy ends, slightly warmer red centre */
        background: "linear-gradient(180deg, #3D0008 0%, #72000F 30%, #A90016 50%, #72000F 70%, #3D0008 100%)",
      }}
    >
      {/* ── Ambient glows ─────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Left glow blob */}
        <div className="footer-glow absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#A90016]/25 blur-[130px]" />
        {/* Right glow blob */}
        <div className="absolute -bottom-40 -right-40 h-[550px] w-[550px] rounded-full bg-[#F5B800]/10 blur-[140px]" />
        {/* Centre shine */}
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B71C2B]/20 blur-[120px]" />

        {/* Subtle gold grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(245,184,0,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(245,184,0,1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top edge highlight — symmetric glow line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(245,184,0,0.15) 20%, rgba(245,184,0,0.60) 50%, rgba(245,184,0,0.15) 80%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* =============================================
            TOP CTA
        ============================================= */}
        <div className="relative py-20 md:py-28">

          {/* Separator line — uniform symmetric */}
          <div
            className="footer-divider absolute bottom-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(245,184,0,0.12) 20%, rgba(245,184,0,0.50) 50%, rgba(245,184,0,0.12) 80%, transparent 100%)",
            }}
          />

          {/* Giant watermark */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
            aria-hidden="true"
          >
            <span className="text-[clamp(4rem,14vw,16rem)] font-black uppercase tracking-[-0.04em] text-white/[0.03] leading-none text-center">
              VARAHI ADVERTISING
            </span>
          </div>

          <div className="relative z-10 grid items-end gap-10 md:grid-cols-[1fr_auto]">
            <div>
              {/* Gold eyebrow — fully visible */}
              <span className="footer-sub text-xs font-semibold uppercase tracking-[0.25em] text-[#F5B800]">
                Have a project?
              </span>

              {/* Word-by-word heading — white */}
              <h2 className="perspective-1000 mt-5 max-w-4xl text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                {ctaWords.map((word, i) => (
                  <span
                    key={i}
                    className={`footer-word mr-4 inline-block ${
                      word === "remarkable." ? "text-[#F5B800]" : "text-white"
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </h2>

              <p className="footer-sub mt-6 max-w-xl text-sm leading-7 text-white/75 md:text-base">
                From ideas to scalable digital products, we help businesses
                create technology that makes an impact.
              </p>
            </div>

            {/* Gold CTA button */}
            <Link
              href="/contact"
              className="footer-sub shimmer-btn group relative inline-flex w-fit items-center gap-4 overflow-hidden rounded-xl bg-[#F5B800] px-6 py-4 text-sm font-bold text-[#72000F] transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFD040] hover:shadow-xl hover:shadow-[#F5B800]/25"
            >
              Start a Project
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* =============================================
            MAIN FOOTER COLUMNS
        ============================================= */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1.2fr_1fr]">

          {/* Brand */}
          <div className="footer-column">
            <Link href="/" className="inline-flex items-center gap-1.5">
              <Image
                src="/assets/varahi_logo.PNG"
                alt="Varahi Advertising logo"
                width={72}
                height={72}
                className="h-[72px] w-[72px] flex-shrink-0 rounded-xl object-contain"
              />
              <span className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-widest text-white">
                  VARAHI
                </span>
                <span className="text-[11px] font-semibold tracking-[0.22em] text-[#F5B800] mt-0.5">
                  ADVERTISING
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/80">
              We design and develop modern digital experiences that help
              businesses grow, connect with customers, and move faster.
            </p>

            {/* Social icons */}
            <div className="mt-7 flex gap-3">
              {[
                { label: "LinkedIn", abbr: "in" },
                { label: "Instagram", abbr: "ig" },
                { label: "GitHub", abbr: "gh" },
                { label: "Twitter", abbr: "tw" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/8 text-xs font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#F5B800]/50 hover:bg-[#F5B800]/15 hover:text-[#F5B800]"
                >
                  {social.abbr}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-column">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F5B800]/80">
              Navigation
            </h3>
            <ul className="mt-6 space-y-3">
              {[
                { label: "Home",     href: "/" },
                { label: "About",    href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Projects", href: "/projects" },
                { label: "Contact",  href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="footer-link group flex items-center gap-2 text-sm text-white transition-all duration-300 hover:text-[#F5B800]"
                  >
                    <span className="h-px w-0 bg-[#F5B800] transition-all duration-300 group-hover:w-4" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-column">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F5B800]/80">
              Services
            </h3>
            <ul className="mt-6 space-y-2.5">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="footer-link group flex items-center gap-2 text-sm text-white transition-all duration-300 hover:text-[#F5B800]"
                  >
                    <span className="h-px w-0 bg-[#F5B800] transition-all duration-300 group-hover:w-4" />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F5B800]/80">
              Contact
            </h3>
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-xs text-white/50">Email</p>
                <a
                  href="mailto:hello@varahiadvertising.com"
                  className="footer-link mt-1 block text-sm text-[#F5B800] font-semibold transition-colors hover:text-white"
                >
                  hello@varahiadvertising.com
                </a>
              </div>
              <div>
                <p className="text-xs text-white/50">Phone</p>
                <a
                  href="tel:+919876543210"
                  className="footer-link mt-1 block text-sm text-white transition-colors hover:text-[#F5B800]"
                >
                  +91 98765 43210
                </a>
              </div>
              <div>
                <p className="text-xs text-white/50">Location</p>
                <p className="mt-1 text-sm text-white">India</p>
              </div>

              {/* Status badge */}
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#F5B800]/25 bg-[#F5B800]/8 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-white">Open to new projects</span>
              </div>
            </div>
          </div>
        </div>

        {/* =============================================
            BOTTOM BAR
        ============================================= */}

        {/* Uniform symmetric divider */}
        <div
          className="footer-divider h-px w-full"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(245,184,0,0.12) 20%, rgba(245,184,0,0.55) 50%, rgba(245,184,0,0.12) 80%, transparent 100%)",
          }}
        />

        <div className="flex flex-col gap-5 py-7 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/70">
            © {currentYear} Varahi Advertising. All rights reserved. Built with ❤️ in India.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy_policy" className="text-xs text-white/70 transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms_and_conditions" className="text-xs text-white/70 transition-colors hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}