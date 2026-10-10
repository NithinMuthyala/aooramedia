import { MetadataRoute } from 'next';
import services from '@/data/service.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.varahiadvertising.com';

  const staticPages = [
    '',
    '/about',
    '/services',
    '/projects',
    '/contact',
    '/privacy_policy',
    '/terms_and_conditions',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const servicePages = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...servicePages];
}
