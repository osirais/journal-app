"use client";

import { Card } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { FC } from "react";
import { useState } from "react";

export const dynamic = "force-dynamic";

const moods = [
  { emoji: "😢", label: "Very Sad" },
  { emoji: "😕", label: "Sad" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "🙂", label: "Happy" },
  { emoji: "😄", label: "Very Happy" }
] as const;

export const MoodCard: FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | undefined>(undefined);

  return (
    <Card className="p-6">
      <h3 className="mb-3 text-lg font-semibold">Mood</h3>
      <p className="mb-6 text-center text-sm text-white">Describe your mood today</p>
      <div className="grid h-full place-items-center">
        <ToggleGroup
          type="single"
          value={selectedMood}
          onValueChange={setSelectedMood}
          className="flex gap-3"
        >
          {moods.map((mood) => (
            <ToggleGroupItem
              key={mood.label}
              value={mood.label}
              aria-label={mood.label}
              className="data-[state=on]:border-primary hover:bg-accent hover:text-accent-foreground h-12 w-12 cursor-pointer rounded-lg border text-xl transition-colors"
            >
              {mood.emoji}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </Card>
  );
};
