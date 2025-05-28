"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { updateMood } from "@/lib/actions/mood-actions";
import { receiveReward } from "@/utils/receive-reward";
import { receiveStamps } from "@/utils/receive-stamps";
import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";

const moods = [
  { emoji: "😢", label: "Very Sad", scale: 1 },
  { emoji: "😕", label: "Sad", scale: 2 },
  { emoji: "😐", label: "Neutral", scale: 3 },
  { emoji: "🙂", label: "Happy", scale: 4 },
  { emoji: "😄", label: "Very Happy", scale: 5 }
] as const;

interface MoodCardCSRProps {
  initialMood: number | null;
  eligible: boolean;
  streak: number;
}

export function MoodCardCSR({ initialMood, eligible, streak }: MoodCardCSRProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticMood, setOptimisticMood] = useOptimistic(initialMood);

  const selectedMoodLabel = optimisticMood
    ? moods.find((mood) => mood.scale === optimisticMood)?.label
    : undefined;

  const handleMoodChange = (moodLabel: string) => {
    if (!moodLabel) return;

    const selectedMood = moods.find((mood) => mood.label === moodLabel);
    if (!selectedMood) return;

    startTransition(async () => {
      setOptimisticMood(selectedMood.scale);

      const result = await updateMood(selectedMood.scale);

      if (!result.success) {
        setOptimisticMood(initialMood);
        toast.error(result.error || "Failed to update mood");
      } else if (result.reward) {
        receiveReward(`Daily mood entry reward: +${result.reward} stamps!`, result.streak);
      }
    });
  };

  const message = eligible
    ? "✅ You can claim your daily +1 stamp"
    : "🕒 You've already claimed your reward today";

  const streakPercent = Math.min((streak / 7) * 100, 100); // 7-day goal

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mood</CardTitle>
        <CardDescription>Describe your mood today</CardDescription>
      </CardHeader>
      <CardContent className="grid place-items-center gap-4">
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
        <div className="grid w-full max-w-xs place-items-center gap-6">
          <p className="text-center text-sm font-medium">{message}</p>
          <p className="text-muted-foreground text-center text-xs font-semibold">
            Current streak: {streak} day{streak !== 1 ? "s" : ""}
          </p>
          <div className="bg-muted relative h-2 w-full overflow-hidden rounded-full">
            <div
              className="bg-primary absolute left-0 top-0 h-2 rounded-full transition-all duration-300"
              style={{ width: `${streakPercent}%` }}
              aria-label={`Streak progress: ${streakPercent}%`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
