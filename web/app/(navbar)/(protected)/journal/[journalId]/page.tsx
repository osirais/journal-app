"use client";

import { EntryCard } from "@/components/entry-card";
import { SortDropdown } from "@/components/sort-dropdown";
import { TagComponent } from "@/components/tag-component";
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
import type { JournalWithEntryCount, TagType } from "@/types";
import { formatDateAgo } from "@/utils/format-date-ago";
import { receiveStamps } from "@/utils/receive-stamps";
import axios from "axios";
import { CalendarIcon, FileText, Plus } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { WithContext as ReactTags, SEPARATORS, type Tag } from "react-tag-input";

type Entry = {
  id: string;
  title: string | null;
  content: string;
  created_at: string;
  updated_at: string;
};

const separators = [SEPARATORS.COMMA, SEPARATORS.ENTER, SEPARATORS.SEMICOLON, SEPARATORS.TAB];

type EntryWithTags = Entry & {
  tags: TagType[];
};

export default function EntriesPage() {
  const { journalId } = useParams();

  const searchParams = useSearchParams();
  const tagId = searchParams.get("tag");

  const [entries, setEntries] = useState<EntryWithTags[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [tagName, setTagName] = useState<string | null>(null);

  const [tags, setTags] = useState<Tag[]>([]);

  const [journalInfo, setJournalInfo] = useState<JournalWithEntryCount | null>(null);
  const [journalLoading, setJournalLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!journalId) return;

    const fetchString = `/api/entries?journalId=${journalId}${tagId ? `&tag=${tagId}` : ""}`;

    if (tagId) {
      axios
        .get(`/api/tags?id=${tagId}`)
        .then((res) => {
          setTagName(res.data.name);
        })
        .catch((err) => {
          setError(err.response?.data?.error || "Failed to load tag name");
        });
    }

    setLoading(true);

    axios
      .get(fetchString)
      .then((res) => {
        setEntries(res.data.entries || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Failed to load entries");
        setLoading(false);
      });

    setJournalLoading(true);
    axios
      .get(`/api/journal?id=${journalId}`)
      .then((res) => {
        setJournalInfo(res.data);
        setJournalLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load journal info", err);
        setJournalLoading(false);
      });
  }, [journalId, tagId]);

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
      const response = await axios.post("/api/entries", {
        journalId,
        title,
        content,
        tags: tags.map((tag) => tag.text.toLowerCase())
      });

      const { reward } = response.data;

      if (reward) {
        receiveStamps(`Daily journal entry reward: +${reward} stamps!`);
      }

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

      {tagId && (
        <div className="grid grid-cols-[max-content_max-content] place-items-center gap-2 py-4">
          <p className="text-muted-foreground">Showing entries with tag</p>
          <TagComponent journalId={journalId as string} tag={{ id: tagId, name: tagName || "" }} />
        </div>
      )}

      {error && (
        <div className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      {journalLoading ? (
        <div className="mb-6 flex items-center gap-4">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ) : (
        journalInfo && (
          <div className="mb-6 space-y-1">
            <p className="text-muted-foreground">{journalInfo.description}</p>
            <div className="text-muted-foreground flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <CalendarIcon className="size-3" />
                <span>Created {formatDateAgo(new Date(journalInfo.created_at))}</span>
              </div>
              <div className="flex items-center gap-1">
                <FileText className="size-3" />
                <span>{journalInfo.entries} entries</span>
              </div>
            </div>
          </div>
        )
      )}

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Create New Entry</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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

      <div className="mb-6">
        <SortDropdown onSortChange={() => {}} defaultSort="work-in-progress" />
      </div>

      <div className="space-y-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="flex min-h-[80px] items-center overflow-hidden">
              <CardContent className="w-full p-0">
                <div className="flex items-center gap-4 p-4">
                  <Skeleton className="size-16 rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : entries.length === 0 ? (
          <div className="text-muted-foreground py-12 text-center">
            <FileText className="mx-auto mb-2 size-8" />
            No entries found. Create your first entry to get started.
          </div>
        ) : (
          entries.map((entry) => (
            <EntryCard
              key={entry.id}
              entryId={entry.id}
              title={entry.title!}
              content={entry.content}
              tags={entry.tags}
              journalId={journalId as string}
              created_at={entry.created_at}
              updated_at={entry.updated_at}
            />
          ))
        )}
      </div>
    </div>
  );
}
