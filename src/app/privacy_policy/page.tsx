import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Privacy Policy — Varahi Advertising",
  description:
    "Learn about how Varahi Advertising collects, uses, and safeguards client data, communication details, and digital privacy.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 26, 2026";

  const sections = [
    {
      id: "information-collection",
      title: "1. Information We Collect",
      content: `We collect information you directly provide when submitting contact forms, requesting project proposals, or communicating with Varahi Advertising. This includes:
• Personal & Business Identifiers: Name, work email, phone number, company name, and job title.
• Project Details: Brief descriptions of your project requirements, goals, budget estimates, and uploaded documents.
• Technical & Usage Data: IP address, browser type, device type, pages visited, and interaction metrics gathered via standard cookies and web analytics tools.`,
    },
    {
      id: "use-of-information",
      title: "2. How We Use Your Information",
      content: `Varahi Advertising uses collected information solely for legitimate business purposes:
• Service Delivery: To evaluate project inquiries, prepare proposals, execute Statements of Work, and deliver digital engineering services.
• Communication: To respond to messages, provide project progress updates, and send billing receipts.
• Service Improvement: To analyze website performance, optimize user experience, and refine our service offerings.`,
    },
    {
      id: "data-sharing",
      title: "3. Data Sharing & Third Parties",
      content: `We do not sell, rent, or trade your personal or business data to third parties. We may share data only under the following strictly defined conditions:
• Service Providers: Trusted sub-processors (such as cloud hosting providers or email services like EmailJS) bound by strict confidentiality obligations.
• Legal Compliance: When required by applicable law, subpoena, or government authority to protect legal rights and safety.`,
    },
    {
      id: "data-security",
      title: "4. Data Security",
      content: `We implement robust technical and organizational security measures — including SSL encryption, access controls, and secure server infrastructure — to prevent unauthorized access, disclosure, alteration, or destruction of your personal data.`,
    },
    {
      id: "your-rights",
      title: "5. Your Data Rights",
      content: `Depending on your jurisdiction, you have the right to request access to, correction of, or deletion of your personal data stored by Varahi Advertising. You may opt out of promotional communications at any time.`,
    },
    {
      id: "contact-privacy",
      title: "6. Privacy Contact",
      content: `If you have questions or requests concerning your privacy and personal data, please contact us at:

Email: hello@varahiadvertising.com
Website: https://varahiadvertising.com
Location: India`,
    },
  ];

  return (
    <>
      <PageBanner
        tag="Legal & Governance"
        heading="Privacy"
        headingAccent="Policy"
        description="We are committed to protecting your privacy, personal data, and business confidentiality."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
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
              Varahi Advertising Privacy Statement
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-2 text-sm font-medium text-[#1D1D1F]/50">
              Last Updated: {lastUpdated}
            </p>
            <p className="mt-4 text-base leading-7 text-[#1D1D1F]/70">
              This Privacy Policy describes how Varahi Advertising collects, processes, and protects your information when you visit our website or engage our services.
            </p>
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
        </div>
      </section>
    </>
  );
}
