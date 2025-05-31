"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DAILY_MOOD_ENTRY_REWARD } from "@/constants/rewards";
import { updateMood } from "@/lib/actions/mood-actions";
import { receiveReward } from "@/utils/receive-reward";
import { FlameIcon as FireIcon } from "lucide-react";
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
        receiveReward(`Daily mood entry reward: +${result.reward} droplets!`, result.streak);
      }
    });
  };

  const message = eligible
    ? `✅ You can claim your daily +${DAILY_MOOD_ENTRY_REWARD} droplet`
    : "🕒 You've already claimed your reward today";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Mood</CardTitle>
          <CardDescription>Describe your mood today</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid place-items-center gap-4">
        <div className="mr-auto w-max">
          {streak > 0 && (
            <div className="flex items-center gap-1 rounded-md bg-amber-100 px-2 py-1 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400">
              <FireIcon className="h-4 w-4" />
              <span className="text-sm font-medium">{streak} day streak</span>
            </div>
          )}
        </div>
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
        <p className="text-center text-sm font-medium">{message}</p>
      </CardContent>
    </Card>
  );
}
