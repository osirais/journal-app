"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useNextStep } from "nextstepjs";
import { useEffect, useState } from "react";

type TourDialogProps = {
  completedTour: boolean;
};

export default function TourDialog({ completedTour }: TourDialogProps) {
  const [open, setOpen] = useState(false);
  const { startNextStep } = useNextStep();

  useEffect(() => {
    if (!completedTour) {
      setOpen(true);
    }
  }, [completedTour]);

  const handleStartTour = () => {
    startNextStep("mainTour");
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="pointer-events-auto"
      >
        <DialogTitle>Welcome to the Tour</DialogTitle>
        <DialogDescription>
          Click the button below to begin your walkthrough of the app.
        </DialogDescription>
        <Button onClick={handleStartTour} className="cursor-pointer">
          Start Tour
        </Button>
      </DialogContent>
    </Dialog>
  );
}
