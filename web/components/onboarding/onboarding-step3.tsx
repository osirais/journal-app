"use client";

import { TiptapEditor } from "@/components/entries/tiptap-editor";
import { Label } from "@/components/ui/label";

interface Props {
  journalName: string | null;
}

export function OnboardingStep3({ journalName }: Props) {
  return (
    <div className="space-y-4 text-center">
      <h2 className="text-xl font-medium">
        {journalName ? `Add Entry to ${journalName}` : "Create Your First Journal Entry"}
      </h2>
      <p className="text-muted-foreground mx-auto max-w-md">
        Start writing anything that's on your mind. You can edit or delete it later.
      </p>
      <div className="mx-auto max-w-2xl space-y-2 text-left">
        <Label>Journal Entry</Label>
        <div className="rounded-md border p-2">
          <TiptapEditor content="" />
        </div>
      </div>
    </div>
  );
}
