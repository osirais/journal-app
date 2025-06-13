"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { completeTour } from "@/lib/actions/tour-actions";
import { Step } from "nextstepjs";
import React, { useTransition } from "react";

interface ShadcnCustomCardProps {
  step: Step;
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  skipTour: () => void;
  arrow: React.ReactNode;
}

const ShadcnCustomCard = ({
  step,
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
  skipTour,
  arrow
}: ShadcnCustomCardProps) => {
  const [isPending, startTransition] = useTransition();

  const handleNextClick = () => {
    if (currentStep === totalSteps - 1) {
      startTransition(async () => {
        const result = await completeTour();
        if (result.success) {
          nextStep();
        } else {
          console.error(result.message);
        }
      });
    } else {
      nextStep();
    }
  };

  return (
    <Card className="fixed z-50 w-[350px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {step.icon && <span>{step.icon}</span>}
          {step.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2">{step.content}</div>
        {arrow}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-muted-foreground text-sm">
          {currentStep + 1} / {totalSteps}
        </div>
        <div className="flex gap-2">
          {currentStep > 0 && (
            <Button variant="outline" size="sm" onClick={prevStep} className="cursor-pointer">
              Previous
            </Button>
          )}
          <Button
            size="sm"
            onClick={handleNextClick}
            className="cursor-pointer"
            disabled={isPending}
          >
            {isPending ? "Loading..." : currentStep === totalSteps - 1 ? "Finish" : "Next"}
          </Button>
          {step.showSkip && (
            <Button variant="ghost" size="sm" onClick={skipTour} className="cursor-pointer">
              Skip
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ShadcnCustomCard;
