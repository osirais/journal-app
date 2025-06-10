"use client";

import { OnboardingStep1 } from "@/components/onboarding/onboarding-step1";
import { OnboardingStep2 } from "@/components/onboarding/onboarding-step2";
import { OnboardingStep3 } from "@/components/onboarding/onboarding-step3";
import { OnboardingStep4 } from "@/components/onboarding/onboarding-step4";
import { OnboardingStep5 } from "@/components/onboarding/onboarding-step5";
import { OnboardingStep6 } from "@/components/onboarding/onboarding-step6";
import { OnboardingStep7 } from "@/components/onboarding/onboarding-step7";
import { OnboardingStep8 } from "@/components/onboarding/onboarding-step8";
import { OnboardingStep9 } from "@/components/onboarding/onboarding-step9";
import { Progress } from "@/components/ui/progress";
import { completeOnboarding } from "@/lib/actions/onboarding-actions";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, useTransition } from "react";

export function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;
  const router = useRouter();

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const progress = (currentStep / totalSteps) * 100;

  const [state, action] = useActionState(completeOnboarding, null);
  const [_, startTransition] = useTransition();

  const [journalName, setJournalName] = useState<string | null>(null);

  const handleFinish = () => {
    startTransition(() => {
      action();
    });
  };

  useEffect(() => {
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
        return <OnboardingStep6 onSuccess={nextStep} />;
      case 7:
        return <OnboardingStep7 onSuccess={nextStep} />;
      case 8:
        return <OnboardingStep8 onSuccess={nextStep} />;
      case 9:
        return <OnboardingStep9 onSuccess={handleFinish} />;
      default:
        return null;
    }
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      position: "absolute" as const,
      width: "100%"
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative" as const,
      width: "100%"
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      position: "absolute" as const,
      width: "100%"
    })
  };

  const [direction, setDirection] = useState(0);
  useEffect(() => {
    setDirection((prev) => (currentStep > prev ? 1 : -1));
  }, [currentStep]);

  return (
    <div className="bg-background text-foreground flex h-screen w-full flex-col overflow-hidden">
      <div className="relative flex flex-1 items-center justify-center overflow-y-auto py-8">
        <div className="mb-12 w-full max-w-4xl px-8 text-center">
          <h1 className="mb-2 text-3xl font-semibold">Welcome</h1>

          <div className="relative flex min-h-[300px] w-full items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "tween", duration: 0.4 }}
              >
                {getStepComponent(currentStep)}
              </motion.div>
            </AnimatePresence>
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
