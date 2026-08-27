import Link from "next/link";

import { PageContainer } from "@/components/page-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  return (
    <main id="main-content">
      <PageContainer className="flex min-h-[70vh] items-center py-16 sm:py-24">
        <Card className="w-full">
          <CardHeader className="max-w-3xl gap-5 sm:p-10">
            <Badge variant="technical" className="w-fit">404 / route not found</Badge>
            <CardTitle>
              <h1 className="text-4xl sm:text-6xl">This page is outside the published system.</h1>
            </CardTitle>
            <CardDescription className="text-base leading-7">
              The destination may have moved, or it is not part of the public portfolio.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex-wrap gap-3 sm:px-10 sm:pb-10">
            <Button asChild size="lg"><Link href="/">Return home</Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/projects">View projects</Link></Button>
          </CardFooter>
        </Card>
      </PageContainer>
    </main>
  );
}
