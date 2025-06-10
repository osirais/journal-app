"use client";

import { OnboardingStep1 } from "@/components/onboarding/onboarding-step1";
import { OnboardingStep2 } from "@/components/onboarding/onboarding-step2";
import { OnboardingStep3 } from "@/components/onboarding/onboarding-step3";
import { OnboardingStep4 } from "@/components/onboarding/onboarding-step4";
import { OnboardingStep5 } from "@/components/onboarding/onboarding-step5";
import { OnboardingStep6 } from "@/components/onboarding/onboarding-step6";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { completeOnboarding } from "@/lib/actions/onboarding-actions";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useActionState } from "react";

export function OnboardingPage() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const totalSteps = 6;

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

  function getStepComponent(step: number) {
    switch (step) {
      case 1:
        return <OnboardingStep1 />;
      case 2:
        return <OnboardingStep2 onSuccess={nextStep} />;
      case 3:
        return <OnboardingStep3 />;
      case 4:
        return <OnboardingStep4 />;
      case 5:
        return <OnboardingStep5 />;
      case 6:
        return <OnboardingStep6 />;
      default:
        return null;
    }
  }

  return (
    <div className="bg-background text-foreground flex h-screen w-full flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-8 pt-20">
        <div className="mb-12 text-center">
          <h1 className="mb-2 text-3xl font-semibold">Welcome</h1>
        </div>
        <div className="mx-auto flex w-full max-w-4xl items-center justify-center">
          <div className="w-full">{getStepComponent(currentStep)}</div>
        </div>
        {state && !state.success && (
          <div className="mt-4 text-center text-sm text-red-500">{state.message}</div>
        )}
      </div>
      <div className="fixed bottom-0 flex w-full flex-col items-center pb-6">
        <div className="mb-2 flex w-full max-w-4xl items-center justify-between px-8">
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
        <div className="w-full max-w-4xl px-8 pb-20">
          <div className="text-muted-foreground mb-1 flex justify-between text-sm">
            <span>Progress</span>
            <span>
              {currentStep} / {totalSteps}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>
    </div>
  );
}
