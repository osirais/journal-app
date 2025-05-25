"use client";

import { JournalCard } from "@/components/journal-card";
import { JournalCardSkeleton } from "@/components/journal-card-skeleton";
import { SortDropdown } from "@/components/sort-dropdown";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Journal } from "@/types";
import axios from "axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function JournalsPage() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    axios
      .get("/api/journals")
      .then((res) => {
        setJournals(res.data.journals || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Failed to load journals");
        setLoading(false);
      });
  }, []);

  const handleCreate = async () => {
    if (!title.trim()) {
      setCreateError("Title is required");
      return;
    }

    setCreating(true);
    setCreateError(null);

    try {
      await axios.post("/api/journals", { title, description });
      setJournals((prev) => [
        {
          id: "temp_" + Math.random(),
          author_id: "temp",
          title,
          description,
          thumbnail_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null
        },
        ...prev
      ]);
      setTitle("");
      setDescription("");
      setDialogOpen(false);

      axios.get("/api/journals").then((res) => {
        setJournals(res.data.journals || []);
      });
    } catch (err: any) {
      setCreateError(err.response?.data?.error || "Failed to create journal");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <h1 className="mb-2 text-3xl font-bold">Journals</h1>
      <p className="text-muted-foreground mb-6">Your collection of journals</p>

      {error && (
        <div className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Create New Journal</h2>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="h-9 w-9 cursor-pointer rounded-full p-0"
              onClick={() => setDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Open create journal dialog</span>
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Journal</DialogTitle>
          </DialogHeader>

          <div className="grid grid-flow-row gap-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter journal title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={creating}
              required
            />

            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="Enter journal description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={creating}
              className="resize-none"
              rows={3}
            />

            {createError && (
              <div className="bg-destructive/10 text-destructive rounded-md p-3 text-sm">
                {createError}
              </div>
            )}
          </div>

          <DialogFooter className="mt-4">
            <Button onClick={handleCreate} disabled={creating} className="cursor-pointer">
              {creating ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mb-6">
        <SortDropdown onSortChange={() => {}} defaultSort="work-in-progress" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <JournalCardSkeleton key={i} />)
        ) : journals.length === 0 ? (
          <div className="text-muted-foreground py-12 text-center">
            No journals found. Create your first journal to get started.
          </div>
        ) : (
          journals.map((journal) => <JournalCard key={journal.id} journal={journal} />)
        )}
      </div>
    </div>
  );
}
