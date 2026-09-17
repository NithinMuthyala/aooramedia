"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1, number: "01",
    title: "FinTrack Dashboard",
    category: "Web Application",
    tags: ["Next.js", "TypeScript", "Prisma"],
    description: "A real-time financial analytics dashboard for a fintech startup — with live charts, multi-currency support, and role-based access.",
    stat: "4x faster reporting",
    gradient: "from-[#38BDF8]/20 to-[#7C3AED]/10",
    accent: "#38BDF8",
  },
  {
    id: 2, number: "02",
    title: "Medsync Patient Portal",
    category: "Healthcare Platform",
    tags: ["React", "Node.js", "AWS"],
    description: "A HIPAA-compliant patient portal enabling appointment booking, secure messaging, and digital prescriptions for a 12-clinic network.",
    stat: "60% reduction in no-shows",
    gradient: "from-[#7C3AED]/20 to-[#38BDF8]/10",
    accent: "#7C3AED",
  },
  {
    id: 3, number: "03",
    title: "Luxe Commerce",
    category: "E-Commerce",
    tags: ["Shopify", "Next.js", "Figma"],
    description: "A premium fashion e-commerce redesign with 3D product views, AR try-on integration, and a 97/100 Lighthouse score.",
    stat: "38% increase in conversion",
    gradient: "from-[#38BDF8]/15 to-[#7C3AED]/15",
    accent: "#38BDF8",
  },
  {
    id: 4, number: "04",
    title: "AutoML Pipeline",
    category: "AI & Automation",
    tags: ["Python", "FastAPI", "TensorFlow"],
    description: "An end-to-end ML training pipeline with auto-hyperparameter tuning, experiment tracking, and one-click model deployment.",
    stat: "10x model iteration speed",
    gradient: "from-[#7C3AED]/15 to-[#38BDF8]/20",
    accent: "#7C3AED",
  },
  {
    id: 5, number: "05",
    title: "EduFlow LMS",
    category: "Education Platform",
    tags: ["Next.js", "Supabase", "WebRTC"],
    description: "A live online learning platform supporting video classrooms, quizzes, certificates, and 5,000+ concurrent students.",
    stat: "5,000+ active learners",
    gradient: "from-[#38BDF8]/20 to-[#0EA5E9]/10",
    accent: "#38BDF8",
  },
  {
    id: 6, number: "06",
    title: "Propview Real Estate",
    category: "SaaS Platform",
    tags: ["React Native", "Node.js", "Maps API"],
    description: "A cross-platform property search app with interactive maps, virtual tours, and AI-powered price predictions.",
    stat: "25k property listings",
    gradient: "from-[#A855F7]/15 to-[#7C3AED]/15",
    accent: "#7C3AED",
  },
];

export default function ProjectsContent() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".project-card",
        { y: 70, opacity: 0, scale: 0.94 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.9, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ".projects-grid", start: "top 80%", once: true },
        }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-transparent py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Filter pills (visual only) */}
        <div className="mb-14 flex flex-wrap gap-2">
          {["All", "Web App", "E-Commerce", "AI & ML", "Mobile", "Healthcare"].map((f, i) => (
            <button
              key={f}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-200 ${
                i === 0
                  ? "border-[#38BDF8]/50 bg-[#38BDF8]/10 text-[#38BDF8]"
                  : "border-[#C0C7D1]/50 bg-white/50 text-[#1F2937]/55 hover:border-[#38BDF8]/40 hover:text-[#7C3AED]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="project-card group relative overflow-hidden rounded-[2rem] border border-[#C0C7D1]/40 bg-white/65 p-7 shadow-lg backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              whileHover={{ scale: 1.015 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Bg gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50 transition-opacity duration-500 group-hover:opacity-80`} />

              {/* Glow on hover */}
              <div
                className="absolute -right-10 -top-10 h-32 w-32 rounded-full blur-[60px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: project.accent }}
              />

              <div className="relative z-10">
                {/* Number + category */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-[0.2em]" style={{ color: project.accent }}>
                    {project.number}
                  </span>
                  <span className="rounded-full border border-[#C0C7D1]/50 bg-white/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#1F2937]/50 backdrop-blur-xl">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-5 text-2xl font-bold tracking-[-0.03em] text-[#1F2937]">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-6 text-[#1F2937]/60">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#C0C7D1]/40 bg-white/60 px-2.5 py-1 text-[10px] font-medium text-[#1F2937]/55"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Divider */}
                <div className="mt-5 h-px bg-gradient-to-r from-transparent via-[#C0C7D1]/50 to-transparent" />

                {/* Stat + link */}
                <div className="mt-5 flex items-center justify-between">
                  <p className="text-xs font-semibold" style={{ color: project.accent }}>
                    ✦ {project.stat}
                  </p>
                  <span className="text-xs font-semibold text-[#1F2937]/40 transition-colors group-hover:text-[#7C3AED]">
                    View case →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-base text-[#1F2937]/50">
            Have a project in mind?
          </p>
          <a
            href="/contact"
            className="shimmer-btn relative mt-5 inline-flex items-center gap-3 overflow-hidden rounded-xl bg-[#1F2937] px-7 py-4 text-sm font-semibold text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-[#7C3AED]"
          >
            Let&apos;s Build Together →
          </a>
        </div>
      </div>
    </div>
  );
}
