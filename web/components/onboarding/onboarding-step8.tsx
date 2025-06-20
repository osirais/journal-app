"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFirstReason } from "@/lib/actions/onboarding-actions";
import { createReasonSchema, MAX_REASON_TEXT_LENGTH } from "@/lib/validators/reasons";
import { useState } from "react";

interface OnboardingStep8Props {
  onSuccess: () => void;
}

export function OnboardingStep8({ onSuccess }: OnboardingStep8Props) {
  const [reminder, setReminder] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleNext() {
    setError(null);

    const parsed = createReasonSchema.safeParse({ text: reminder.trim() });
    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message || "Invalid input";
      setError(firstError);
      return;
    }

    setLoading(true);
    try {
      await createFirstReason(parsed.data.text);
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Failed to create reason");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="grow space-y-4 px-8 text-center">
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
            disabled={loading}
          />
          <div
            className={`text-right text-sm ${
              reminder.length > MAX_REASON_TEXT_LENGTH ? "text-red-500" : "text-muted-foreground"
            }`}
          >
            {reminder.length}/{MAX_REASON_TEXT_LENGTH}
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </div>
      <div className="flex justify-end p-4">
        <Button
          onClick={handleNext}
          disabled={reminder.trim() === "" || loading}
          className="cursor-pointer"
        >
          {loading ? "Saving..." : "Next"}
        </Button>
      </div>
    </div>
  );
}
