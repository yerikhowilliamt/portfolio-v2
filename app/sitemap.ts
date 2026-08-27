import type { MetadataRoute } from "next";

import { getPublishedProjects } from "@/lib/mdx";
import { getSiteUrl } from "@/lib/site-metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const projects = await getPublishedProjects();
  const routes = ["/", "/projects", "/about", "/contact"];

  return [
    ...routes.map((route, index) => ({
      url: new URL(route, siteUrl).toString(),
      changeFrequency: "monthly" as const,
      priority: index === 0 ? 1 : 0.8,
    })),
    ...projects.map(({ slug }) => ({
      url: new URL(`/projects/${slug}`, siteUrl).toString(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
