import type { ComponentProps } from "react";

import { StatBlock } from "@/components/stat-block";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

function sectionId(children: ComponentProps<"h2">["children"]) {
  if (typeof children !== "string") return undefined;
  return children.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function ProjectLink({ className, href = "", ...props }: ComponentProps<"a">) {
  const isAllowedHref = href.startsWith("/") || href.startsWith("https://");

  if (!isAllowedHref) {
    throw new Error(`Unsupported project link destination: ${href}`);
  }

  const isExternal = href.startsWith("https://");

  return (
    <Button asChild variant="link" size="sm" className={cn("h-auto px-0 py-0 align-baseline", className)}>
      <a
        href={href}
        {...(isExternal
          ? {
              target: "_blank",
              rel: "noopener noreferrer",
              "aria-label": `${typeof props.children === "string" ? props.children : "Project evidence"} (opens in a new tab)`,
            }
          : {})}
        {...props}
      />
    </Button>
  );
}

export const projectMdxComponents = {
  StatBlock,
  h2: ({ className, children, ...props }: ComponentProps<"h2">) => (
    <>
      <Separator className="mt-14" />
      <h2
        id={sectionId(children)}
        className={cn(
          "mt-8 scroll-mt-24 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl",
          className,
        )}
        {...props}
      >
        {children}
      </h2>
    </>
  ),
  h3: ({ className, ...props }: ComponentProps<"h3">) => (
    <h3 className={cn("mt-8 text-xl font-semibold text-foreground", className)} {...props} />
  ),
  p: ({ className, ...props }: ComponentProps<"p">) => (
    <p className={cn("mt-4 text-base leading-7 text-muted-foreground", className)} {...props} />
  ),
  ul: ({ className, ...props }: ComponentProps<"ul">) => (
    <ul className={cn("mt-4 list-disc space-y-2 pl-6 text-muted-foreground", className)} {...props} />
  ),
  ol: ({ className, ...props }: ComponentProps<"ol">) => (
    <ol className={cn("mt-4 list-decimal space-y-2 pl-6 text-muted-foreground", className)} {...props} />
  ),
  li: ({ className, ...props }: ComponentProps<"li">) => (
    <li className={cn("pl-1 leading-7", className)} {...props} />
  ),
  a: ProjectLink,
  blockquote: ({ className, ...props }: ComponentProps<"blockquote">) => (
    <blockquote
      className={cn("mt-6 border-l-2 border-primary pl-5 text-foreground", className)}
      {...props}
    />
  ),
  pre: ({ className, ...props }: ComponentProps<"pre">) => (
    <pre className={cn("mt-6 overflow-x-auto border bg-card p-4 text-sm", className)} {...props} />
  ),
  code: ({ className, ...props }: ComponentProps<"code">) => (
    <code className={cn("font-mono text-sm text-foreground", className)} {...props} />
  ),
};
