"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import services from "@/data/service.json";

gsap.registerPlugin(ScrollTrigger);

const serviceIcons: Record<string, string> = {
  "web-development":        "◈",
  "mobile-app-development": "◉",
  "digital-marketing":      "◇",
  "cyber-security":         "⛊",
  "software-testing":       "✔",
  "ai-ml-solutions":        "⬡",
  "ui-ux-design":           "◆",
  "devops-cloud":           "▲",
  "data-analytics":         "📈",
  "erp-solutions":          "⚙",
};

interface ServiceDetailProps {
  service: any;
}

export default function ServiceDetail({
  service,
}: ServiceDetailProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const otherServices = services.filter((s) => s.slug !== service.slug);
  const icon = serviceIcons[service.slug] ?? "◈";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".detail-hero-content",
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".detail-hero-visual",
        {
          y: 70,
          opacity: 0,
          scale: 0.9,
          rotate: 4,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1.2,
          delay: 0.15,
          ease: "power3.out",
        }
      );

      gsap.utils
        .toArray<HTMLElement>(".detail-section")
        .forEach((section) => {
          gsap.fromTo(
            section,
            {
              y: 50,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                once: true,
              },
            }
          );
        });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="min-h-screen overflow-hidden bg-[#F8FAFC]"
    >
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative min-h-[90vh] overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#38BDF8]/15 blur-[140px]" />
          <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-[#7C3AED]/10 blur-[150px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto flex max-w-7xl items-center px-6 lg:px-8">
          <div className="grid w-full items-center gap-16 lg:grid-cols-2">

            {/* LEFT */}
            <div className="detail-hero-content">
              {/* Back link */}
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#1F2937]/60 transition-colors hover:text-[#7C3AED]"
              >
                ← Back to All Services
              </Link>

              <div className="mt-8 flex items-center gap-4">
                <span className="text-sm font-bold tracking-[0.2em] text-[#7C3AED]">
                  {service.number}
                </span>
                <div className="h-px w-16 bg-gradient-to-r from-[#38BDF8] to-[#7C3AED]" />
                <span className="text-xs uppercase tracking-[0.2em] text-[#1F2937]/40">
                  Our Service
                </span>
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[0.98] tracking-[-0.045em] text-[#1F2937] sm:text-5xl md:text-6xl lg:text-7xl">
                {service.title}
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-[#1F2937]/65 md:text-lg md:leading-8">
                {service.longDescription || service.shortDescription || service.description}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="shimmer-btn relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-[#1F2937] px-7 py-4 text-sm font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#7C3AED] hover:shadow-purple-500/25"
                >
                  Start a Project with Us
                  <span>→</span>
                </Link>

                <a
                  href="#approach"
                  className="rounded-xl border border-[#C0C7D1]/60 bg-white/70 px-7 py-4 text-sm font-semibold text-[#1F2937] shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#38BDF8]"
                >
                  Our Approach
                  <span className="ml-1 text-xs">↓</span>
                </a>
              </div>
            </div>

            {/* RIGHT VISUAL */}
            <div className="detail-hero-visual">
              <div style={{
    backgroundImage: `url(${service.image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }} className="relative mx-auto aspect-square max-w-lg overflow-hidden rounded-[3rem] border border-white/80 bg-white/60 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-2xl">
                <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#38BDF8]/20 blur-[100px]" />
                <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#7C3AED]/20 blur-[100px]" />

         

     
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          ABOUT THE SERVICE
      ===================================================== */}
      <section className="detail-section border-t border-[#C0C7D1]/30 bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7C3AED]">
                About the Service
              </span>
              <h2 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-[#1F2937] md:text-5xl">
                Engineered for real business impact.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-8 text-[#1F2937]/75 md:text-xl md:leading-9">
                {service.longDescription || service.description}
              </p>

              {service.shortDescription && (
                <p className="mt-6 text-base leading-7 text-[#1F2937]/55">
                  {service.shortDescription}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          HIGHLIGHTS / WHAT WE DELIVER
      ===================================================== */}
      {service.highlights && service.highlights.length > 0 && (
        <section className="detail-section bg-[#F8FAFC] py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7C3AED]">
                Key Deliverables
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-[#1F2937] md:text-5xl">
                What we build and deliver.
              </h2>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.highlights.map((highlight: string, index: number) => (
                <motion.div
                  key={highlight}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="rounded-3xl border border-[#C0C7D1]/40 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-xl"
                >
                  <span className="text-sm font-bold text-[#7C3AED]">
                    0{index + 1}
                  </span>
                  <h3 className="mt-4 font-semibold text-lg text-[#1F2937]">
                    {highlight}
                  </h3>
                  <div className="mt-5 h-1 w-8 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#7C3AED]" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          APPROACH
      ===================================================== */}
      {service.approach?.length > 0 && (
        <section id="approach" className="detail-section bg-white py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7C3AED]">
                  How We Approach It
                </span>
                <h2 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-[#1F2937] md:text-5xl">
                  A structured, proven method.
                </h2>
              </div>

              <div className="space-y-4">
                {service.approach.map((item: any, index: number) => (
                  <div
                    key={item.title}
                    className="group rounded-3xl border border-[#C0C7D1]/40 bg-[#F8FAFC]/70 p-6 transition-all duration-300 hover:bg-white hover:shadow-xl md:p-8"
                  >
                    <div className="flex gap-6">
                      <span className="text-sm font-bold text-[#7C3AED]">
                        0{index + 1}
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-[#1F2937]">
                          {item.title}
                        </h3>
                        <p className="mt-3 leading-7 text-[#1F2937]/60">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          PROCESS
      ===================================================== */}
      {service.process?.length > 0 && (
        <section className="detail-section bg-[#F8FAFC] py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7C3AED]">
                Delivery Roadmap
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-[#1F2937] md:text-5xl">
                From discovery to deployment.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#1F2937]/60">
                A clear step-by-step workflow designed to deliver high velocity and high quality.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {service.process.map((step: any, index: number) => (
                <div
                  key={step.step || index}
                  className="relative rounded-3xl border border-[#C0C7D1]/40 bg-white p-7 shadow-sm"
                >
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#38BDF8] to-[#7C3AED] text-sm font-bold text-white shadow-md">
                    {step.step || `0${index + 1}`}
                  </div>
                  <h3 className="mt-5 font-bold text-lg text-[#1F2937]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#1F2937]/55">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          OTHER SERVICES
      ===================================================== */}
      <section className="detail-section bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7C3AED]">
                More Capabilities
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#1F2937] md:text-5xl">
                Explore our other services.
              </h2>
            </div>
            <Link
              href="/services"
              className="text-sm font-semibold text-[#7C3AED] hover:underline"
            >
              View all services →
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.slice(0, 6).map((other) => (
              <Link
                key={other.id}
                href={`/services/${other.slug}`}
                className="group rounded-3xl border border-[#C0C7D1]/40 bg-[#F8FAFC] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#7C3AED]">
                    {other.number}
                  </span>
                  <span className="text-lg text-[#1F2937]/40 group-hover:text-[#7C3AED] transition-colors">
                    {serviceIcons[other.slug] ?? "◈"}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-[#1F2937] group-hover:text-[#7C3AED] transition-colors">
                  {other.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#1F2937]/55 line-clamp-2">
                  {other.shortDescription || other.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#7C3AED]">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <section
        id="contact"
        className="detail-section relative overflow-hidden bg-[#0F172A] py-24 md:py-32"
      >
        <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#38BDF8]/20 blur-[140px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#7C3AED]/25 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#38BDF8]">
            Let&apos;s Work Together
          </span>

          <h2 className="mt-5 text-4xl font-bold tracking-[-0.04em] text-white md:text-6xl">
            Ready to start your {service.title} project?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/60 md:text-lg">
            Tell us about your project goals, timeline, and requirements and let&apos;s build a custom solution.
          </p>

          <Link
            href="/contact"
            className="shimmer-btn relative mt-9 inline-flex items-center gap-3 overflow-hidden rounded-xl bg-white px-7 py-4 text-sm font-semibold text-[#1F2937] transition-all hover:-translate-y-1 hover:bg-[#38BDF8] hover:text-white hover:shadow-xl hover:shadow-[#38BDF8]/20"
          >
            Start a Conversation
            <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}