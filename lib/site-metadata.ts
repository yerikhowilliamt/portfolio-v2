import type { Metadata } from "next";

export const SITE_NAME = "Yerikho William Tasilima";
export const SITE_TITLE = `Software Engineer | ${SITE_NAME}`;
export const SITE_DESCRIPTION =
  "Software Engineer portfolio by Yerikho William Tasilima, with evidence-led full-stack TypeScript case studies, system trade-offs, and verified outcomes.";
export const SOCIAL_IMAGE_ALT =
  "Yerikho William Tasilima, Software Engineer — evidence-led full-stack systems.";

const LOCAL_SITE_URL = "http://localhost:3000";

type VercelUrlInputs = {
  productionUrl?: string;
  deploymentUrl?: string;
};

export function resolveSiteUrl({ productionUrl, deploymentUrl }: VercelUrlInputs) {
  const hostname = productionUrl ?? deploymentUrl;

  return new URL(hostname ? `https://${hostname}` : LOCAL_SITE_URL);
}

export function getSiteUrl() {
  return resolveSiteUrl({
    productionUrl: process.env.VERCEL_PROJECT_PRODUCTION_URL,
    deploymentUrl: process.env.VERCEL_URL,
  });
}

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: `/${string}` | "/";
}): Metadata {
  const socialTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      url: path,
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: SOCIAL_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: "/twitter-image.png", alt: SOCIAL_IMAGE_ALT }],
    },
  };
}
