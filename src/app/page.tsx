import type { Metadata } from "next";
import Contact from "@/components/Contact/Contact";
import Hero from "@/components/Hero";
import Services from "@/components/Services/Services";
import Stats from "@/components/Stats/Stats";

export const metadata: Metadata = {
  title: "Varahi Advertising | Digital Solutions & Technology Services",
  description: "Varahi Advertising is a leading digital agency in India offering web development, mobile apps, digital marketing, AI solutions, UI/UX, QA, DevOps, cybersecurity, and ERP.",
  alternates: {
    canonical: "https://www.varahiadvertising.com/",
  },
  openGraph: {
    title: "Varahi Advertising | Digital Solutions & Technology Services",
    description: "Full-service digital agency delivering modern technology services, web development, mobile apps, and digital marketing to grow your business.",
    url: "https://www.varahiadvertising.com/",
    type: "website",
  },
  twitter: {
    title: "Varahi Advertising | Digital Solutions & Technology Services",
    description: "Full-service digital agency delivering modern technology services, web development, mobile apps, and digital marketing to grow your business.",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.varahiadvertising.com/#website",
        "url": "https://www.varahiadvertising.com/",
        "name": "Varahi Advertising",
        "description": "Digital Solutions & Technology Services",
        "publisher": {
          "@id": "https://www.varahiadvertising.com/#organization"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://www.varahiadvertising.com/#organization",
        "name": "Varahi Advertising",
        "url": "https://www.varahiadvertising.com/",
        "logo": "https://www.varahiadvertising.com/assets/varahi_logo.PNG",
        "sameAs": [
          "https://www.linkedin.com/company/varahiadvertising",
          "https://www.instagram.com/varahiadvertising"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "hello@varahiadvertising.com"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Stats />
      <Services />
      <Contact />
    </>
  );
}