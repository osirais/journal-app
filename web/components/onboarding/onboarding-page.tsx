"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { completeOnboarding } from "@/lib/actions/onboarding-actions";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useActionState } from "react";

export function OnboardingPage() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const totalSteps = 4;

  const router = useRouter();

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = (currentStep / totalSteps) * 100;

  const [state, action, isPending] = useActionState(completeOnboarding, null);
  const [isTransitioning, startTransition] = React.useTransition();

  const handleFinish = () => {
    startTransition(() => {
      action();
    });
  };

  React.useEffect(() => {
    if (state?.success) {
      router.push("/dashboard");
    }
  }, [state, router]);

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-2xl font-semibold">Welcome</h1>
              <p className="text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </p>
            </div>
            <div className="mb-8 flex min-h-[300px] items-center justify-center">
              <div className="space-y-4 text-center">
                <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                  <span className="text-primary text-2xl font-semibold">{currentStep}</span>
                </div>
                <h2 className="text-xl font-medium">
                  {currentStep === 1 && "Getting Started"}
                  {currentStep === 2 && "Setup Your Profile"}
                  {currentStep === 3 && "Choose Preferences"}
                  {currentStep === 4 && "You're All Set!"}
                </h2>
                <p className="text-muted-foreground max-w-md">
                  {currentStep === 1 && "Let's begin your journey with us."}
                  {currentStep === 2 && "Tell us a bit about yourself."}
                  {currentStep === 3 && "Customize your experience."}
                  {currentStep === 4 && "Ready to start using the platform."}
                </p>
              </div>
            </div>
            <div className="mb-6 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex cursor-pointer items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>

              {currentStep < totalSteps ? (
                <Button onClick={nextStep} className="flex cursor-pointer items-center gap-2">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleFinish}
                  disabled={isPending || isTransitioning}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <Check className="h-4 w-4" />
                  {isPending || isTransitioning ? "Completing..." : "Finish"}
                </Button>
              )}
            </div>
            {state && !state.success && (
              <div className="mt-4 text-center text-sm text-red-500">{state.message}</div>
            )}
            <div className="space-y-2">
              <div className="text-muted-foreground flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
