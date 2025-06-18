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
import { deleteJournal } from "@/lib/actions/journal-actions";
import type { JournalWithEntryCount } from "@/types";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

type DeleteJournalDialogProps = {
  journal: JournalWithEntryCount;
  onJournalDeleted: (id: string) => void;
};

export function DeleteJournalDialog({ journal, onJournalDeleted }: DeleteJournalDialogProps) {
  const dialog = useDialogStore();

  const isDialogOpen = dialog.isOpen && dialog.type === "delete-journal";

  const [isPending, startTransition] = useTransition();

  if (!journal) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={dialog.close}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Journal Not Found</DialogTitle>
            <DialogDescription>
              The selected journal could not be found. It may have already been deleted or is
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
      const result = await deleteJournal(journal.id);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Journal deleted successfully");
        dialog.close();

        onJournalDeleted(journal.id);
      }
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={dialog.close}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Journal</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{journal.title}"? This action cannot be undone.
            {journal.entries > 0 && (
              <span className="mt-2 block font-medium text-red-500">
                This journal contains {journal.entries}{" "}
                {journal.entries === 1 ? "entry" : "entries"} that will also be affected.
              </span>
            )}
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
            Delete Journal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
