import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import Services from "@/components/Services/Services";

export const metadata: Metadata = {
  title: "Services — Aviora Digital Agency",
  description:
    "Explore Aviora's full range of digital services: web development, UI/UX design, mobile apps, AI automation, SEO, and cloud DevOps.",
};

export default function ServicesPage() {
  return (
    <>
      <PageBanner
        tag="Our Services"
        heading="Technology that moves"
        headingAccent="your business forward."
        description="From strategy and design to development, security, optimization and AI — we build digital solutions designed around your business goals."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
        cta={{ label: "Start a Project", href: "/contact" }}
        secondaryLink={{ label: "See our work", href: "/projects" }}
        glowLeft="#38BDF8"
        glowRight="#7C3AED"
        showScroll={false}
      />
      <Services />
    </>
  );
}
