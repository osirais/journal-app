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
import { Textarea } from "@/components/ui/textarea";
import { DEFAULT_JOURNAL_COLOR } from "@/constants/journal-colors";
import { useDialogStore } from "@/hooks/use-dialog-store";
import {
  createJournalSchema,
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH
} from "@/lib/validators/journal";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import type * as z from "zod";

interface CreateJournalDialogProps {
  onJournalCreated: (journal: any) => void;
}

export function CreateJournalDialog({ onJournalCreated }: CreateJournalDialogProps) {
  const dialog = useDialogStore();
  const isDialogOpen = dialog.isOpen && dialog.type === "create-journal";

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof createJournalSchema>>({
    resolver: zodResolver(createJournalSchema),
    defaultValues: {
      title: "",
      description: "",
      color: DEFAULT_JOURNAL_COLOR
    }
  });

  const title = useWatch({ control: form.control, name: "title" }) || "";
  const description = useWatch({ control: form.control, name: "description" }) || "";

  async function handleCreate(values: z.infer<typeof createJournalSchema>) {
    if (isLoading) return;

    setIsLoading(true);

    const { title, description, color } = values;

    try {
      const res = await axios.post("/api/journals", {
        title,
        description,
        color
      });

      const journal = res.data.journal;

      toast.success("Journal created");
      onJournalCreated(journal);

      form.reset();
      dialog.close();
    } catch (err: any) {
      console.error("Error creating journal:", err);
      toast.error(err.response?.data?.message || "Failed to create journal");
    } finally {
      setIsLoading(false);
    }
  }

  function onFormError(errors: any) {
    console.log("Form validation errors:", errors);
    toast.error("Please fix the form errors before submitting");
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={dialog.close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new journal</DialogTitle>
          <DialogDescription>Add a new journal to your collection.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate, onFormError)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="My awesome journal" {...field} disabled={isLoading} />
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
                      placeholder="A brief description of what this journal is about"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <div
                    className={`text-right text-sm ${
                      (description?.length ?? 0) > MAX_DESCRIPTION_LENGTH
                        ? "text-red-500"
                        : "text-muted-foreground"
                    }`}
                  >
                    {description?.length ?? 0}/{MAX_DESCRIPTION_LENGTH}
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
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <ColorPicker selectedColor={field.value} onColorChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => dialog.close()}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="cursor-pointer">
                {isLoading ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
