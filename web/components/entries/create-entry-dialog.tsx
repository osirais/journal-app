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
import { receiveReward } from "@/utils/receive-reward";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { WithContext as ReactTags, SEPARATORS, type Tag } from "react-tag-input";
import { toast } from "sonner";
import * as z from "zod";

const separators = [SEPARATORS.COMMA, SEPARATORS.ENTER, SEPARATORS.SEMICOLON, SEPARATORS.TAB];

const formSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  content: z.string().nonempty({ message: "Content is required" })
});

type CreateEntryDialogProps = {
  journalId: string;
  onEntryCreated: (entry: any) => void;
};

export function CreateEntryDialog({ journalId, onEntryCreated }: CreateEntryDialogProps) {
  const router = useRouter();

  const [tags, setTags] = useState<Tag[]>([]);
  const [creating, setCreating] = useState(false);

  const dialog = useDialogStore();

  const isDialogOpen = dialog.isOpen && dialog.type === "create-entry";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: ""
    }
  });

  const handleDeleteTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleAdditionTag = (tag: Tag) => {
    if (tags.some((t) => t.text.toLowerCase() === tag.text.toLowerCase())) return;
    setTags([...tags, tag]);
  };

  const handleCreate = async (values: z.infer<typeof formSchema>) => {
    setCreating(true);
    try {
      const res = await axios.post("/api/entries", {
        journalId,
        title: values.title,
        content: values.content,
        tags: tags.map((t) => t.text.toLowerCase())
      });

      const { reward, streak } = res.data;
      if (reward) {
        receiveReward(`Daily journal entry reward: +${reward} droplets!`, streak);
      }

      toast.success("Entry created");
      onEntryCreated(res.data.entry);

      form.reset();
      setTags([]);
      dialog.close();

      router.push(`/entry/${res.data.entry.id}`);
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to create entry");
    } finally {
      setCreating(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={dialog.close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new entry</DialogTitle>
          <DialogDescription>Add a new entry to your journal.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="My journal entry title" {...field} disabled={creating} />
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
                  readOnly={creating}
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
              <Button type="submit" className="cursor-pointer" disabled={creating}>
                {creating ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
