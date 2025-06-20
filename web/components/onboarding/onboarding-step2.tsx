"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEFAULT_JOURNAL_COLOR } from "@/constants/journal-colors";
import { createFirstJournal } from "@/lib/actions/onboarding-actions";
import { createJournalSchema, MAX_TITLE_LENGTH } from "@/lib/validators/journal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import type * as z from "zod";

interface OnboardingStep2Props {
  onSuccess: (journalName: string) => void;
}

type FormData = z.infer<typeof createJournalSchema>;

export function OnboardingStep2({ onSuccess }: OnboardingStep2Props) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormData>({
    resolver: zodResolver(createJournalSchema),
    defaultValues: {
      title: "",
      description: "",
      color: DEFAULT_JOURNAL_COLOR
    }
  });

  const title = useWatch({ control: form.control, name: "title" }) || "";

  async function handleSubmit(values: FormData) {
    startTransition(async () => {
      try {
        const journal = await createFirstJournal(values);
        onSuccess(journal.title);
      } catch (err) {
        form.setError("title", { message: "Failed to create journal" });
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex h-full w-full flex-col justify-center text-center"
      >
        <div className="flex grow flex-col items-center justify-center space-y-4 px-8">
          <div className="max-w-md space-y-2">
            <h2 className="text-xl font-medium">Name Your Journal</h2>
            <p className="text-muted-foreground">
              Give your journal a name. You can change this later.
            </p>
          </div>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full max-w-sm space-y-2 text-left">
                <Label htmlFor="journalName">Journal Name</Label>
                <FormControl>
                  <Input
                    id="journalName"
                    placeholder="My Journal"
                    autoComplete="off"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <div
                  className={`text-right text-sm ${
                    title.length > MAX_TITLE_LENGTH ? "text-red-500" : "text-muted-foreground"
                  }`}
                >
                  {title.length}/{MAX_TITLE_LENGTH}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isPending || title.trim() === ""}
            className="cursor-pointer"
          >
            {isPending ? "Saving..." : "Next"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
