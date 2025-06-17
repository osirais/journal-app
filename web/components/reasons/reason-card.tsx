"use client";

import { DeleteReasonDialog } from "@/components/dialogs/delete-reason-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Reason } from "@/types";
import { formatDateAgo } from "@/utils/format-date-ago";
import { MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";

export function ReasonCard({
  reason,
  onDelete
}: {
  reason: Reason;
  onDelete: (id: string) => void;
}) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDeleted = () => {
    onDelete(reason.id);
  };

  return (
    <>
      <Card className="relative w-full transition hover:shadow-md">
        <CardHeader className="pb-2 text-base font-medium">{reason.text}</CardHeader>
        <CardContent className="text-muted-foreground text-xs">
          <div className="grid grid-cols-[auto_max-content] place-items-center">
            <span className="mr-auto">Created {formatDateAgo(new Date(reason.created_at!))}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => e.stopPropagation()}
                  className="cursor-pointer"
                >
                  <MoreVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem
                  onClick={() => setDeleteOpen(true)}
                  className="cursor-pointer text-red-500"
                >
                  <Trash2 className="mr-2 size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
      <DeleteReasonDialog
        reason={reason}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onDeleted={handleDeleted}
      />
    </>
  );
}
