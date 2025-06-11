"use client";

import { TiptapEditor } from "@/components/entries/tiptap-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFirstEntry } from "@/lib/actions/onboarding-actions";
import { useState, useTransition } from "react";

interface OnboardingStep3Props {
  journalName: string;
  onSuccess: () => void;
}

export function OnboardingStep3({ journalName, onSuccess }: OnboardingStep3Props) {
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
        onSuccess();
      } catch (err: any) {
        setError(err.message || "Failed to save entry");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex h-full w-full flex-col">
      <div className="flex-grow overflow-auto px-8 py-6">
        <h2 className="text-center text-xl font-medium">Add Entry to {journalName}</h2>
        <p className="text-muted-foreground mx-auto max-w-md text-center">
          Start writing anything that's on your mind. You can edit or delete it later.
        </p>
        <div className="mx-auto mt-6 grid max-w-sm gap-4">
          <Label htmlFor="entryTitle">Entry Title</Label>
          <Input
            id="entryTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Entry title"
            required
            disabled={isPending}
            autoComplete="off"
          />
        </div>
        <div className="mx-auto mt-6 grid max-w-sm gap-4">
          <Label htmlFor="entryContent">Entry Content</Label>
          <div className="min-h-[160px] rounded-md border p-2 text-left">
            <TiptapEditor
              content={content}
              onChange={setContent}
              placeholder="Write your entry here..."
            />
          </div>
        </div>
        {error && <p className="mx-auto mt-2 max-w-sm text-sm text-red-500">{error}</p>}
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isPending || !title.trim() || !content.trim()}
          className="cursor-pointer"
        >
          {isPending ? "Saving..." : "Next"}
        </Button>
      </div>
    </form>
  );
}
