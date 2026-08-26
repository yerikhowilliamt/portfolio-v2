import type { StaticImageData } from "next/image";

import dashboardOverview from "@/docs/portfolio-screenshots/ohmypos/02-dashboard-overview.png";
import activeCart from "@/docs/portfolio-screenshots/ohmypos/03-pos-active-cart.png";
import productManagement from "@/docs/portfolio-screenshots/ohmypos/11-master-data-products.png";

export type ProjectVisual = {
  image: StaticImageData;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

type ProjectVisualSet = {
  primary: ProjectVisual;
  secondary: readonly ProjectVisual[];
};

const ohmyposVisuals: ProjectVisualSet = {
  primary: {
    image: activeCart,
    width: 1440,
    height: 900,
    alt: "OhMyPos cashier interface showing branch selection, product cards, an active two-item order, and payment-method controls.",
    caption:
      "Cashier workflow with branch-scoped availability, active order detail, and payment-method selection.",
  },
  secondary: [
    {
      image: dashboardOverview,
      width: 1440,
      height: 900,
      alt: "OhMyPos dashboard showing cash, profit, supplier payable, stock alerts, daily revenue, and payment-method panels.",
      caption: "Operational dashboard overview.",
    },
    {
      image: productManagement,
      width: 1440,
      height: 900,
      alt: "OhMyPos product and recipe management table showing selling price, live HPP, margin, available portions, and status.",
      caption: "Product and recipe management view.",
    },
  ],
};

const projectVisuals: Readonly<Record<string, ProjectVisualSet>> = {
  ohmypos: ohmyposVisuals,
};

export function getProjectVisuals(slug: string): ProjectVisualSet | undefined {
  return projectVisuals[slug];
}
