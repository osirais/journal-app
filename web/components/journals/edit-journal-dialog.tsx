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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateJournal } from "@/lib/actions/journal-actions";
import type { JournalWithEntryCount } from "@/types";
import { Loader2 } from "lucide-react";
import type React from "react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

type EditJournalDialogProps = {
  journal: JournalWithEntryCount;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onJournalUpdated?: (updatedJournal: JournalWithEntryCount) => void;
};

export function EditJournalDialog({
  journal,
  open,
  onOpenChange,
  onJournalUpdated
}: EditJournalDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState(journal.title);
  const [description, setDescription] = useState(journal.description || "");

  // reset form when dialog opens
  useEffect(() => {
    if (open) {
      setTitle(journal.title);
      setDescription(journal.description || "");
    }
  }, [open, journal]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", description.trim());

    startTransition(async () => {
      const result = await updateJournal(journal.id, formData);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Journal updated successfully");

        const updatedJournal: JournalWithEntryCount = {
          ...journal,
          title: title.trim(),
          description: description.trim(),
          updated_at: new Date().toISOString()
        };

        // notify parent component about the update
        if (onJournalUpdated) {
          onJournalUpdated(updatedJournal);
        }

        onOpenChange(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Journal</DialogTitle>
            <DialogDescription>
              Make changes to your journal here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter journal title"
                disabled={isPending}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter journal description (optional)"
                disabled={isPending}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="cursor-pointer">
              {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
