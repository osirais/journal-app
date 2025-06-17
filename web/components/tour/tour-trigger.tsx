"use client";

import { useDialogStore } from "@/hooks/use-dialog-store";
import { useEffect } from "react";

interface TourTriggerProps {
  shouldTrigger: boolean;
}

export function TourTrigger({ shouldTrigger }: TourTriggerProps) {
  const dialog = useDialogStore();

  useEffect(() => {
    if (shouldTrigger) dialog.open("tour");
  }, [shouldTrigger, dialog]);

  return null;
}
