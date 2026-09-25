"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import services from "@/data/service.json";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("sending");
    setErrorMsg("");

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! }
      );
      setStatus("success");
      formRef.current.reset();
    } catch (err: unknown) {
      console.error("EmailJS error:", err);
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setStatus("error");
    }
  }

  /* ── SUCCESS SCREEN ─────────────────────────────────────── */
  if (status === "success") {
    return (
      <div className="rounded-[2rem] border border-[#A90016]/20 bg-white/75 p-7 shadow-2xl shadow-red-950/5 backdrop-blur-2xl md:p-10">
        <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
          {/* Animated check */}
          <div className="relative flex h-20 w-20 items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#A90016]/15 animate-ping" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#A90016]/10 border border-[#A90016]/20">
              <span className="text-3xl text-[#A90016]">✓</span>
            </div>
          </div>

          <h3 className="mt-6 text-2xl font-bold text-[#1D1D1F]">
            Message Sent!
          </h3>

          <p className="mt-3 max-w-sm text-sm leading-6 text-[#6B6768]">
            Thank you for reaching out. Our team will review your enquiry and
            get back to you within 24 hours.
          </p>

          {/* Divider */}
          <div className="mt-8 h-px w-32" style={{ background: "linear-gradient(90deg, transparent, rgba(245,184,0,0.6), transparent)" }} />

          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-7 rounded-xl border border-[#A90016]/30 px-6 py-3 text-sm font-semibold text-[#1D1D1F] transition-all hover:border-[#A90016] hover:bg-[#A90016] hover:text-white"
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  /* ── FORM ───────────────────────────────────────────────── */
  return (
    <div className="rounded-[2rem] border border-[#A90016]/20 bg-white/75 p-7 shadow-2xl shadow-red-950/5 backdrop-blur-2xl md:p-10">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">

        {/* Name + Email */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="from_name" className="mb-2 block text-sm font-medium text-[#1D1D1F]">
              Full Name <span className="text-[#A90016]">*</span>
            </label>
            <input
              id="from_name"
              name="from_name"
              type="text"
              placeholder="Your name"
              required
              className="w-full rounded-xl border border-[#A90016]/30 bg-[#FDF8EF]/70 px-4 py-3.5 text-sm text-[#1D1D1F] outline-none transition-all placeholder:text-[#1D1D1F]/30 focus:border-[#A90016] focus:bg-white focus:ring-4 focus:ring-[#A90016]/10"
            />
          </div>

          <div>
            <label htmlFor="reply_to" className="mb-2 block text-sm font-medium text-[#1D1D1F]">
              Work Email <span className="text-[#A90016]">*</span>
            </label>
            <input
              id="reply_to"
              name="reply_to"
              type="email"
              placeholder="you@company.com"
              required
              className="w-full rounded-xl border border-[#A90016]/30 bg-[#FDF8EF]/70 px-4 py-3.5 text-sm text-[#1D1D1F] outline-none transition-all placeholder:text-[#1D1D1F]/30 focus:border-[#A90016] focus:bg-white focus:ring-4 focus:ring-[#A90016]/10"
            />
          </div>
        </div>

        {/* Company + Phone */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="company" className="mb-2 block text-sm font-medium text-[#1D1D1F]">
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              placeholder="Company name"
              className="w-full rounded-xl border border-[#A90016]/30 bg-[#FDF8EF]/70 px-4 py-3.5 text-sm text-[#1D1D1F] outline-none transition-all placeholder:text-[#1D1D1F]/30 focus:border-[#A90016] focus:bg-white focus:ring-4 focus:ring-[#A90016]/10"
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-[#1D1D1F]">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
              className="w-full rounded-xl border border-[#A90016]/30 bg-[#FDF8EF]/70 px-4 py-3.5 text-sm text-[#1D1D1F] outline-none transition-all placeholder:text-[#1D1D1F]/30 focus:border-[#A90016] focus:bg-white focus:ring-4 focus:ring-[#A90016]/10"
            />
          </div>
        </div>

        {/* Service */}
        <div>
          <label htmlFor="service" className="mb-2 block text-sm font-medium text-[#1D1D1F]">
            What do you need? <span className="text-[#A90016]">*</span>
          </label>
          <select
            id="service"
            name="service"
            defaultValue=""
            required
            className="w-full rounded-xl border border-[#A90016]/30 bg-[#FDF8EF]/70 px-4 py-3.5 text-sm text-[#1D1D1F] outline-none transition-all focus:border-[#A90016] focus:bg-white focus:ring-4 focus:ring-[#A90016]/10"
          >
            <option value="" disabled>Select a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.slug}>
                {service.title}
              </option>
            ))}
          </select>
        </div>

        {/* Budget */}
        <div>
          <label htmlFor="budget" className="mb-2 block text-sm font-medium text-[#1D1D1F]">
            Estimated Budget
          </label>
          <select
            id="budget"
            name="budget"
            defaultValue=""
            className="w-full rounded-xl border border-[#A90016]/30 bg-[#FDF8EF]/70 px-4 py-3.5 text-sm text-[#1D1D1F] outline-none transition-all focus:border-[#A90016] focus:bg-white focus:ring-4 focus:ring-[#A90016]/10"
          >
            <option value="" disabled>Select budget range</option>
            <option value="under-5l">Under ₹5 Lakhs</option>
            <option value="5l-10l">₹5 Lakhs – ₹10 Lakhs</option>
            <option value="10l-25l">₹10 Lakhs – ₹25 Lakhs</option>
            <option value="25l-plus">₹25 Lakhs+</option>
            <option value="discuss">Let&apos;s discuss</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-[#1D1D1F]">
            Tell us about your project <span className="text-[#A90016]">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            placeholder="Tell us about your project, goals, requirements, timeline..."
            className="w-full resize-none rounded-xl border border-[#A90016]/30 bg-[#FDF8EF]/70 px-4 py-3.5 text-sm leading-6 text-[#1D1D1F] outline-none transition-all placeholder:text-[#1D1D1F]/30 focus:border-[#A90016] focus:bg-white focus:ring-4 focus:ring-[#A90016]/10"
          />
        </div>

        {/* Error banner */}
        {status === "error" && (
          <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <span className="mt-0.5 text-red-500">⚠</span>
            <div>
              <p className="text-sm font-semibold text-red-700">Failed to send</p>
              <p className="mt-0.5 text-xs text-red-600">{errorMsg || "Please check your connection and try again."}</p>
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "sending"}
          className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#A90016] px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-[#A90016]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#72000F] hover:shadow-[#A90016]/30 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {status === "sending" ? (
            <>
              {/* Spinner */}
              <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Sending…
            </>
          ) : (
            <>
              Send Enquiry
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </>
          )}
        </button>

        <p className="text-center text-xs leading-5 text-[#6B6768]">
          We&apos;ll review your enquiry and get back to you within 24 hours.
        </p>
      </form>
    </div>
  );
}