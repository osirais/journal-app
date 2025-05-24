"use client";

import { Markdown } from "@/components/markdown";
import { TagComponent, TagType } from "@/components/tag-component";
import { TiptapEditor } from "@/components/tiptap-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateAgo } from "@/utils/format-date-ago";
import axios from "axios";
import { CalendarIcon, Clock, Plus } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { WithContext as ReactTags, Tag } from "react-tag-input";

type Entry = {
  id: string;
  title: string | null;
  content: string;
  created_at: string;
  updated_at: string;
};

// for tag hotkey stuff
const KeyCodes = {
  comma: 188,
  enter: 13,
  tab: 9
};

const delimiters = [KeyCodes.comma, KeyCodes.enter, KeyCodes.tab];

type EntryWithTags = Entry & {
  tags: TagType[];
};

export default function EntriesPage() {
  const { journalId } = useParams();

  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");

  const [entries, setEntries] = useState<EntryWithTags[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const [tags, setTags] = useState<Tag[]>([]);

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!journalId) return;

    setLoading(true);
    axios
      .get(`/api/entries?journalId=${journalId}`)
      .then((res) => {
        setEntries(res.data.entries || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Failed to load entries");
        setLoading(false);
      });
  }, [journalId]);

  const handleCreate = async () => {
    if (!title.trim()) {
      setCreateError("Title is required");
      return;
    }
    if (!content.trim()) {
      setCreateError("Content is required");
      return;
    }

    setCreating(true);
    setCreateError(null);

    try {
      await axios.post("/api/entries", {
        journalId,
        title,
        content,
        tags: tags.map((tag) => tag.text.toLowerCase())
      });

      setEntries((prev) => [
        {
          id: "temp_" + Math.random(),
          title,
          content,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          tags: []
        },
        ...prev
      ]);
      setTitle("");
      setContent("");
      setTags([]);

      axios.get(`/api/entries?journalId=${journalId}`).then((res) => {
        setEntries(res.data.entries || []);
      });

      setDialogOpen(false);
    } catch (err: any) {
      setCreateError(err.response?.data?.error || "Failed to create entry");
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteTag = (i: number) => {
    setTags(tags.filter((_, index) => index !== i));
  };

  const handleAdditionTag = (tag: Tag) => {
    if (tags.some((t) => t.text.toLowerCase() === tag.text.toLowerCase())) return;
    setTags([...tags, tag]);
  };

  if (!journalId) {
    return <div className="container mx-auto max-w-3xl py-8">No journal selected.</div>;
  }

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <h1 className="mb-2 text-3xl font-bold">Entries</h1>
      <p className="text-muted-foreground mb-6">Entries for journal {journalId}</p>

      {tag && (
        <div className="mb-4 rounded bg-blue-100 px-4 py-2 text-sm text-blue-800">
          Showing entries filtered by tag: <strong>{tag}</strong> (not working yet)
        </div>
      )}

      {error && (
        <div className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Create New Entry</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="h-9 w-9 cursor-pointer rounded-full p-0">
              <Plus className="h-4 w-4" />
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
                required
              />
              <Label htmlFor="content">Content</Label>
              <TiptapEditor
                content={content}
                onChange={(newContent) => setContent(newContent)}
                placeholder="Add content..."
              />

              <Label htmlFor="tags">Tags</Label>
              <Card className="p-2">
                <ReactTags
                  tags={tags}
                  handleDelete={handleDeleteTag}
                  handleAddition={handleAdditionTag}
                  delimiters={delimiters}
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
              <Button onClick={handleCreate} disabled={creating}>
                {creating ? "Creating..." : "Create"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="flex min-h-[80px] items-center overflow-hidden">
              <CardContent className="w-full p-0">
                <div className="flex items-center gap-4 p-4">
                  <Skeleton className="h-16 w-16 rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : entries.length === 0 ? (
          <div className="text-muted-foreground py-12 text-center">
            No entries found. Create your first entry to get started.
          </div>
        ) : (
          entries.map((entry) => (
            <Link key={entry.id} href={`/entry/${entry.id}`} className="block">
              <Card className="flex min-h-[80px] cursor-pointer items-center overflow-hidden transition-shadow hover:shadow-md">
                <CardContent className="w-full p-0">
                  <div className="flex items-center p-6">
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-lg font-medium">{entry.title || "Untitled"}</h3>
                      <div className="text-muted-foreground mt-1 text-sm">
                        <Markdown>{entry.content}</Markdown>
                      </div>

                      {/* Tags */}
                      {entry.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {entry.tags.map((tag) => (
                            <TagComponent key={tag.id} journalId={journalId as string} tag={tag} />
                          ))}
                        </div>
                      )}

                      <div className="text-muted-foreground mt-2 flex items-center gap-4 text-xs">
                        <div className="flex items-center">
                          <CalendarIcon className="mr-1 h-3 w-3" />
                          <span>Created {formatDateAgo(new Date(entry.created_at))}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>Updated {formatDateAgo(new Date(entry.updated_at))}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
