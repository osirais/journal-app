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
  const [color, setColor] = useState(journal.color_hex);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: journal.title,
      description: journal.description || ""
    }
  });

  useEffect(() => {
    if (open) {
      form.reset({
        title: journal.title,
        description: journal.description || ""
      });
    }
  }, [open, journal, form]);

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

      if (onJournalUpdated) {
        onJournalUpdated(updatedJournal);
      }

      onOpenChange(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
