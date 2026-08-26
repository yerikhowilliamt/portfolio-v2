import type { Metadata } from "next";

import { PageContainer } from "@/components/page-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Contact",
  description: "Public email, professional profiles, and resume for Yerikho William Tasilima.",
};

const secondaryDestinations = [
  {
    label: "LinkedIn",
    description: "Professional profile and employment history.",
    href: "https://www.linkedin.com/in/yerikhowilliamt",
  },
  {
    label: "GitHub",
    description: "Public repositories and implementation history.",
    href: "https://github.com/yerikhowilliamt",
  },
  {
    label: "Resume",
    description: "Current public CV in PDF format.",
    href: "/CV_YERIKHO_WILLIAM_TASILIMA_public.pdf",
  },
] as const;

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageContainer className="py-16 sm:py-24 lg:py-28">
        <header className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="flex max-w-3xl flex-col gap-5 lg:col-span-7">
            <p className="font-mono text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              Contact / public channels
            </p>
            <h1 className="text-5xl leading-[1.04] font-semibold tracking-[-0.04em] sm:text-7xl">
              Let&apos;s talk about the system you need to build.
            </h1>
          </div>
          <p className="max-w-xl text-base leading-8 text-muted-foreground sm:text-lg lg:col-span-5">
            For Software Engineer opportunities, technical interviews, or project discussions,
            email is the most direct route.
          </p>
        </header>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <Card className="lg:col-span-7">
            <CardHeader className="gap-4 sm:p-8">
              <Badge variant="technical" className="w-fit">Primary channel</Badge>
              <CardTitle className="text-3xl sm:text-4xl">Email Yerikho</CardTitle>
              <CardDescription className="max-w-xl text-base leading-7">
                Include the role, team context, and any useful technical material. I will have
                enough context to make the first reply useful.
              </CardDescription>
            </CardHeader>
            <CardContent className="sm:px-8">
              <p className="break-all font-mono text-sm text-foreground sm:text-base">
                yerikhowilliamt@gmail.com
              </p>
            </CardContent>
            <CardFooter className="sm:px-8 sm:pb-8">
              <Button asChild size="lg"><a href="mailto:yerikhowilliamt@gmail.com">Send an email</a></Button>
            </CardFooter>
          </Card>

          <section aria-labelledby="other-channels-title" className="lg:col-span-5">
            <h2 id="other-channels-title" className="text-2xl font-semibold">Other public channels</h2>
            <Separator className="my-5" />
            <ul className="flex flex-col">
              {secondaryDestinations.map((destination, index) => (
                <li key={destination.href}>
                  <div className="flex items-center justify-between gap-4 py-4">
                    <div>
                      <h3 className="font-semibold">{destination.label}</h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{destination.description}</p>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <a
                        href={destination.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${destination.label} (opens in a new tab)`}
                      >
                        Open <span aria-hidden="true">↗</span>
                      </a>
                    </Button>
                  </div>
                  {index < secondaryDestinations.length - 1 ? <Separator /> : null}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </PageContainer>
    </main>
  );
}
