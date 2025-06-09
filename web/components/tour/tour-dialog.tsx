"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useNextStep } from "nextstepjs";
import { useState } from "react";

export default function TourDialog() {
  const [open, setOpen] = useState(true);
  const { startNextStep } = useNextStep();

  const handleStartTour = () => {
    startNextStep("mainTour");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
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
