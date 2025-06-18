"use client";

import { ReasonCard } from "@/components/reasons/reason-card";
import { ReasonCardSkeleton } from "@/components/reasons/reason-card-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useReasonCallbackStore } from "@/hooks/use-reason-callback-store";
import { createReason } from "@/lib/actions/reason-actions";
import { Reason } from "@/types";
import { useEffect, useState, useTransition } from "react";

type ReasonsPageProps = {
  initialReasons: Reason[];
};

export function ReasonsPage({ initialReasons }: ReasonsPageProps) {
  const [reasons, setReasons] = useState<Reason[]>(initialReasons);
  const [inputText, setInputText] = useState("");
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText.trim().length === 0) return;

    startTransition(async () => {
      try {
        await createReason(inputText);
        setInputText("");
      } catch (error) {
        console.error(error);
      }
    });
  };

  const setOnReasonDeleted = useReasonCallbackStore((s) => s.setOnReasonDeleted);

  const refreshReasonsAfterDeleted = (id: string) => {
    setReasons((prev) => prev.filter((r) => r.id !== id));
  };

  useEffect(() => {
    setOnReasonDeleted(refreshReasonsAfterDeleted);
  }, [setOnReasonDeleted]);

  return (
    <main className="container max-w-3xl space-y-6 py-10">
      <h1 className="text-3xl font-semibold">Your Reasons</h1>
      <form onSubmit={handleAdd} className="flex gap-4">
        <Input
          name="text"
          placeholder="Enter a reason..."
          required
          disabled={isPending}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <Button type="submit" disabled={isPending} className="cursor-pointer">
          {isPending ? "Adding..." : "Add"}
        </Button>
      </form>
      <div className="grid grid-cols-1 gap-4">
        {!mounted
          ? Array.from({ length: 3 }).map((_, i) => <ReasonCardSkeleton key={i} />)
          : reasons.map((reason) => <ReasonCard key={reason.id} reason={reason} />)}
      </div>
    </main>
  );
}
