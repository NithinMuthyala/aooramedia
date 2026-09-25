import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import Contact from "@/components/Contact/Contact";

export const metadata: Metadata = {
  title: "Contact Aviora — Start a Project",
  description:
    "Get in touch with Aviora. Tell us about your project and we'll get back to you within 1 business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageBanner
        tag="Contact Us"
        heading="Let's build something"
        headingAccent="great together."
        description="Have an idea, project, or challenge? Tell us what you're building and let's explore how we can help."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
        glowLeft="#A90016"
        glowRight="#F5B800"
        showScroll={false}
      />
      <Contact />
    </>
  );
}
