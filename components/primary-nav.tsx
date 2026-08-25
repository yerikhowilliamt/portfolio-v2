"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function PrimaryNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation">
      <ul className="grid grid-cols-4 gap-1 sm:flex sm:items-center">
        {navigation.map(({ href, label }) => {
          const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "block rounded-md px-2 py-2 text-center text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:px-3 sm:text-sm",
                  isActive && "bg-accent text-foreground",
                )}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
