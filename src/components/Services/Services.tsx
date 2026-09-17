"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

import services from "@/data/service.json";

gsap.registerPlugin(ScrollTrigger);

/* Service icons map */
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

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const serviceItems = gsap.utils.toArray<HTMLElement>(".service-item");

      serviceItems.forEach((item) => {
        const text   = item.querySelector(".service-text");
        const image  = item.querySelector(".service-image");
        const number = item.querySelector(".service-number");
        const line   = item.querySelector(".service-line");

        /* Text reveal */
        if (text) {
          gsap.fromTo(
            text,
            { y: 70, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 1, ease: "power3.out",
              scrollTrigger: { trigger: item, start: "top 82%", end: "top 50%", scrub: 0.8 },
            }
          );
        }

        /* Image reveal + parallax */
        if (image) {
          gsap.fromTo(
            image,
            { y: 80, opacity: 0, scale: 0.92 },
            {
              y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out",
              scrollTrigger: { trigger: item, start: "top 85%", end: "top 45%", scrub: 0.8 },
            }
          );
          gsap.to(image, {
            yPercent: -7, ease: "none",
            scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: 1 },
          });
        }

        /* Number */
        if (number) {
          gsap.fromTo(
            number,
            { x: -30, opacity: 0 },
            {
              x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
              scrollTrigger: { trigger: item, start: "top 80%", once: true },
            }
          );
        }

        /* Accent line */
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1, duration: 0.8, ease: "power3.out",
              scrollTrigger: { trigger: item, start: "top 78%", once: true },
            }
          );
        }
      });

      /* Section heading */
      gsap.fromTo(
        ".services-heading",
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        }
      );

      /* CTA */
      gsap.fromTo(
        ".services-cta",
        { y: 70, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".services-cta", start: "top 85%", once: true },
        }
      );
    }, section);

    return () => { ctx.revert(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden bg-[#F8FAFC]"
    >
      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-200px] top-[5%] h-[500px] w-[500px] rounded-full bg-[#38BDF8]/10 blur-[140px]" />
        <div className="absolute right-[-200px] top-[35%] h-[600px] w-[600px] rounded-full bg-[#7C3AED]/10 blur-[160px]" />
        <div className="absolute bottom-[-200px] left-[20%] h-[500px] w-[500px] rounded-full bg-[#38BDF8]/5 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8 md:py-32">

        {/* ===================================================
            HEADER
        =================================================== */}
        <div className="services-heading mx-auto max-w-4xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7C3AED]">
            Our Services
          </span>

          <h2 className="mt-5 text-4xl font-bold tracking-[-0.045em] text-[#1F2937] sm:text-5xl md:text-6xl lg:text-7xl">
            Technology that moves
            <span className="block text-gradient">
              your business forward.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#1F2937]/60 md:text-lg md:leading-8">
            From strategy and design to development, security,
            optimization and AI, we build digital solutions
            designed around your business goals.
          </p>
        </div>

        {/* ===================================================
            SERVICES LIST
        =================================================== */}
        <div className="mt-20 md:mt-28">
          {services.map((service, index) => {
            const reversed = index % 2 !== 0;
            const icon = serviceIcons[service.slug] ?? "◈";

            return (
              <article
                key={service.id}
                className="service-item relative border-t border-[#C0C7D1]/40 py-20 md:py-28"
              >
                <div
                  className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                    reversed ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* TEXT */}
                  <div className="service-text">
                    {/* Number + label */}
                    <div className="flex items-center gap-4">
                      <span className="service-number text-sm font-bold tracking-[0.2em] text-[#7C3AED]">
                        {service.number}
                      </span>
                      <div className="service-line h-px w-16 origin-left bg-gradient-to-r from-[#38BDF8] to-[#7C3AED]" />
                      <span className="text-xs uppercase tracking-[0.15em] text-[#1F2937]/30">
                        Service
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-7 max-w-xl text-4xl font-bold leading-[0.95] tracking-[-0.045em] text-[#1F2937] sm:text-5xl md:text-6xl">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-7 max-w-xl text-base leading-7 text-[#1F2937]/60 md:text-lg md:leading-8">
                      {service.description}
                    </p>

                    {/* Highlight chips — motion hover */}
                    <div className="mt-7 flex max-w-xl flex-wrap gap-2">
                      {service.highlights.slice(0, 5).map((highlight) => (
                        <motion.span
                          key={highlight}
                          whileHover={{ scale: 1.06, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          className="cursor-default rounded-full border border-[#C0C7D1]/50 bg-white/70 px-3 py-1.5 text-xs font-medium text-[#1F2937]/60 backdrop-blur-xl transition-colors hover:border-[#38BDF8]/40 hover:bg-white hover:text-[#7C3AED]"
                        >
                          {highlight}
                        </motion.span>
                      ))}
                    </div>

                    {/* CTA Link */}
                    <div className="mt-9">
                      <Link
                        href={`/services/${service.slug}`}
                        className="shimmer-btn group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-[#1F2937] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7C3AED] hover:shadow-[#7C3AED]/20"
                      >
                        Explore Service
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>

                  {/* IMAGE PANEL */}
                  <div className="service-image" >
                    <div style={{
    backgroundImage: `url(${service.image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }} className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/80 bg-white/60 shadow-2xl shadow-slate-900/10 backdrop-blur-2xl">

                      {/* Glow blobs */}
                      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#38BDF8]/20 blur-[100px] transition-transform duration-700 group-hover:scale-125" />
                      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#7C3AED]/20 blur-[100px] transition-transform duration-700 group-hover:scale-125" />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ===================================================
            FINAL CTA BANNER
        =================================================== */}
        <div className="services-cta relative mt-16 overflow-hidden rounded-[2rem] border border-[#C0C7D1]/40 bg-white/70 shadow-xl shadow-slate-900/5 backdrop-blur-xl md:mt-20">

          {/* CTA Glows */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#38BDF8]/15 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#7C3AED]/15 blur-[100px]" />

          <div className="relative z-10 grid items-center gap-8 p-8 md:grid-cols-[1fr_auto] md:p-14">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7C3AED]">
                Let&apos;s build together
              </span>

              <h3 className="mt-4 max-w-2xl text-3xl font-bold tracking-[-0.04em] text-[#1F2937] md:text-5xl">
                Have a project in mind?
              </h3>

              <p className="mt-4 max-w-xl text-base leading-7 text-[#1F2937]/60 md:text-lg">
                Let&apos;s turn your idea into a digital experience
                that creates real business impact.
              </p>

              {/* Mini stat row */}
              <div className="mt-8 flex flex-wrap gap-6">
                {[
                  { label: "Projects", value: "50+" },
                  { label: "Clients",  value: "20+" },
                  { label: "Uptime",   value: "99%" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold tracking-[-0.03em] text-gradient">{s.value}</p>
                    <p className="text-xs text-[#1F2937]/45 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="#contact"
              className="shimmer-btn group relative inline-flex w-fit items-center gap-3 overflow-hidden rounded-xl bg-[#1F2937] px-7 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#7C3AED] hover:shadow-[#7C3AED]/20"
            >
              Start a Conversation
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}