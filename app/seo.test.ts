import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { metadata as aboutMetadata } from "@/app/about/page";
import { metadata as contactMetadata } from "@/app/contact/page";
import { metadata as projectsMetadata } from "@/app/projects/page";
import {
  createPageMetadata,
  resolveSiteUrl,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
} from "@/lib/site-metadata";

describe("Phase 06 discovery and social metadata", () => {
  it("resolves canonical origins from Vercel system URLs without inventing a production domain", () => {
    expect(
      resolveSiteUrl({
        productionUrl: "portfolio.example.com",
        deploymentUrl: "portfolio-preview.vercel.app",
      }).toString(),
    ).toBe("https://portfolio.example.com/");
    expect(resolveSiteUrl({ deploymentUrl: "portfolio-preview.vercel.app" }).toString()).toBe(
      "https://portfolio-preview.vercel.app/",
    );
    expect(resolveSiteUrl({}).toString()).toBe("http://localhost:3000/");
  });

  it("builds complete canonical, Open Graph, and Twitter metadata", () => {
    expect(
      createPageMetadata({
        title: "Projects",
        description: SITE_DESCRIPTION,
        path: "/projects",
      }),
    ).toMatchObject({
      title: "Projects",
      description: SITE_DESCRIPTION,
      alternates: { canonical: "/projects" },
      openGraph: {
        type: "website",
        locale: "en_US",
        siteName: SITE_NAME,
        title: `Projects | ${SITE_NAME}`,
        description: SITE_DESCRIPTION,
        url: "/projects",
        images: [expect.objectContaining({ url: "/opengraph-image.png", width: 1200, height: 630 })],
      },
      twitter: {
        card: "summary_large_image",
        title: `Projects | ${SITE_NAME}`,
        description: SITE_DESCRIPTION,
        images: [expect.objectContaining({ url: "/twitter-image.png" })],
      },
    });

    expect(SITE_TITLE).toBe("Software Engineer | Yerikho William Tasilima");
    expect(aboutMetadata.alternates).toEqual({ canonical: "/about" });
    expect(contactMetadata.alternates).toEqual({ canonical: "/contact" });
    expect(projectsMetadata.alternates).toEqual({ canonical: "/projects" });
  });

  it("publishes crawl rules and every approved public HTML route", async () => {
    const crawlRules = robots();

    expect(crawlRules).toMatchObject({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "http://localhost:3000/sitemap.xml",
      host: "http://localhost:3000",
    });

    await expect(sitemap()).resolves.toEqual([
      expect.objectContaining({ url: "http://localhost:3000/", priority: 1 }),
      expect.objectContaining({ url: "http://localhost:3000/projects", priority: 0.8 }),
      expect.objectContaining({ url: "http://localhost:3000/about", priority: 0.8 }),
      expect.objectContaining({ url: "http://localhost:3000/contact", priority: 0.8 }),
      expect.objectContaining({ url: "http://localhost:3000/projects/ohmypos", priority: 0.9 }),
    ]);
  });

  it("ships 1200 by 630 static PNGs for Open Graph and Twitter previews", async () => {
    for (const filename of ["opengraph-image.png", "twitter-image.png"]) {
      const image = await readFile(path.join(process.cwd(), "app", filename));

      expect(image.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
      expect(image.readUInt32BE(16)).toBe(1200);
      expect(image.readUInt32BE(20)).toBe(630);
      expect(image.byteLength).toBeLessThan(5 * 1024 * 1024);
    }
  });
});
