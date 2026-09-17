"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import services from "@/data/service.json";

gsap.registerPlugin(ScrollTrigger);

/* CTA heading words — for word-by-word stagger */
const ctaWords = ["Let's", "build", "something", "remarkable."];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Word-by-word stagger on CTA heading */
      gsap.fromTo(
        ".footer-word",
        { y: 60, opacity: 0, rotateX: -25 },
        {
          y: 0, opacity: 1, rotateX: 0,
          duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      /* Subtitle + CTA button */
      gsap.from(".footer-sub", {
        y: 30, opacity: 0, duration: 0.8, delay: 0.5, ease: "power3.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 80%", once: true },
      });

      /* Columns stagger */
      gsap.from(".footer-column", {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 75%", once: true },
      });

      /* Per-link stagger within each column */
      gsap.from(".footer-link", {
        x: -10, opacity: 0, duration: 0.5, stagger: 0.04, ease: "power3.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 70%", once: true },
      });

      /* Animated glow drift */
      gsap.to(".footer-glow", {
        x: 50, y: -20, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut",
      });

      /* Border separator — grow from center */
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
      className="relative overflow-hidden bg-[#0F172A] text-white"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="footer-glow absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#38BDF8]/10 blur-[140px]" />
        <div className="absolute -bottom-40 -right-40 h-[550px] w-[550px] rounded-full bg-[#7C3AED]/15 blur-[150px]" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#38BDF8]/5 blur-[100px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(56,189,248,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56,189,248,1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* =========================================
            TOP CTA — watermark + word stagger
        ========================================== */}
        <div className="relative border-b border-white/8 py-20 md:py-28">

          {/* Giant watermark — behind content */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
            aria-hidden="true"
          >
            <span
              className="text-[clamp(5rem,18vw,20rem)] font-black uppercase tracking-[-0.04em] text-white/[0.025] leading-none"
            >
              AVIORA
            </span>
          </div>

          <div className="relative z-10 grid items-end gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <span className="footer-sub text-xs font-semibold uppercase tracking-[0.25em] text-[#38BDF8]">
                Have a project?
              </span>

              {/* Word-by-word heading */}
              <h2 className="perspective-1000 mt-5 max-w-4xl text-4xl font-bold tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl">
                {ctaWords.map((word, i) => (
                  <span
                    key={i}
                    className={`footer-word mr-4 inline-block ${
                      word === "remarkable." ? "text-gradient" : ""
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </h2>

              <p className="footer-sub mt-6 max-w-xl text-sm leading-7 text-white/50 md:text-base">
                From ideas to scalable digital products, we help businesses
                create technology that makes an impact.
              </p>
            </div>

            <Link
              href="/contact"
              className="footer-sub shimmer-btn group relative inline-flex w-fit items-center gap-4 overflow-hidden rounded-xl bg-white px-6 py-4 text-sm font-semibold text-[#1F2937] transition-all duration-300 hover:-translate-y-1 hover:bg-[#38BDF8] hover:text-white hover:shadow-xl hover:shadow-[#38BDF8]/20"
            >
              Start a Project
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* =========================================
            MAIN FOOTER COLUMNS
        ========================================== */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1.2fr_1fr]">

          {/* Brand */}
          <div className="footer-column">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#38BDF8] to-[#7C3AED] text-sm font-bold text-white shadow-lg shadow-[#38BDF8]/10">
                A
              </span>
              <span className="text-xl font-bold tracking-tight text-gradient">AVIORA</span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/50">
              We design and develop modern digital experiences that help
              businesses grow, connect with customers, and move faster.
            </p>

            {/* Social icons */}
            <div className="mt-7 flex gap-3">
              {[
                { label: "LinkedIn", abbr: "in", hover: "#38BDF8" },
                { label: "Instagram", abbr: "ig", hover: "#7C3AED" },
                { label: "GitHub", abbr: "gh", hover: "#ffffff" },
                { label: "Twitter", abbr: "tw", hover: "#38BDF8" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-white/50 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  {social.abbr}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-column">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
              Navigation
            </h3>
            <ul className="mt-6 space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Projects", href: "/projects" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="footer-link group flex items-center gap-2 text-sm text-white/55 transition-all duration-300 hover:text-[#38BDF8]"
                  >
                    <span className="h-px w-0 bg-[#38BDF8] transition-all duration-300 group-hover:w-4" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-column">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
              Services
            </h3>
            <ul className="mt-6 space-y-2.5">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="footer-link group flex items-center gap-2 text-sm text-white/55 transition-all duration-300 hover:text-[#38BDF8]"
                  >
                    <span className="h-px w-0 bg-[#38BDF8] transition-all duration-300 group-hover:w-4" />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
              Contact
            </h3>
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-xs text-white/30">Email</p>
                <a
                  href="mailto:hello@aviora.co"
                  className="footer-link mt-1 block text-sm text-white/65 transition-colors hover:text-[#38BDF8]"
                >
                  hello@aviora.co
                </a>
              </div>
              <div>
                <p className="text-xs text-white/30">Phone</p>
                <a
                  href="tel:+919876543210"
                  className="footer-link mt-1 block text-sm text-white/65 transition-colors hover:text-[#38BDF8]"
                >
                  +91 98765 43210
                </a>
              </div>
              <div>
                <p className="text-xs text-white/30">Location</p>
                <p className="mt-1 text-sm text-white/65">India</p>
              </div>

              {/* Status indicator */}
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-white/50">Open to new projects</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            BOTTOM BAR
        ========================================== */}
        <div className="footer-divider h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex flex-col gap-5 py-7 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/30">
            © {currentYear} Aviora. All rights reserved. Built with ❤️ in India.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-white/30 transition-colors hover:text-white/60">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-white/30 transition-colors hover:text-white/60">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}