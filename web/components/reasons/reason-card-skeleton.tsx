import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreVertical, Trash2 } from "lucide-react";

export function ReasonCardSkeleton() {
  return (
    <Card className="relative w-full transition hover:shadow-md">
      <CardHeader className="pb-2">
        <Skeleton className="h-5 w-3/4" />
      </CardHeader>
      <CardContent className="text-muted-foreground text-xs">
        <div className="grid grid-cols-[auto_max-content] place-items-center">
          <Skeleton className="mr-auto h-3 w-24" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="cursor-pointer" disabled>
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem className="cursor-pointer text-red-500" disabled>
                <Trash2 className="mr-2 size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
