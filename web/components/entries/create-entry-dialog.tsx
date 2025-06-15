"use client";

import { TiptapEditor } from "@/components/entries/tiptap-editor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { receiveReward } from "@/utils/receive-reward";
import axios from "axios";
import { Plus } from "lucide-react";
import { useState } from "react";
import { WithContext as ReactTags, SEPARATORS, type Tag } from "react-tag-input";

const separators = [SEPARATORS.COMMA, SEPARATORS.ENTER, SEPARATORS.SEMICOLON, SEPARATORS.TAB];

type CreateEntryDialogProps = {
  journalId: string;
  onEntryCreated: (entry: any) => void;
};

export function CreateEntryDialog({ journalId, onEntryCreated }: CreateEntryDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const handleDeleteTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleAdditionTag = (tag: Tag) => {
    if (tags.some((t) => t.text.toLowerCase() === tag.text.toLowerCase())) return;
    setTags([...tags, tag]);
  };

  const handleCreate = async () => {
    if (!title.trim()) return setCreateError("Title is required");
    if (!content.trim()) return setCreateError("Content is required");

    setCreating(true);
    setCreateError(null);

    try {
      const res = await axios.post("/api/entries", {
        journalId,
        title,
        content,
        tags: tags.map((t) => t.text.toLowerCase())
      });

      const { reward, streak } = res.data;
      if (reward) {
        receiveReward(`Daily journal entry reward: +${reward} droplets!`, streak);
      }

      setTitle("");
      setContent("");
      setTags([]);
      setOpen(false);

      console.log(res.data);

      onEntryCreated(res.data.entry);
    } catch (err: any) {
      setCreateError(err.response?.data?.error || "Failed to create entry");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-lg font-semibold">Create New Entry</h2>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm" className="size-9 cursor-pointer rounded-full p-0">
            <Plus className="size-4" />
            <span className="sr-only">Create entry</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Create Entry</DialogTitle>
            <DialogDescription>Add a new entry to your journal</DialogDescription>
          </DialogHeader>
          <div className="grid grid-flow-row gap-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter entry title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={creating}
            />
            <Label htmlFor="content">Content</Label>
            <TiptapEditor content={content} onChange={setContent} placeholder="Add content..." />
            <Label htmlFor="tags">Tags</Label>
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
            {createError && (
              <div className="bg-destructive/10 text-destructive rounded-md p-3 text-sm">
                {createError}
              </div>
            )}
            <Button onClick={handleCreate} disabled={creating} className="cursor-pointer">
              {creating ? "Creating..." : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
