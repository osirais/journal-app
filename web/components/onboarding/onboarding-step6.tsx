"use client";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { createFirstMoodEntry } from "@/lib/actions/onboarding-actions";
import { updateMoodSchema } from "@/lib/validators/mood";
import { useOptimistic, useState, useTransition } from "react";
import { toast } from "sonner";

const moods = [
  { emoji: "😢", label: "Very Sad", scale: 1 },
  { emoji: "😕", label: "Sad", scale: 2 },
  { emoji: "😐", label: "Neutral", scale: 3 },
  { emoji: "🙂", label: "Happy", scale: 4 },
  { emoji: "😄", label: "Very Happy", scale: 5 }
] as const;

interface OnboardingStep6Props {
  onSuccess: () => void;
}

export function OnboardingStep6({ onSuccess }: OnboardingStep6Props) {
  const [isPending, startTransition] = useTransition();
  const [optimisticMood, setOptimisticMood] = useOptimistic<number | null, number | null>(
    null,
    () => null
  );
  const [moodSaved, setMoodSaved] = useState(false);

  const selectedMoodLabel = optimisticMood
    ? moods.find((m) => m.scale === optimisticMood)?.label
    : undefined;

  const handleMoodChange = (moodLabel: string) => {
    const mood = moods.find((m) => m.label === moodLabel);
    if (!mood) return;

    const validation = updateMoodSchema.safeParse({ scale: mood.scale });

    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    startTransition(async () => {
      setOptimisticMood(mood.scale);
      try {
        await createFirstMoodEntry(mood.scale);
        setMoodSaved(true);
      } catch (err) {
        setOptimisticMood(null);
        toast.error((err as Error).message || "Failed to save mood");
      }
    });
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex grow flex-col items-center justify-center space-y-4 px-8 text-center">
        <h2 className="text-xl font-medium">Mood</h2>
        <p className="text-muted-foreground max-w-md">How are you feeling today?</p>
        <ToggleGroup
          type="single"
          value={selectedMoodLabel}
          onValueChange={handleMoodChange}
          className="flex gap-3"
          disabled={isPending}
        >
          {moods.map((mood) => (
            <ToggleGroupItem
              key={mood.label}
              value={mood.label}
              aria-label={mood.label}
              className="data-[state=on]:border-primary hover:bg-accent hover:text-accent-foreground h-12 w-12 cursor-pointer rounded-lg border text-xl transition-colors disabled:opacity-50"
            >
              {mood.emoji}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="flex justify-end p-4">
        <Button onClick={onSuccess} disabled={!moodSaved} className="cursor-pointer">
          Next
        </Button>
      </div>
    </div>
  );
}
