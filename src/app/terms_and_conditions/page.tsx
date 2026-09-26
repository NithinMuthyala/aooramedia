import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Terms & Conditions — Varahi Advertising",
  description:
    "Read the official Terms and Conditions governing digital services, web development, marketing, and design contracts with Varahi Advertising.",
};

export default function TermsAndConditionsPage() {
  const lastUpdated = "September 26, 2026";

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: `By accessing our website, purchasing our services, or executing a Statement of Work (SOW) with Varahi Advertising ("Company", "we", "us", or "our"), you ("Client", "you", or "your") agree to be bound by these Terms & Conditions. If you are entering into this agreement on behalf of a business entity, you represent that you have full legal authority to bind that entity.`,
    },
    {
      id: "services",
      title: "2. Services & Project Scope",
      content: `Varahi Advertising delivers digital agency services, including but not limited to custom web development, mobile application design & engineering, UI/UX design, digital marketing campaigns, AI automation, branding, and cloud DevOps solutions. Detailed scope, deliverables, project timelines, and technical requirements will be defined in individual SOWs or written project agreements executed between the parties.`,
    },
    {
      id: "payments",
      title: "3. Payment Terms, Billing & Deposits",
      content: `Unless otherwise stipulated in an SOW:
• Milestone Payments: Projects are billed according to agreed milestone schedules (typically an initial deposit prior to project kick-off, intermediate milestone invoices, and a final payment prior to production deployment or source code transfer).
• Payment Due Date: Invoices are due within 14 calendar days of issuance.
• Late Payments: Late payments may incur interest at the rate of 1.5% per month (or the maximum allowed by law).
• Work Suspension: We reserve the right to pause project work or withhold deliverables if invoices remain overdue beyond 15 days.`,
    },
    {
      id: "intellectual-property",
      title: "4. Intellectual Property & Ownership",
      content: `• Final Deliverables: Upon receipt of full and final payment, Varahi Advertising grants the Client full ownership of final custom design assets, codebases, and custom materials produced specifically for the Client under the agreement.
• Pre-existing Assets & Tools: Varahi Advertising retains sole ownership over pre-existing code, open-source frameworks, proprietary libraries, starter kits, and utility routines used during development. The Client receives a perpetual, non-exclusive, royalty-free license to utilize such components as embedded within their final project.
• Portfolio Showcase: Unless restricted by a signed Non-Disclosure Agreement (NDA), Varahi Advertising reserves the right to feature completed projects, design concepts, and client logos in our agency portfolio, case studies, and promotional materials.`,
    },
    {
      id: "client-responsibilities",
      title: "5. Client Responsibilities & Asset Provision",
      content: `• Timely Content & Feedback: The Client agrees to provide required branding assets, text, media, API access, and feedback in a timely manner. Project delivery dates depend directly on prompt Client feedback (typically within 3–5 business days per review cycle).
• Asset Authorization: The Client warrants that all text, imagery, graphics, trademarks, and third-party software provided to Varahi Advertising are owned by the Client or licensed with proper authorization.`,
    },
    {
      id: "confidentiality",
      title: "6. Confidentiality & Non-Disclosure",
      content: `Both Varahi Advertising and the Client agree to hold in strict confidence all non-public business strategies, technical specifications, financial details, customer data, and proprietary concepts disclosed during the course of engagement. Confidential information will not be disclosed to third parties without prior written consent, except as required by law.`,
    },
    {
      id: "warranties",
      title: "7. Warranties, Support & Maintenance",
      content: `• Warranty Period: Varahi Advertising provides a 30-day post-launch warranty covering bug fixes and technical errors directly related to the contracted scope of work.
• Out-of-Scope Requests: Feature enhancements, architectural changes, or issues arising from third-party hosting, unauthorized client code modifications, or browser/OS updates after the 30-day warranty will be billed under a separate maintenance agreement or hourly rate.
• As-Is Disclaimer: Services are provided on an "as is" and "as available" basis without implied warranties of merchantability or fitness for a non-specified purpose.`,
    },
    {
      id: "limitation-of-liability",
      title: "8. Limitation of Liability",
      content: `To the maximum extent permitted by applicable law, Varahi Advertising, its directors, employees, or partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including loss of profits, revenue, data, or business opportunity — arising out of or related to project delays, server downtime, or third-party service outages. Our maximum aggregate liability shall not exceed the total fees paid by the Client to Varahi Advertising for the specific project giving rise to the claim.`,
    },
    {
      id: "termination",
      title: "9. Termination & Cancellation",
      content: `Either party may terminate a project agreement upon 14 days' written notice if the other party materially breaches any term and fails to cure such breach. Upon termination, the Client shall pay Varahi Advertising for all work completed, hours logged, and non-refundable expenses incurred up to the date of termination.`,
    },
    {
      id: "governing-law",
      title: "10. Governing Law & Dispute Resolution",
      content: `These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes or claims arising out of or in connection with these terms shall first be attempted to be resolved through good-faith negotiation, failing which they shall be submitted to the exclusive jurisdiction of the competent courts in India.`,
    },
    {
      id: "contact",
      title: "11. Contact Us",
      content: `If you have questions, feedback, or legal inquiries regarding these Terms & Conditions, please reach out to our legal and management team at:

Email: hello@varahiadvertising.com
Website: https://varahiadvertising.com
Location: India`,
    },
  ];

  return (
    <>
      <PageBanner
        tag="Legal & Governance"
        heading="Terms &"
        headingAccent="Conditions"
        description="Please review the terms and agreements that govern our digital agency services, software engineering contracts, and client partnerships."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms & Conditions" },
        ]}
        glowLeft="#A90016"
        glowRight="#F5B800"
        showScroll={false}
      />

      <section className="relative overflow-hidden bg-[#FDF8EF] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Header Card */}
          <div className="mb-12 rounded-3xl border border-[#A90016]/30 bg-white/70 p-8 shadow-lg backdrop-blur-xl md:p-10">
            <span className="inline-block rounded-full border border-[#A90016]/40 bg-[#A90016]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#A90016]">
              Varahi Advertising Policy
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
              Terms &amp; Conditions
            </h1>
            <p className="mt-2 text-sm font-medium text-[#1D1D1F]/50">
              Last Updated: {lastUpdated}
            </p>
            <p className="mt-4 text-base leading-7 text-[#1D1D1F]/70">
              These Terms &amp; Conditions set forth the professional standards, operational guidelines, and legal provisions applicable to all contracts, projects, and digital services executed by Varahi Advertising.
            </p>
          </div>

          {/* Table of Contents Quick Nav */}
          <div className="mb-14 rounded-2xl border border-[#F5B800]/40 bg-white/50 p-6 backdrop-blur-md">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1D1D1F]/60">
              Table of Contents
            </h2>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="text-xs font-medium text-[#1D1D1F]/70 transition-colors hover:text-[#A90016]"
                >
                  → {sec.title}
                </a>
              ))}
            </div>
          </div>

          {/* Document Sections */}
          <div className="space-y-10">
            {sections.map((sec) => (
              <div
                key={sec.id}
                id={sec.id}
                className="scroll-mt-28 rounded-3xl border border-[#A90016]/20 bg-white/75 p-8 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-[#A90016]/40 hover:shadow-md"
              >
                <h2 className="text-xl font-bold tracking-[-0.02em] text-[#1D1D1F] sm:text-2xl">
                  {sec.title}
                </h2>
                <div className="mt-4 h-[2px] w-12 rounded-full bg-gradient-to-r from-[#A90016] to-[#F5B800]" />
                <div className="mt-5 text-sm leading-7 text-[#1D1D1F]/75 whitespace-pre-line md:text-base">
                  {sec.content}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA Card */}
          <div className="mt-16 text-center">
            <div className="rounded-3xl border border-[#A90016]/40 bg-gradient-to-br from-[#72000F] to-[#3D0008] p-8 text-white shadow-xl md:p-12">
              <h3 className="text-2xl font-bold sm:text-3xl">
                Have questions about our terms?
              </h3>
              <p className="mt-3 text-sm text-white/70 max-w-xl mx-auto">
                Our team is happy to discuss project scopes, custom SLAs, and enterprise agreements with you.
              </p>
              <a
                href="/contact"
                className="shimmer-btn relative mt-7 inline-flex items-center gap-3 overflow-hidden rounded-xl bg-[#F5B800] px-7 py-3.5 text-sm font-bold text-[#72000F] shadow-lg transition-all hover:bg-[#FFD040]"
              >
                Contact Legal Team →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
