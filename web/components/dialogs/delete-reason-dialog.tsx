"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useDialogStore } from "@/hooks/use-dialog-store";
import { deleteReason } from "@/lib/actions/reason-actions";
import { Reason } from "@/types";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

type DeleteReasonDialogProps = {
  reason: Reason;
  onReasonDeleted: (reasonId: string) => void;
};

export function DeleteReasonDialog({ reason, onReasonDeleted }: DeleteReasonDialogProps) {
  const dialog = useDialogStore();

  const isDialogOpen = dialog.isOpen && dialog.type === "delete-reason";

  const [isPending, startTransition] = useTransition();

  if (!reason) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={dialog.close}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reason Not Found</DialogTitle>
            <DialogDescription>
              The selected reason could not be found. It may have already been deleted or is
              unavailable.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => dialog.close()}
              className="cursor-pointer"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteReason(reason.id);

        toast.success("Reason deleted");

        dialog.close();

        onReasonDeleted(reason.id);
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unknown error occurred");
        }
      }
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={dialog.close}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Reason</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this reason? This action cannot be undone.
            <span className="text-muted-foreground mt-2 block text-sm">"{reason.text}"</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => dialog.close()}
            disabled={isPending}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleDelete}
            disabled={isPending}
            className="cursor-pointer border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            Delete Reason
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
