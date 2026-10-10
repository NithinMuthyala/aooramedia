import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import ProjectsContent from "@/components/Projects/ProjectsContent";

export const metadata: Metadata = {
  title: "Our Work & Projects | Varahi Advertising Portfolio",
  description: "Explore Varahi Advertising's portfolio of successful digital products. Discover our case studies in web development, mobile apps, e-commerce, and software solutions.",
  alternates: {
    canonical: "https://www.varahiadvertising.com/projects",
  },
  openGraph: {
    title: "Our Work & Projects | Varahi Advertising Portfolio",
    description: "Real products. Real results. View a selection of products we've designed and engineered for our clients.",
    url: "https://www.varahiadvertising.com/projects",
    type: "website",
  },
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
        glowLeft="#F5B800"
        glowRight="#A90016"
        showScroll={false}
      />
      <ProjectsContent />
    </>
  );
}
