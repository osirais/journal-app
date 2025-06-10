"use client";

import { OnboardingStep1 } from "@/components/onboarding/onboarding-step1";
import { OnboardingStep2 } from "@/components/onboarding/onboarding-step2";
import { OnboardingStep3 } from "@/components/onboarding/onboarding-step3";
import { OnboardingStep4 } from "@/components/onboarding/onboarding-step4";
import { OnboardingStep5 } from "@/components/onboarding/onboarding-step5";
import { OnboardingStep6 } from "@/components/onboarding/onboarding-step6";
import { Progress } from "@/components/ui/progress";
import { completeOnboarding } from "@/lib/actions/onboarding-actions";
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

  const progress = (currentStep / totalSteps) * 100;

  const [state, action, isPending] = useActionState(completeOnboarding, null);
  const [isTransitioning, startTransition] = React.useTransition();

  const [journalName, setJournalName] = React.useState<string | null>(null);

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
        return <OnboardingStep1 onSuccess={nextStep} />;
      case 2:
        return (
          <OnboardingStep2
            onSuccess={(name) => {
              setJournalName(name);
              nextStep();
            }}
          />
        );
      case 3:
        return <OnboardingStep3 journalName={journalName!} onSuccess={nextStep} />;
      case 4:
        return <OnboardingStep4 onSuccess={nextStep} />;
      case 5:
        return <OnboardingStep5 onSuccess={nextStep} />;
      case 6:
        return <OnboardingStep6 onSuccess={handleFinish} />;
      default:
        return null;
    }
  }

  return (
    <div className="bg-background text-foreground flex h-screen w-full flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto pt-20">
        <div className="mb-12 text-center">
          <h1 className="mb-2 text-3xl font-semibold">Welcome</h1>
        </div>
        <div className="mx-auto max-w-4xl px-8">
          <div className="flex w-full items-center justify-center">
            {getStepComponent(currentStep)}
          </div>
          {state && !state.success && (
            <div className="mt-4 text-center text-sm text-red-500">{state.message}</div>
          )}
        </div>
      </div>
      <div className="bg-background fixed bottom-0 w-full pb-20">
        <div className="mx-auto max-w-4xl px-8">
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
