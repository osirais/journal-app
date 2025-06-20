"use client";

import { ReasonCard } from "@/components/reasons/reason-card";
import { ReasonCardSkeleton } from "@/components/reasons/reason-card-skeleton";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useReasonCallbackStore } from "@/hooks/use-reason-callback-store";
import { createReason } from "@/lib/actions/reason-actions";
import { createReasonSchema, MAX_REASON_TEXT_LENGTH } from "@/lib/validators/reasons";
import { Reason } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

type ReasonsPageProps = {
  initialReasons: Reason[];
};

export function ReasonsPage({ initialReasons }: ReasonsPageProps) {
  const [reasons, setReasons] = useState<Reason[]>(initialReasons);
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);

  const form = useForm<z.infer<typeof createReasonSchema>>({
    resolver: zodResolver(createReasonSchema),
    defaultValues: {
      text: ""
    }
  });

  const text = form.watch("text") || "";

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAdd = (values: z.infer<typeof createReasonSchema>) => {
    startTransition(async () => {
      try {
        const newReason = await createReason(values.text);
        if (newReason) {
          setReasons((prev) => [newReason, ...prev]);
          form.reset();
        }
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAdd)} className="space-y-2">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter a reason..."
                    {...field}
                    disabled={isPending}
                    autoComplete="off"
                  />
                </FormControl>
                <div
                  className={`text-right text-sm ${
                    text.length > MAX_REASON_TEXT_LENGTH ? "text-red-500" : "text-muted-foreground"
                  }`}
                >
                  {text.length}/{MAX_REASON_TEXT_LENGTH}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? "Adding..." : "Add"}
          </Button>
        </form>
      </Form>

      <div className="grid grid-cols-1 gap-4">
        {!mounted
          ? Array.from({ length: 3 }).map((_, i) => <ReasonCardSkeleton key={i} />)
          : reasons.map((reason) => <ReasonCard key={reason.id} reason={reason} />)}
      </div>
    </main>
  );
}
