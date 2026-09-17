import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import ProjectsContent from "@/components/Projects/ProjectsContent";

export const metadata: Metadata = {
  title: "Projects — Aviora Case Studies & Portfolio",
  description:
    "Explore Aviora's portfolio of digital products — from fintech dashboards and e-commerce to AI pipelines and healthcare platforms.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageBanner
        tag="Our Work"
        heading="Real products."
        headingAccent="Real results."
        description="A selection of products we've designed, engineered, and shipped for clients across fintech, healthcare, education, and e-commerce."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects" },
        ]}
        cta={{ label: "Start a Project", href: "/contact" }}
        secondaryLink={{ label: "View our services", href: "/services" }}
        glowLeft="#7C3AED"
        glowRight="#38BDF8"
        showScroll={false}
      />
      <ProjectsContent />
    </>
  );
}
