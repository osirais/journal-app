"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface OnboardingStep7Props {
  onSuccess: () => void;
}

export function OnboardingStep7({ onSuccess }: OnboardingStep7Props) {
  const [reminder, setReminder] = useState("");

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex-grow space-y-4 px-8 text-center">
        <h2 className="text-xl font-medium">Set Your Intention</h2>
        <p className="text-muted-foreground mx-auto max-w-md">
          Take a moment to write a personal reminder for why you started this journey. This message
          will appear on your dashboard to keep you focused and inspired.
        </p>
        <div className="mx-auto max-w-sm space-y-2 text-left">
          <Label htmlFor="reminder">Your Why</Label>
          <Input
            id="reminder"
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
            placeholder=""
            autoComplete="off"
          />
        </div>
      </div>
      <div className="flex justify-end p-4">
        <Button onClick={onSuccess} disabled={reminder.trim() === ""} className="cursor-pointer">
          Next
        </Button>
      </div>
    </div>
  );
}
