"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import services from "@/data/service.json";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef    = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Heading */
      gsap.fromTo(".contact-heading",
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out", immediateRender: false,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );

      /* Left panel */
      gsap.fromTo(".contact-info",
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out", immediateRender: false,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
        }
      );

      /* Right form */
      gsap.fromTo(".contact-form",
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, delay: 0.15, ease: "power3.out", immediateRender: false,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
        }
      );

      /* Form fields stagger */
      gsap.fromTo(".contact-field",
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out", immediateRender: false,
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true },
        }
      );

      /* Floating glow drift */
      gsap.to(".contact-glow", {
        x: 40, y: 20, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Input focus glow effect */
  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    gsap.to(e.currentTarget, {
      boxShadow: "0 0 0 4px rgba(56,189,248,0.15), 0 0 20px rgba(56,189,248,0.1)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    gsap.to(e.currentTarget, {
      boxShadow: "none",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  /* Submit — EmailJS + toast */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const btn  = form.querySelector<HTMLButtonElement>("[type='submit']");

    /* Button press animation */
    if (btn) {
      gsap.timeline()
        .to(btn, { scale: 0.95, duration: 0.1 })
        .to(btn, { scale: 1.04, duration: 0.2, ease: "back.out(2)" })
        .to(btn, { scale: 1,    duration: 0.3, ease: "power2.out" });
    }

    /* Disable button while sending */
    if (btn) { btn.disabled = true; btn.textContent = "Sending\u2026"; }

    const toastStyle = {
      background: "#1D1D1F",
      color: "#FDF8EF",
      borderRadius: "12px",
      padding: "14px 18px",
      fontSize: "14px",
      fontWeight: "500",
      boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
    };

    try {
      const [emailjs, { toast }] = await Promise.all([
        import("@emailjs/browser"),
        import("react-hot-toast"),
      ]);

      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! },
      );

      toast.success("Message sent! We\u2019ll get back to you soon. \uD83C\uDF89", {
        style: toastStyle,
        iconTheme: { primary: "#F5B800", secondary: "#1D1D1F" },
        duration: 5000,
      });
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID!,
        form,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
        }
);

      form.reset();
    } catch {
      const { toast } = await import("react-hot-toast");
      toast.error("Something went wrong. Please try again or email us directly.", {
        style: toastStyle,
        iconTheme: { primary: "#A90016", secondary: "#FDF8EF" },
        duration: 6000,
      });
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = 'Send Enquiry <span class="transition-transform duration-300 group-hover:translate-x-1">\u2192</span>';
      }
    }
  };

  const inputClass = `w-full rounded-xl border border-[#A90016]/50 bg-[#FDF8EF]/70 px-4 py-3.5 text-sm text-[#1D1D1F] outline-none transition-all placeholder:text-[#1D1D1F]/30 focus:border-[#A90016] focus:bg-white`;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-[#FDF8EF] py-24 md:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="contact-glow absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-[#A90016]/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#F5B800]/10 blur-[140px]" />
        <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A90016]/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="contact-heading mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F5B800]">
            Contact Us
          </span>

          <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-[#1D1D1F] sm:text-5xl md:text-6xl">
            Let&apos;s build something
            <span className="block text-gradient">great together.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#1D1D1F]/60 md:text-lg md:leading-8">
            Have an idea, project, or challenge? Tell us what you&apos;re
            building and let&apos;s explore how we can help.
          </p>
        </div>

        {/* Main two-column */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">

          {/* LEFT PANEL */}
          <div className="contact-info relative overflow-hidden rounded-[2rem] border border-[#A90016]/40 bg-white/65 p-8 shadow-xl shadow-red-950/5 backdrop-blur-2xl md:p-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#A90016]/10 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-[#F5B800]/10 blur-[70px]" />

            <div className="relative z-10">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F5B800]">
                Start a conversation
              </span>

              <h3 className="mt-5 text-3xl font-bold tracking-[-0.03em] text-[#1D1D1F]">
                Have a project in mind?
              </h3>

              <p className="mt-5 text-base leading-7 text-[#1D1D1F]/60">
                Whether you&apos;re starting something new or improving an
                existing product, we can help turn your ideas into a
                practical digital solution.
              </p>

              {/* Social proof */}
              <div className="mt-8 rounded-2xl border border-[#A90016]/40 bg-[#FDF8EF]/70 p-5 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  {/* Avatar stack */}
                  <div className="flex -space-x-2 flex-shrink-0">
                    {["#A90016", "#F5B800", "#1D1D1F", "#A90016"].map((color, i) => (
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
                        <svg key={i} className="h-3 w-3 fill-amber-400" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="mt-0.5 text-xs text-[#1D1D1F]/55">
                      <span className="font-semibold text-[#1D1D1F]">20+ businesses</span> trust us
                    </p>
                  </div>
                </div>
              </div>

              {/* Service chips */}
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1D1D1F]/40">
                  What we can help with
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {services.slice(0, 6).map((service) => (
                    <motion.span
                      key={service.id}
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="cursor-default rounded-full border border-[#A90016]/50 bg-white/70 px-3 py-2 text-xs font-medium text-[#1D1D1F]/60 backdrop-blur-xl transition-colors hover:border-[#A90016]/40 hover:text-[#F5B800]"
                    >
                      {service.title}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Contact details */}
              <div className="mt-8 space-y-5 border-t border-[#A90016]/40 pt-7">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#1D1D1F]/40">Email</p>
                  <a
                    href="mailto:hello@varahiadvertising.com"
                    className="mt-1 inline-block text-sm font-semibold text-[#1D1D1F] transition-colors hover:text-[#F5B800]"
                  >
                    hello@varahiadvertising.com
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#1D1D1F]/40">Response time</p>
                  <p className="mt-1 text-sm font-semibold text-[#1D1D1F]">
                    Usually within 1 business day
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — FORM */}
          <div className="contact-form rounded-[2rem] border border-[#A90016]/40 bg-white/80 p-7 shadow-2xl shadow-red-950/5 backdrop-blur-2xl md:p-10">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}
              <div className="contact-field">
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#1D1D1F]">
                  Full Name
                </label>
                <input
                  id="name" name="name" type="text"
                  placeholder="Your name" required
                  onFocus={handleFocus} onBlur={handleBlur}
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div className="contact-field">
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#1D1D1F]">
                  Work Email
                </label>
                <input
                  id="email" name="email" type="email"
                  placeholder="you@company.com" required
                  onFocus={handleFocus} onBlur={handleBlur}
                  className={inputClass}
                />
              </div>

              {/* Company */}
              <div className="contact-field">
                <label htmlFor="company" className="mb-2 block text-sm font-medium text-[#1D1D1F]">
                  Company
                </label>
                <input
                  id="company" name="company" type="text"
                  placeholder="Company name"
                  onFocus={handleFocus} onBlur={handleBlur}
                  className={inputClass}
                />
              </div>

              {/* Service */}
              <div className="contact-field">
                <label htmlFor="service" className="mb-2 block text-sm font-medium text-[#1D1D1F]">
                  What do you need?
                </label>
                <select
                  id="service" name="service" defaultValue="" required
                  onFocus={handleFocus} onBlur={handleBlur}
                  className={inputClass}
                >
                  <option value="" disabled>Select a service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.slug}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="contact-field">
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-[#1D1D1F]">
                  Tell us about your project
                </label>
                <textarea
                  id="message" name="message" rows={5} required
                  placeholder="Tell us about your project, goals, timeline, or challenges..."
                  onFocus={handleFocus} onBlur={handleBlur}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Submit */}
              <div className="contact-field pt-2">
                <button
                  type="submit"
                  className="shimmer-btn group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#1D1D1F] px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-red-950/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#F5B800] hover:shadow-[#F5B800]/20"
                >
                  Send Enquiry
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              </div>

              <p className="text-center text-xs leading-5 text-[#1D1D1F]/40">
                By submitting this form, you agree to be contacted regarding your enquiry.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}