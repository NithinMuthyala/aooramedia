import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import Contact from "@/components/Contact/Contact";

export const metadata: Metadata = {
  title: "Contact Us | Varahi Advertising — Start a Project",
  description: "Get in touch with Varahi Advertising to discuss your next web development, mobile app, or digital marketing project. Let's build something remarkable.",
  alternates: {
    canonical: "https://www.varahiadvertising.com/contact",
  },
  openGraph: {
    title: "Contact Us | Varahi Advertising — Start a Project",
    description: "Ready to accelerate your digital growth? Contact Varahi Advertising today.",
    url: "https://www.varahiadvertising.com/contact",
    type: "website",
  },
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
