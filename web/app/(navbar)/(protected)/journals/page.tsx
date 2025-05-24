"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { formatDateAgo } from "@/utils/format-date-ago";
import axios from "axios";
import { CalendarIcon, Clock, FileEdit, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Journal = {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  created_at: string;
  updated_at: string;
};

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
          title,
          description,
          thumbnail_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
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
        ) : journals.length === 0 ? (
          <div className="text-muted-foreground py-12 text-center">
            No journals found. Create your first journal to get started.
          </div>
        ) : (
          journals.map((journal) => (
            <Link key={journal.id} href={`/journal/${journal.id}`} className="block">
              <Card className="flex min-h-[80px] cursor-pointer items-center overflow-hidden transition-shadow hover:shadow-md">
                <CardContent className="w-full p-0">
                  <div className="flex items-center p-6">
                    {journal.thumbnail_url ? (
                      <div className="mr-4 h-16 w-16 flex-shrink-0 overflow-hidden rounded">
                        <img
                          src={journal.thumbnail_url}
                          alt=""
                          className="h-16 w-16 object-cover"
                        />
                      </div>
                    ) : (
                      <div className="bg-muted mr-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded">
                        <FileEdit className="text-muted-foreground h-8 w-8" />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-lg font-medium">{journal.title}</h3>

                      {journal.description && (
                        <p className="text-muted-foreground mt-1 line-clamp-1 text-sm">
                          {journal.description}
                        </p>
                      )}

                      <div className="text-muted-foreground mt-2 flex items-center gap-4 text-xs">
                        <div className="flex items-center">
                          <CalendarIcon className="mr-1 h-3 w-3" />
                          <span>Created {formatDateAgo(new Date(journal.created_at))}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>Updated {formatDateAgo(new Date(journal.updated_at))}</span>
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
