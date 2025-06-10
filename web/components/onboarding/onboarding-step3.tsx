"use client";

import { TiptapEditor } from "@/components/entries/tiptap-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFirstEntry } from "@/lib/actions/onboarding-actions";
import { useState, useTransition } from "react";

interface Props {
  journalName: string;
  onSuccess: () => void;
}

export function OnboardingStep3({ journalName, onSuccess }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        await createFirstEntry({ title, content });
        setTitle("");
        setContent("");
        onSuccess(); // go to next step
      } catch (err: any) {
        setError(err.message || "Failed to save entry");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6 text-left">
      <h2 className="text-center text-xl font-medium">Add Entry to {journalName}</h2>
      <p className="text-muted-foreground mx-auto max-w-md text-center">
        Start writing anything that's on your mind. You can edit or delete it later.
      </p>
      <div className="grid gap-4">
        <Label htmlFor="entryTitle">Entry Title</Label>
        <Input
          id="entryTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Entry title"
          required
          disabled={isPending}
        />
      </div>
      <div className="grid gap-4">
        <Label htmlFor="entryContent">Entry Content</Label>
        <div className="min-h-[160px] rounded-md border p-2">
          <TiptapEditor
            content={content}
            onChange={setContent}
            placeholder="Write your entry here..."
          />
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="text-center">
        <Button type="submit" disabled={isPending || !title.trim() || !content.trim()}>
          {isPending ? "Saving..." : "Save Entry"}
        </Button>
      </div>
    </form>
  );
}
