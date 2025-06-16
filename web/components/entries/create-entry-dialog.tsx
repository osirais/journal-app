"use client";

import { TiptapEditor } from "@/components/entries/tiptap-editor";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { receiveReward } from "@/utils/receive-reward";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Plus } from "lucide-react";
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
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [creating, setCreating] = useState(false);

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
      setOpen(false);
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to create entry");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-lg font-semibold">Create New Entry</h2>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button size="sm" className="size-9 cursor-pointer rounded-full p-0">
            <Plus className="size-4" />
            <span className="sr-only">Create entry</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create a new entry</AlertDialogTitle>
            <AlertDialogDescription>Add a new entry to your journal.</AlertDialogDescription>
          </AlertDialogHeader>
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

              <AlertDialogFooter>
                <AlertDialogCancel type="button" className="cursor-pointer">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction type="submit" className="cursor-pointer" disabled={creating}>
                  {creating ? "Creating..." : "Create"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
