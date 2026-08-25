"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

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
              <Button
                asChild
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                className="w-full sm:w-auto"
              >
                <Link href={href} aria-current={isActive ? "page" : undefined}>
                  {label}
                </Link>
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
