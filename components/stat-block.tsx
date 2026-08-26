import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatBlockProps = {
  label: string;
  value: string;
  context: string;
  qualifier?: string;
  className?: string;
};

export function StatBlock({ label, value, context, qualifier, className }: StatBlockProps) {
  return (
    <Card className={cn("my-8", className)}>
      <CardHeader>
        <CardTitle>
          <Badge variant="technical">{label}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl>
          <div className="flex flex-col gap-2">
            <dt className="sr-only">{label}</dt>
            <dd className="font-mono text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
              {value}
            </dd>
            <dd className="text-sm leading-6 text-foreground">{context}</dd>
            {qualifier ? (
              <dd className="text-xs leading-5 text-muted-foreground">{qualifier}</dd>
            ) : null}
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
