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
import { DEFAULT_JOURNAL_COLOR } from "@/constants/journal-colors";
import { useDialogStore } from "@/hooks/use-dialog-store";
import { editJournal } from "@/lib/actions/journal-actions";
import {
  editJournalSchema,
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH
} from "@/lib/validators/journal";
import type { JournalWithEntryCount } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type EditJournalDialogProps = {
  journal: JournalWithEntryCount;
  onJournalEdited: (updatedJournal: JournalWithEntryCount) => void;
};

export function EditJournalDialog({ journal, onJournalEdited }: EditJournalDialogProps) {
  const dialog = useDialogStore();
  const isDialogOpen = dialog.isOpen && dialog.type === "edit-journal";

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof editJournalSchema>>({
    resolver: zodResolver(editJournalSchema),
    defaultValues: {
      id: journal?.id ?? "",
      title: journal?.title ?? "",
      description: journal?.description ?? "",
      color: journal?.color_hex ?? DEFAULT_JOURNAL_COLOR
    }
  });

  const title = useWatch({ control: form.control, name: "title" }) || "";
  const description = useWatch({ control: form.control, name: "description" }) || "";

  useEffect(() => {
    if (isDialogOpen && journal) {
      form.reset({
        id: journal.id,
        title: journal.title,
        description: journal.description || "",
        color: journal.color_hex || "#000000"
      });
    }
  }, [journal, isDialogOpen, form]);

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
              onClick={dialog.close}
              className="cursor-pointer"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  function handleEdit(values: z.infer<typeof editJournalSchema>) {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("title", values.title.trim());
      formData.append("description", values.description?.trim() || "");

      const result = await editJournal(values.id, formData, values.color);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Journal updated");

      const updatedJournal: JournalWithEntryCount = {
        ...journal,
        title: values.title.trim(),
        description: values.description?.trim() || "",
        color_hex: values.color
      };

      onJournalEdited(updatedJournal);
      dialog.close();
    });
  }

  function onFormError(errors: any) {
    console.log("Form validation errors:", errors);
    toast.error("Please fix the form errors before submitting");
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
          <form onSubmit={form.handleSubmit(handleEdit, onFormError)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Journal title" {...field} disabled={isPending} />
                  </FormControl>
                  <div
                    className={`text-right text-sm ${
                      title.length > MAX_TITLE_LENGTH ? "text-red-500" : "text-muted-foreground"
                    }`}
                  >
                    {title.length}/{MAX_TITLE_LENGTH}
                  </div>
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
                  <div
                    className={`text-right text-sm ${
                      description.length > MAX_DESCRIPTION_LENGTH
                        ? "text-red-500"
                        : "text-muted-foreground"
                    }`}
                  >
                    {description.length}/{MAX_DESCRIPTION_LENGTH}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="color">Color</Label>
                  <FormControl>
                    <ColorPicker selectedColor={field.value} onColorChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
