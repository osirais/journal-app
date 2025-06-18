import { Button } from "@/components/ui/button";

interface OnboardingStep1Props {
  onSuccess: () => void;
}

export function OnboardingStep1({ onSuccess }: OnboardingStep1Props) {
  return (
    <div className="flex h-full w-full flex-col justify-center text-center">
      <div className="flex grow flex-col items-center justify-center space-y-2">
        <h2 className="text-xl font-medium">Getting Started</h2>
        <p className="text-muted-foreground max-w-md">Let's begin your journey with us.</p>
      </div>
      <div className="flex justify-end">
        <Button onClick={onSuccess} className="cursor-pointer">
          Next
        </Button>
      </div>
    </div>
  );
}
