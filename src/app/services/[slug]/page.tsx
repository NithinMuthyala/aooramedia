import { Metadata } from "next";
import { notFound } from "next/navigation";

import services from "@/data/service.json";
import ServiceDetail from "@/components/Services/ServicesDetail";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;

  const service: any = services.find(
    (item) => item.slug === slug
  );

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} | Varahi Advertising Services`,
    description: service.seo?.description || service.shortDescription || service.description,
    keywords: service.seo?.keywords,
    openGraph: {
      title: `${service.title} | Varahi Advertising Services`,
      description: service.seo?.description || service.shortDescription || service.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | Varahi Advertising Services`,
      description: service.seo?.description || service.shortDescription || service.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ServicePage({
  params,
}: ServicePageProps) {
  const { slug } = await params;

  const service = services.find(
    (item) => item.slug === slug
  );

  if (!service) {
    notFound();
  }

  return <ServiceDetail service={service} />;
}