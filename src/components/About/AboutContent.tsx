"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const values = [
  { icon: "◈", title: "Design-First",     desc: "Every decision starts with user experience — not technology." },
  { icon: "◆", title: "Transparent",       desc: "Clear communication, honest timelines, no surprises." },
  { icon: "◉", title: "Quality Code",      desc: "Scalable, maintainable architecture that grows with your business." },
  { icon: "⬡", title: "Results Driven",    desc: "We measure success by your growth — not lines of code." },
  { icon: "◇", title: "Fast Delivery",     desc: "Iterative shipping with weekly milestones, not waterfall." },
  { icon: "▲", title: "Long-term Partner", desc: "We don't disappear after launch. We grow with you." },
];

const team = [
  { name: "Aryan Mehta",   role: "Founder & CEO",      gradient: "from-[#A90016] to-[#F5B800]" },
  { name: "Priya Sharma",  role: "Lead Designer",       gradient: "from-[#F5B800] to-[#A90016]" },
  { name: "Karan Singh",   role: "Full-Stack Engineer", gradient: "from-[#A90016] to-[#A90016]" },
  { name: "Nisha Patel",   role: "Project Manager",     gradient: "from-[#F5B800] to-[#F5B800]" },
];

const timeline = [
  { year: "2019", label: "Founded",           desc: "Started as a freelance web studio with a single client." },
  { year: "2020", label: "First Team",        desc: "Grew to 4 people. Delivered 12 projects in 12 months." },
  { year: "2022", label: "Product Focus",     desc: "Pivoted into full-stack digital products and SaaS builds." },
  { year: "2024", label: "AI Integration",    desc: "Launched AI automation services for enterprise clients." },
  { year: "2026", label: "Today",             desc: "50+ projects delivered, 20+ happy clients across 5 industries." },
];

export default function AboutContent() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".about-section").forEach((section) => {
        gsap.fromTo(
          section,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 82%", once: true },
          }
        );
      });

      gsap.fromTo(".timeline-item",
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, stagger: 0.14, ease: "power3.out",
          scrollTrigger: { trigger: ".timeline-wrap", start: "top 78%", once: true },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-transparent">

      {/* ── VALUES ─────────────────────────────── */}
      <section className="about-section py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F5B800]">
              Our Values
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-[#1D1D1F] sm:text-5xl">
              How we work
            </h2>
            <p className="mt-5 text-base leading-7 text-[#1D1D1F]/60">
              Six principles that shape every project we take on.
            </p>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <motion.div
                key={v.title}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="group relative overflow-hidden rounded-3xl border border-[#A90016]/40 bg-white/65 p-7 shadow-sm backdrop-blur-xl"
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#A90016]/8 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="text-2xl" style={{ color: "#A90016" }}>{v.icon}</span>
                <h3 className="mt-4 text-lg font-bold text-[#1D1D1F]">{v.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#1D1D1F]/55">{v.desc}</p>
                <div className="mt-5 h-[2px] w-8 rounded-full bg-gradient-to-r from-[#A90016] to-[#F5B800] transition-all duration-500 group-hover:w-16" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ───────────────────────────── */}
      <section className="about-section bg-[#72000F] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A90016]">
              Our Journey
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl">
              5 years of building
              <span className="block text-gradient">digital products.</span>
            </h2>
          </div>

          <div className="timeline-wrap relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#A90016] via-[#F5B800] to-transparent md:left-1/2" />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div
                  key={item.year}
                  className={`timeline-item relative flex gap-8 pl-16 md:pl-0 ${
                    i % 2 === 0
                      ? "md:flex-row md:pr-[calc(50%+2rem)]"
                      : "md:flex-row-reverse md:pl-[calc(50%+2rem)]"
                  }`}
                >
                  {/* Dot on the line */}
                  <div className="absolute left-4 top-2 h-4 w-4 rounded-full border-2 border-[#A90016] bg-[#72000F] shadow-[0_0_12px_rgba(56,189,248,0.6)] md:left-1/2 md:-translate-x-1/2" />

                  <div className="glass-card-dark rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl flex-1">
                    <span className="text-xs font-bold tracking-[0.2em] text-[#A90016]">{item.year}</span>
                    <h3 className="mt-2 text-lg font-bold text-white">{item.label}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/50">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ───────────────────────────────── */}
      <section className="about-section py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F5B800]">
              The Team
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-[#1D1D1F] sm:text-5xl">
              People behind the work
            </h2>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <motion.div
                key={member.name}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group text-center"
              >
                {/* Avatar */}
                <div className="relative mx-auto h-24 w-24">
                  <div className={`h-full w-full rounded-[1.5rem] bg-gradient-to-br ${member.gradient} shadow-xl`} />
                  <div className="absolute inset-0 rounded-[1.5rem] border border-white/40" />
                </div>
                <h3 className="mt-5 text-base font-bold text-[#1D1D1F]">{member.name}</h3>
                <p className="mt-1 text-sm text-[#1D1D1F]/50">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────── */}
      <section className="about-section relative overflow-hidden bg-[#72000F] py-24 md:py-32">
        <div className="pointer-events-none absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-[#A90016]/15 blur-[130px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#F5B800]/20 blur-[130px]" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A90016]">
            Join Us
          </span>
          <h2 className="mt-5 text-4xl font-bold tracking-[-0.04em] text-white md:text-6xl">
            Ready to build something great?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/55">
            We&apos;re always looking for interesting projects and the right clients to partner with.
          </p>
          <a
            href="/contact"
            className="shimmer-btn relative mt-9 inline-flex items-center gap-3 overflow-hidden rounded-xl bg-white px-7 py-4 text-sm font-semibold text-[#1D1D1F] transition-all hover:-translate-y-1 hover:bg-[#A90016] hover:text-white hover:shadow-xl hover:shadow-[#A90016]/20"
          >
            Start a Conversation →
          </a>
        </div>
      </section>
    </div>
  );
}
