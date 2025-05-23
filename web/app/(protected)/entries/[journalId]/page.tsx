"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon, Plus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatDateAgo } from "@/utils/format-date-ago";
import { useParams } from "next/navigation";
import { TiptapEditor } from "@/components/tiptap-editor";
import { Markdown } from "@/components/markdown";

type Entry = {
  id: string;
  title: string | null;
  content: string;
  created_at: string;
  updated_at: string;
};

export default function EntriesPage() {
  const { journalId } = useParams();

  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

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
        content
      });

      setEntries((prev) => [
        {
          id: "temp_" + Math.random(),
          title,
          content,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        ...prev
      ]);
      setTitle("");
      setContent("");

      axios.get(`/api/entries?journalId=${journalId}`).then((res) => {
        setEntries(res.data.entries || []);
      });
    } catch (err: any) {
      setCreateError(err.response?.data?.error || "Failed to create entry");
    } finally {
      setCreating(false);
    }
  };

  if (!journalId) {
    return <div className="container mx-auto max-w-3xl py-8">No journal selected.</div>;
  }

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <h1 className="mb-2 text-3xl font-bold">Entries</h1>
      <p className="text-muted-foreground mb-6">Entries for journal {journalId}</p>

      {error && (
        <div className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <Card className="mb-6 overflow-hidden">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Create New Entry</h2>
            <Button
              onClick={handleCreate}
              disabled={creating}
              size="sm"
              className="h-9 w-9 rounded-full p-0"
            >
              {creating ? <Plus className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              <span className="sr-only">Create entry</span>
            </Button>
          </div>

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
              placeholder="add content..."
            />
          </div>
          {createError && (
            <div className="bg-destructive/10 text-destructive rounded-md p-3 text-sm">
              {createError}
            </div>
          )}
        </CardContent>
      </Card>

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
            <Card
              key={entry.id}
              className="flex min-h-[80px] cursor-pointer items-center overflow-hidden transition-shadow hover:shadow-md"
            >
              <CardContent className="w-full p-0">
                <div className="flex items-center p-6">
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-lg font-medium">{entry.title || "Untitled"}</h3>
                    <div className="text-muted-foreground mt-1 text-sm">
                      <Markdown>{entry.content}</Markdown>
                    </div>
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
          ))
        )}
      </div>
    </div>
  );
}
