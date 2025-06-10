"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function OnboardingStep2() {
  const [journalName, setJournalName] = useState("");

  return (
    <div className="space-y-4 text-center">
      <h2 className="text-xl font-medium">Name Your Journal</h2>
      <p className="text-muted-foreground mx-auto max-w-md">
        Give your journal a name. You can change this later.
      </p>
      <div className="mx-auto max-w-sm space-y-2 text-left">
        <Label htmlFor="journalName">Journal Name</Label>
        <Input
          id="journalName"
          value={journalName}
          onChange={(e) => setJournalName(e.target.value)}
          placeholder="My Journal"
        />
      </div>
    </div>
  );
}
