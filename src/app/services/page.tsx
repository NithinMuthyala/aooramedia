import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import Services from "@/components/Services/Services";

export const metadata: Metadata = {
  title: "Services | Varahi Advertising — Web, Mobile, AI & Marketing",
  description: "Explore our full range of technology services including custom web development, mobile apps, AI automation, cybersecurity, digital marketing, and UI/UX design.",
  alternates: {
    canonical: "https://www.varahiadvertising.com/services",
  },
  openGraph: {
    title: "Services | Varahi Advertising — Web, Mobile, AI & Marketing",
    description: "From strategy and design to development and marketing — we build digital solutions designed around your business goals.",
    url: "https://www.varahiadvertising.com/services",
    type: "website",
  },
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
        glowLeft="#A90016"
        glowRight="#F5B800"
        showScroll={false}
      />
      <Services />
    </>
  );
}
