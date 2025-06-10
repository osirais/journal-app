"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { updateMood } from "@/lib/actions/mood-actions";
import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";

const moods = [
  { emoji: "😢", label: "Very Sad", scale: 1 },
  { emoji: "😕", label: "Sad", scale: 2 },
  { emoji: "😐", label: "Neutral", scale: 3 },
  { emoji: "🙂", label: "Happy", scale: 4 },
  { emoji: "😄", label: "Very Happy", scale: 5 }
] as const;

export function OnboardingStep5() {
  const [isPending, startTransition] = useTransition();
  const [optimisticMood, setOptimisticMood] = useOptimistic<number | null, number | null>(
    null,
    () => null
  );

  const selectedMoodLabel = optimisticMood
    ? moods.find((m) => m.scale === optimisticMood)?.label
    : undefined;

  const handleMoodChange = (moodLabel: string) => {
    const mood = moods.find((m) => m.label === moodLabel);
    if (!mood) return;

    startTransition(async () => {
      setOptimisticMood(mood.scale);
      const result = await updateMood(mood.scale);

      if (!result.success) {
        setOptimisticMood(null);
        toast.error(result.error || "Failed to update mood");
      }
    });
  };

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
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
  );
}
