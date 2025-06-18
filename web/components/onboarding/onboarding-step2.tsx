"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFirstJournal } from "@/lib/actions/onboarding-actions";
import { useState, useTransition } from "react";

interface OnboardingStep2Props {
  onSuccess: (journalName: string) => void;
}

export function OnboardingStep2({ onSuccess }: OnboardingStep2Props) {
  const [journalName, setJournalName] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        const journal = await createFirstJournal({ title: journalName });
        onSuccess(journal.title);
      } catch {
        setError("Failed to create journal");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full w-full flex-col justify-center text-center"
    >
      <div className="flex grow flex-col items-center justify-center space-y-4 px-8">
        <div className="max-w-md space-y-2">
          <h2 className="text-xl font-medium">Name Your Journal</h2>
          <p className="text-muted-foreground">
            Give your journal a name. You can change this later.
          </p>
        </div>
        <div className="w-full max-w-sm space-y-2 text-left">
          <Label htmlFor="journalName">Journal Name</Label>
          <Input
            id="journalName"
            value={journalName}
            onChange={(e) => setJournalName(e.target.value)}
            placeholder="My Journal"
            autoComplete="off"
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isPending || journalName.trim() === ""}
          className="cursor-pointer"
        >
          {isPending ? "Saving..." : "Next"}
        </Button>
      </div>
    </form>
  );
}
