import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreVertical } from "lucide-react";
import { FC } from "react";

export const JournalCardSkeleton: FC = () => {
  return (
    <Card className="relative w-full max-w-sm overflow-hidden">
      <CardContent className="flex h-full flex-col p-4">
        <div className="flex items-start gap-4">
          <Skeleton className="h-20 w-20 flex-shrink-0 rounded-lg" />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Skeleton className="mt-1 h-4 w-3/4" />
            <div className="mt-2 grid gap-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-28" />
            </div>
          </div>
        </div>
        <div className="mt-3 min-h-12">
          <Skeleton className="mt-1 h-4 w-5/6" />
          <Skeleton className="mt-1 h-4 w-4/6" />
        </div>
        <div className="mt-auto pt-4">
          <div className="flex h-full items-center justify-between gap-2">
            <Skeleton className="h-8 flex-1 rounded-md" />
            <Button variant="outline" size="sm" className="aspect-square h-full p-0" disabled>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
