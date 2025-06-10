"use client";

import { Button } from "@/components/ui/button";
import { Droplet } from "lucide-react";

interface OnboardingStep6Props {
  onSuccess: () => void;
}

export function OnboardingStep6({ onSuccess }: OnboardingStep6Props) {
  return (
    <div className="flex h-full w-full flex-col justify-center px-8 text-center">
      <div className="flex flex-grow flex-col items-center justify-center space-y-4">
        <Droplet size={48} className="text-white" />
        <p className="max-w-md text-white">
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
