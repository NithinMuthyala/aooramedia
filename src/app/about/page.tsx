import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import AboutContent from "@/components/About/AboutContent";

export const metadata: Metadata = {
  title: "About Aviora — Our Story, Values & Team",
  description:
    "Learn about Aviora — a digital agency focused on building modern web experiences. Discover our values, team, and 5-year journey.",
};

export default function AboutPage() {
  return (
    <>
      <PageBanner
        tag="Who We Are"
        heading="We build products that"
        headingAccent="move businesses forward."
        description="We're a small, focused digital agency that believes great design and clean engineering are the same thing. Since 2019, we've helped 20+ businesses ship faster, grow smarter, and stand out online."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
        cta={{ label: "Work With Us", href: "/contact" }}
        secondaryLink={{ label: "View our work", href: "/projects" }}
        glowLeft="#38BDF8"
        glowRight="#7C3AED"
      />
      <AboutContent />
    </>
  );
}
