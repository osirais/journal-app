"use client";

import { TiptapEditor } from "@/components/entries/tiptap-editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createFirstEntry } from "@/lib/actions/onboarding-actions";
import {
  createEntrySchemaOnboarding,
  MAX_CONTENT_LENGTH,
  MAX_TITLE_LENGTH
} from "@/lib/validators/entry";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface OnboardingStep3Props {
  journalName: string;
  onSuccess: () => void;
}

export function OnboardingStep3({ journalName, onSuccess }: OnboardingStep3Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof createEntrySchemaOnboarding>>({
    resolver: zodResolver(createEntrySchemaOnboarding),
    defaultValues: {
      title: "",
      content: "",
      tags: []
    }
  });

  const title = useWatch({ control: form.control, name: "title" }) || "";
  const content = useWatch({ control: form.control, name: "content" }) || "";

  const handleSubmit = (values: z.infer<typeof createEntrySchemaOnboarding>) => {
    setError(null);

    startTransition(async () => {
      try {
        await createFirstEntry(values);
        form.reset();
        onSuccess();
      } catch (err: any) {
        setError(err.message || "Failed to save entry");
        toast.error(err.message || "Failed to save entry");
      }
    });
  };

  function onFormError(errors: any) {
    setError(errors[0]?.message || "Fix errors before submitting");
    toast.error("Please fix the form errors before submitting");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit, onFormError)}
        className="mx-auto flex h-full w-full flex-col"
      >
        <div className="grow overflow-auto px-8 py-6">
          <h2 className="text-center text-xl font-medium">Add Entry to {journalName}</h2>
          <p className="text-muted-foreground mx-auto max-w-md text-center">
            Start writing anything that's on your mind. You can edit or delete it later.
          </p>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="mx-auto mt-6 grid max-w-sm gap-1">
                <FormLabel>Entry Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Entry title"
                    disabled={isPending}
                    autoComplete="off"
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
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="mx-auto mt-6 grid max-w-sm gap-1">
                <FormLabel>Entry Content</FormLabel>
                <FormControl>
                  <div className="min-h-[160px] rounded-md border p-2 text-left">
                    <TiptapEditor
                      content={field.value}
                      onChange={field.onChange}
                      placeholder="Write your entry here..."
                    />
                  </div>
                </FormControl>
                <div
                  className={`text-right text-sm ${
                    content.length > MAX_CONTENT_LENGTH ? "text-red-500" : "text-muted-foreground"
                  }`}
                >
                  {content.length}/{MAX_CONTENT_LENGTH}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <p className="mx-auto mt-2 max-w-sm text-sm text-red-500">{error}</p>}
        </div>
        <div className="flex justify-end px-8 py-4">
          <Button
            type="submit"
            disabled={isPending || !title.trim() || !content.trim()}
            className="cursor-pointer"
          >
            {isPending ? "Saving..." : "Next"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
