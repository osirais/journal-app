"use client";

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
import type { JournalWithEntryCount } from "@/types";
import axios from "axios";
import { Plus } from "lucide-react";
import { useState } from "react";

interface CreateJournalDialogProps {
  onJournalCreated: (journal: JournalWithEntryCount) => void;
}

export function CreateJournalDialog({ onJournalCreated }: CreateJournalDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) {
      setCreateError("Title is required");
      return;
    }

    setCreating(true);
    setCreateError(null);

    try {
      const res = await axios.post("/api/journals", { title, description });
      onJournalCreated(res.data.journal);
      setTitle("");
      setDescription("");
      setDialogOpen(false);
    } catch (err: any) {
      setCreateError(err.response?.data?.error || "Failed to create journal");
    } finally {
      setCreating(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Create New Journal</h2>
        <DialogTrigger asChild>
          <Button
            size="sm"
            className="size-9 cursor-pointer rounded-full p-0"
            onClick={() => setDialogOpen(true)}
          >
            <Plus className="size-4" />
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
  );
}
