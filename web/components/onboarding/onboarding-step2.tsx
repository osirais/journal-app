"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFirstJournal } from "@/lib/actions/onboarding-actions";
import { useState, useTransition } from "react";

interface Props {
  onSuccess: (journalName: string) => void;
}

export function OnboardingStep2({ onSuccess }: Props) {
  const [journalName, setJournalName] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        const journal = await createFirstJournal({ title: journalName });
        onSuccess(journal.title); // go to next step
      } catch (err) {
        setError("Failed to create journal");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-center">
      <h2 className="text-xl font-medium">Name Your Journal</h2>
      <p className="text-muted-foreground mx-auto max-w-md">
        Give your journal a name. You can change this later.
      </p>
      <div className="mx-auto max-w-sm space-y-2 text-left">
        <Label htmlFor="journalName">Journal Name</Label>
        <Input
          id="journalName"
          value={journalName}
          onChange={(e) => setJournalName(e.target.value)}
          placeholder="My Journal"
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button
        type="submit"
        disabled={isPending || journalName.trim() === ""}
        className="cursor-pointer"
      >
        {isPending ? "Creating..." : "Create Journal"}
      </Button>
    </form>
  );
}
