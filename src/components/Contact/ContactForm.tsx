"use client";

import { useState } from "react";
import services from "@/data/service.json";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    console.log({
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      service: formData.get("service"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    });

    setSubmitted(true);
    form.reset();
  }

  return (
    <div className="rounded-[2rem] border border-[#C0C7D1]/40 bg-white/75 p-7 shadow-2xl shadow-slate-900/5 backdrop-blur-2xl md:p-10">
      {submitted ? (
        <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#38BDF8]/10">
            <span className="text-2xl text-[#38BDF8]">✓</span>
          </div>

          <h3 className="mt-6 text-2xl font-bold text-[#1F2937]">
            Thank you!
          </h3>

          <p className="mt-3 max-w-md text-sm leading-6 text-[#1F2937]/60">
            Your enquiry has been received. Our team will get back to you
            shortly.
          </p>

          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-7 rounded-xl border border-[#C0C7D1]/50 px-5 py-3 text-sm font-semibold text-[#1F2937] transition hover:border-[#38BDF8] hover:text-[#7C3AED]"
          >
            Send another enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name + Email */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-[#1F2937]"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                required
                className="w-full rounded-xl border border-[#C0C7D1]/50 bg-[#F8FAFC]/70 px-4 py-3.5 text-sm text-[#1F2937] outline-none transition-all placeholder:text-[#1F2937]/30 focus:border-[#38BDF8] focus:bg-white focus:ring-4 focus:ring-[#38BDF8]/10"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#1F2937]"
              >
                Work Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                required
                className="w-full rounded-xl border border-[#C0C7D1]/50 bg-[#F8FAFC]/70 px-4 py-3.5 text-sm text-[#1F2937] outline-none transition-all placeholder:text-[#1F2937]/30 focus:border-[#38BDF8] focus:bg-white focus:ring-4 focus:ring-[#38BDF8]/10"
              />
            </div>
          </div>

          {/* Company + Phone */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="company"
                className="mb-2 block text-sm font-medium text-[#1F2937]"
              >
                Company
              </label>

              <input
                id="company"
                name="company"
                type="text"
                placeholder="Company name"
                className="w-full rounded-xl border border-[#C0C7D1]/50 bg-[#F8FAFC]/70 px-4 py-3.5 text-sm text-[#1F2937] outline-none transition-all placeholder:text-[#1F2937]/30 focus:border-[#38BDF8] focus:bg-white focus:ring-4 focus:ring-[#38BDF8]/10"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-[#1F2937]"
              >
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                className="w-full rounded-xl border border-[#C0C7D1]/50 bg-[#F8FAFC]/70 px-4 py-3.5 text-sm text-[#1F2937] outline-none transition-all placeholder:text-[#1F2937]/30 focus:border-[#38BDF8] focus:bg-white focus:ring-4 focus:ring-[#38BDF8]/10"
              />
            </div>
          </div>

          {/* Service */}
          <div>
            <label
              htmlFor="service"
              className="mb-2 block text-sm font-medium text-[#1F2937]"
            >
              What do you need?
            </label>

            <select
              id="service"
              name="service"
              defaultValue=""
              required
              className="w-full rounded-xl border border-[#C0C7D1]/50 bg-[#F8FAFC]/70 px-4 py-3.5 text-sm text-[#1F2937] outline-none transition-all focus:border-[#38BDF8] focus:bg-white focus:ring-4 focus:ring-[#38BDF8]/10"
            >
              <option value="" disabled>
                Select a service
              </option>

              {services.map((service) => (
                <option key={service.id} value={service.slug}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div>
            <label
              htmlFor="budget"
              className="mb-2 block text-sm font-medium text-[#1F2937]"
            >
              Estimated Budget
            </label>

            <select
              id="budget"
              name="budget"
              defaultValue=""
              className="w-full rounded-xl border border-[#C0C7D1]/50 bg-[#F8FAFC]/70 px-4 py-3.5 text-sm text-[#1F2937] outline-none transition-all focus:border-[#38BDF8] focus:bg-white focus:ring-4 focus:ring-[#38BDF8]/10"
            >
              <option value="" disabled>
                Select budget range
              </option>

              <option value="under-5k">Under ₹5 Lakhs</option>
              <option value="5k-10k">₹5 Lakhs – ₹10 Lakhs</option>
              <option value="10k-25k">₹10 Lakhs – ₹25 Lakhs</option>
              <option value="25k-plus">₹25 Lakhs+</option>
              <option value="discuss">Let's discuss</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-[#1F2937]"
            >
              Tell us about your project
            </label>

            <textarea
              id="message"
              name="message"
              rows={6}
              required
              placeholder="Tell us about your project, goals, requirements, timeline..."
              className="w-full resize-none rounded-xl border border-[#C0C7D1]/50 bg-[#F8FAFC]/70 px-4 py-3.5 text-sm leading-6 text-[#1F2937] outline-none transition-all placeholder:text-[#1F2937]/30 focus:border-[#38BDF8] focus:bg-white focus:ring-4 focus:ring-[#38BDF8]/10"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#1F2937] px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7C3AED] hover:shadow-[#7C3AED]/20"
          >
            Send Enquiry

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>

          <p className="text-center text-xs leading-5 text-[#1F2937]/40">
            We&apos;ll review your enquiry and get back to you shortly.
          </p>
        </form>
      )}
    </div>
  );
}