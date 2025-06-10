"use client";

import { Button } from "@/components/ui/button";
import { Droplet } from "lucide-react";

interface OnboardingStep4Props {
  onSuccess: () => void;
}

export function OnboardingStep4({ onSuccess }: OnboardingStep4Props) {
  return (
    <div className="flex h-full w-full flex-col justify-center px-8 text-center">
      <div className="flex flex-grow flex-col items-center justify-center space-y-4">
        <Droplet size={48} className="text-white" />
        <p className="max-w-md text-white">
          You got +5 droplets for creating a daily journal entry. Droplets are the currency that
          help make your tree grow.
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
