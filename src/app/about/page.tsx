import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import AboutContent from "@/components/About/AboutContent";

export const metadata: Metadata = {
  title: "About Us | Varahi Advertising — Digital & Technology Agency",
  description: "Learn about Varahi Advertising, a premier digital agency in India focusing on building modern web experiences, mobile apps, and scalable digital products.",
  alternates: {
    canonical: "https://www.varahiadvertising.com/about",
  },
  openGraph: {
    title: "About Us | Varahi Advertising — Digital & Technology Agency",
    description: "Discover the story, values, and expert team behind Varahi Advertising. We build products that move businesses forward.",
    url: "https://www.varahiadvertising.com/about",
    type: "website",
  },
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
        glowLeft="#A90016"
        glowRight="#F5B800"
      />
      <AboutContent />
    </>
  );
}
