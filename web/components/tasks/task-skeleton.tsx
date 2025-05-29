import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function TaskSkeleton() {
  return (
    <Card className="group relative transition-shadow hover:shadow-md">
      <CardHeader className="flex items-center justify-between pb-3">
        <div className="bg-muted h-6 w-32 animate-pulse rounded" />
        <div className="bg-muted size-8 animate-pulse rounded" />
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        <div className="bg-muted h-4 w-full animate-pulse rounded" />
        <div className="bg-muted h-4 w-3/4 animate-pulse rounded" />
        <div className="bg-muted h-3 w-20 animate-pulse rounded" />
        <div className="bg-muted h-3 w-24 animate-pulse rounded" />
      </CardContent>
    </Card>
  );
}
