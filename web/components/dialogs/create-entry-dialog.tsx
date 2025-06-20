"use client";

import { TiptapEditor } from "@/components/entries/tiptap-editor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { useDialogStore } from "@/hooks/use-dialog-store";
import { createEntrySchema } from "@/lib/validators/entry";
import { receiveReward } from "@/utils/receive-reward";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { WithContext as ReactTags, SEPARATORS, type Tag } from "react-tag-input";
import { toast } from "sonner";
import z from "zod";

// adjust path as needed

const separators = [SEPARATORS.COMMA, SEPARATORS.ENTER, SEPARATORS.SEMICOLON, SEPARATORS.TAB];

interface CreateEntryDialogProps {
  journalId: string;
  onEntryCreated: (entry: any) => void;
}

export function CreateEntryDialog({ journalId, onEntryCreated }: CreateEntryDialogProps) {
  const dialog = useDialogStore();
  const router = useRouter();

  const isDialogOpen = dialog.isOpen && dialog.type === "create-entry";
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof createEntrySchema>>({
    resolver: zodResolver(createEntrySchema),
    defaultValues: {
      title: "",
      content: "",
      tags: []
    }
  });

  const handleDeleteTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleAdditionTag = (tag: Tag) => {
    if (tags.some((t) => t.text.toLowerCase() === tag.text.toLowerCase())) return;
    setTags([...tags, tag]);
  };

  async function handleCreate(values: z.infer<typeof createEntrySchema>) {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const validatedData = createEntrySchema.parse({
        ...values,
        tags: tags.map((t) => t.text.toLowerCase())
      });

      const res = await axios.post("/api/entries", {
        journalId,
        title: validatedData.title,
        content: validatedData.content,
        tags: validatedData.tags ?? []
      });

      if (res.data.reward) {
        receiveReward(`Daily journal entry reward: +${res.data.reward} droplets!`, res.data.streak);
      }

      toast.success("Entry created");
      onEntryCreated(res.data.entry);

      form.reset();
      setTags([]);
      dialog.close();

      router.push(`/entry/${res.data.entry.id}`);
    } catch (err: any) {
      console.error("Error creating entry:", err);
      toast.error(err.response?.data?.error || "Failed to create entry");
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
          <DialogTitle>Create a new entry</DialogTitle>
          <DialogDescription>Add a new entry to your journal.</DialogDescription>
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
                    <Input placeholder="Entry title" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <TiptapEditor
                      content={field.value}
                      onChange={field.onChange}
                      placeholder="Write your entry..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Label htmlFor="tags" className="mb-2">
                Tags
              </Label>
              <Card className="p-2">
                <ReactTags
                  tags={tags}
                  handleDelete={handleDeleteTag}
                  handleAddition={handleAdditionTag}
                  separators={separators}
                  inputFieldPosition="top"
                  autocomplete
                  placeholder="Add new tag"
                  allowDragDrop={false}
                  readOnly={isLoading}
                  classNames={{
                    tags: "flex flex-wrap gap-2 mt-2",
                    tag: "rounded-full px-2 py-0.5 text-xs text-muted-foreground bg-black/20 dark:bg-white/20",
                    tagInput: "w-full",
                    tagInputField: "w-full focus:outline-none text-sm",
                    selected: "flex flex-wrap gap-2",
                    remove: "ml-2 text-xs cursor-pointer text-destructive hover:underline"
                  }}
                />
              </Card>
            </div>
            <DialogFooter>
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
