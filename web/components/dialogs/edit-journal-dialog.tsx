"use client";

import { ColorPicker } from "@/components/journals/color-picker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDialogStore } from "@/hooks/use-dialog-store";
import { updateJournal } from "@/lib/actions/journal-actions";
import type { JournalWithEntryCount } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  description: z.string().optional()
});

type EditJournalDialogProps = {
  journal: JournalWithEntryCount;
  onJournalEdited: (updatedJournal: JournalWithEntryCount) => void;
};

export function EditJournalDialog({ journal, onJournalEdited }: EditJournalDialogProps) {
  const dialog = useDialogStore();

  const isDialogOpen = dialog.isOpen && dialog.type === "edit-journal";

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

  const [isPending, startTransition] = useTransition();
  const [color, setColor] = useState(journal.color_hex);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: journal.title,
      description: journal.description || ""
    }
  });

  useEffect(() => {
    if (isDialogOpen) {
      form.reset({
        title: journal.title,
        description: journal.description || ""
      });
    }
  }, [journal, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("title", values.title.trim());
      formData.append("description", values.description?.trim() || "");

      const result = await updateJournal(journal.id, formData, color);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Journal updated");

      const updatedJournal: JournalWithEntryCount = {
        ...journal,
        title: values.title.trim(),
        description: values.description?.trim() || "",
        color_hex: color
      };

      onJournalEdited(updatedJournal);

      dialog.close();
    });
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={dialog.close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Journal</DialogTitle>
          <DialogDescription>
            Make changes to your journal. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Journal title" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Journal description (optional)"
                      rows={3}
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Label htmlFor="color">Color</Label>
              <ColorPicker selectedColor={color} onColorChange={setColor} />
            </div>
            <DialogFooter>
              <Button type="submit" className="cursor-pointer" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
