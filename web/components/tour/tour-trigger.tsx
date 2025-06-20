"use client";

import { useDialogStore } from "@/hooks/use-dialog-store";
import { useEffect, useRef } from "react";

interface TourTriggerProps {
  shouldTrigger: boolean;
}

export function TourTrigger({ shouldTrigger }: TourTriggerProps) {
  const dialog = useDialogStore();
  const hasRun = useRef(false);

  useEffect(() => {
    if (shouldTrigger && !hasRun.current) {
      hasRun.current = true;
      dialog.open("tour");
    }
  }, [shouldTrigger, dialog]);

  return null;
}
