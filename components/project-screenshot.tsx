import Image from "next/image";

import type { ProjectVisual } from "@/lib/project-visuals";
import { cn } from "@/lib/utils";

type ProjectScreenshotProps = {
  visual: ProjectVisual;
  sizes: string;
  priority?: boolean;
  presentation?: "framed" | "embedded";
  className?: string;
};

export function ProjectScreenshot({
  visual,
  sizes,
  priority = false,
  presentation = "framed",
  className,
}: ProjectScreenshotProps) {
  const isEmbedded = presentation === "embedded";

  return (
    <figure className={cn("flex flex-col gap-3", className)}>
      <div className={cn("overflow-hidden bg-card", isEmbedded ? "" : "rounded-xl border")}>
        <Image
          src={visual.image}
          alt={visual.alt}
          width={visual.width}
          height={visual.height}
          sizes={sizes}
          loading={priority ? "eager" : undefined}
          fetchPriority={priority ? "high" : undefined}
          className="h-auto w-full"
        />
      </div>
      <figcaption
        className={cn(
          "font-mono text-xs leading-5 text-muted-foreground",
          isEmbedded && "px-6 pb-3 lg:px-10",
        )}
      >
        {visual.caption}
      </figcaption>
    </figure>
  );
}
