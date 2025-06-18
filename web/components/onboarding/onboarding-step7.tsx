"use client";

import { Button } from "@/components/ui/button";
import { Droplet } from "lucide-react";

interface OnboardingStep7Props {
  onSuccess: () => void;
}

export function OnboardingStep7({ onSuccess }: OnboardingStep7Props) {
  return (
    <div className="flex h-full w-full flex-col justify-center px-8 text-center">
      <div className="flex grow flex-col items-center justify-center space-y-4">
        <Droplet size={48} className="text-white" />
        <p className="text-muted-foreground max-w-md">
          You also get +1 droplet for creating a mood entry every day.
        </p>
      </div>
      <div className="flex justify-end">
        <Button onClick={onSuccess} className="cursor-pointer">
          Next
        </Button>
      </div>
    </div>
  );
}
