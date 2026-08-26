"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "@/components/primary-nav";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" aria-label="Open navigation menu">
          Menu
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[min(88vw,24rem)]">
        <SheetHeader className="px-5 py-6 pr-20">
          <SheetTitle>Yerikho William Tasilima</SheetTitle>
          <SheetDescription>Software Engineer portfolio navigation</SheetDescription>
        </SheetHeader>
        <Separator />
        <nav aria-label="Mobile navigation" className="px-3 py-4">
          <ul className="flex flex-col gap-1">
            {navigation.map(({ href, label }) => {
              const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

              return (
                <li key={href}>
                  <SheetClose asChild>
                    <Link
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        buttonVariants({ variant: isActive ? "secondary" : "ghost" }),
                        "h-11 w-full justify-start",
                      )}
                    >
                      {label}
                    </Link>
                  </SheetClose>
                </li>
              );
            })}
          </ul>
        </nav>
        <Separator className="mt-auto" />
        <div className="p-4">
          <SheetClose asChild>
            <a
              href="/CV_YERIKHO_WILLIAM_TASILIMA_public.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume (PDF, opens in a new tab)"
              className={cn(buttonVariants({ size: "lg" }), "w-full")}
            >
              Open resume
            </a>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
