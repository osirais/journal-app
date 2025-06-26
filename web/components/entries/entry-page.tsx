"use client";

import { TiptapEditor } from "@/components/entries/tiptap-editor";
import { Markdown } from "@/components/markdown";
import { TagComponent } from "@/components/tag-component";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useArrowKeyNavigation } from "@/hooks/use-arrow-key-navigation";
import { editEntrySchema, MAX_CONTENT_LENGTH, MAX_TITLE_LENGTH } from "@/lib/validators/entry";
import { getUserOrThrow } from "@/utils/get-user-throw";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Edit3,
  FileText,
  LoaderCircle,
  Save,
  TagIcon,
  X
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useForm, useWatch } from "react-hook-form";
import { WithContext as ReactTags } from "react-tag-input";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import type { z } from "zod";

const separators = [",", "Enter"];

async function fetchEntry(entryId: string) {
  const supabase = createClient();

  const { data: entryData, error: entryError } = await supabase
    .from("entry")
    .select("journal_id, title, content, created_at, updated_at")
    .eq("id", entryId)
    .single();

  if (entryError) throw new Error("Entry not found");

  const { data: entryTags, error: tagsError } = await supabase
    .from("entry_tag")
    .select(
      `
      tag:tag_id (
        id,
        name
      )
    `
    )
    .eq("entry_id", entryId);

  if (tagsError) throw new Error("Failed to fetch tags");

  const { data: prevData } = await supabase
    .from("entry")
    .select("id")
    .eq("journal_id", entryData.journal_id)
    .lt("created_at", entryData.created_at)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  const { data: nextData } = await supabase
    .from("entry")
    .select("id")
    .eq("journal_id", entryData.journal_id)
    .gt("created_at", entryData.created_at)
    .order("created_at", { ascending: true })
    .limit(1)
    .single();

  const user = await getUserOrThrow(supabase);

  return {
    entry: entryData,
    tags:
      entryTags
        ?.map((et) => et.tag)
        .filter(Boolean)
        .flat() || [],
    prevEntryId: prevData?.id || null,
    nextEntryId: nextData?.id || null,
    userId: user?.id
  };
}

async function fetchUserTags(userId: string) {
  const supabase = createClient();

  const { data: userTags, error } = await supabase
    .from("tag")
    .select("id, name")
    .eq("user_id", userId)
    .order("name");

  if (error) throw new Error("Failed to fetch user tags");

  return userTags || [];
}

function EntryErrorFallback({ error }: { error: Error }) {
  return (
    <div className="space-y-4 text-center">
      <p className="text-red-500">{error.message || "Entry not found"}</p>
    </div>
  );
}

function EntrySkeleton() {
  return (
    <>
      <Skeleton className="mx-auto h-8 w-1/2" />
      <Separator />
      <div className="space-y-4">
        {Array.from({ length: 15 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    </>
  );
}

function EditEntryContent() {
  const { entryId } = useParams<{ entryId: string }>();
  const router = useRouter();
  const [tags, setTags] = useState<{ id: string; text: string; className: string }[]>([]);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [isEditingTags, setIsEditingTags] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const { data, mutate } = useSWR(entryId, fetchEntry, {
    suspense: true,
    onSuccess: (data) => {
      setTags(data.tags.map((tag) => ({ id: tag.id, text: tag.name, className: "" })));
    }
  });

  const { data: userTags } = useSWR(data?.userId ? `user-tags-${data.userId}` : null, () =>
    data?.userId ? fetchUserTags(data.userId) : null
  );

  const form = useForm<z.infer<typeof editEntrySchema>>({
    resolver: zodResolver(editEntrySchema),
    defaultValues: {
      entryId,
      title: data?.entry.title || "",
      content: data?.entry.content || "",
      tags: []
    }
  });

  useEffect(() => {
    if (data?.entry) {
      form.setValue("title", data.entry.title);
      form.setValue("content", data.entry.content);
    }
  }, [data, form]);

  const title = useWatch({ control: form.control, name: "title" }) || "";
  const content = useWatch({ control: form.control, name: "content" }) || "";

  const { trigger: saveEntry, isMutating: isSaving } = useSWRMutation(
    "entry_save",
    async (_, { arg }: { arg: z.infer<typeof editEntrySchema> }) => {
      const supabase = createClient();

      const { error: entryError } = await supabase
        .from("entry")
        .update({
          title: arg.title,
          content: arg.content,
          updated_at: new Date().toISOString()
        })
        .eq("id", entryId);

      if (entryError) {
        throw new Error("Failed to save entry");
      }

      await supabase.from("entry_tag").delete().eq("entry_id", entryId);

      for (const tag of tags) {
        let tagId = tag.id;

        if (!tagId || tagId.startsWith("new-")) {
          const { data: existingTag } = await supabase
            .from("tag")
            .select("id")
            .eq("user_id", data?.userId)
            .eq("name", tag.text.toLowerCase())
            .single();

          if (existingTag) {
            tagId = existingTag.id;
          } else {
            const { data: newTag, error: tagError } = await supabase
              .from("tag")
              .insert({
                user_id: data?.userId,
                name: tag.text.toLowerCase()
              })
              .select("id")
              .single();

            if (tagError) throw new Error("Failed to create tag");
            tagId = newTag.id;
          }
        }

        await supabase.from("entry_tag").insert({
          entry_id: entryId,
          tag_id: tagId
        });
      }

      mutate();
      toast.success("Entry updated successfully");
      router.push(`/entry/${entryId}`);
    }
  );

  const handleDeleteTag = (i: number) => {
    setTags(tags.filter((_, index) => index !== i));
  };

  const handleAdditionTag = (tag: { id: string; text: string }) => {
    if (tags.some((t) => t.text.toLowerCase() === tag.text.toLowerCase())) return;

    const existingTag = userTags?.find((ut) => ut.name.toLowerCase() === tag.text.toLowerCase());

    if (existingTag) {
      setTags([...tags, { id: existingTag.id, text: existingTag.name, className: "" }]);
    } else {
      setTags([...tags, { id: `new-${Date.now()}`, text: tag.text, className: "" }]);
    }
  };

  const suggestions = userTags?.map((tag) => ({ id: tag.id, text: tag.name, className: "" })) || [];

  const { entry, prevEntryId, nextEntryId } = data;

  function goToPrevEntry() {
    if (prevEntryId) {
      router.push(`/entry/${prevEntryId}/edit`);
    }
  }

  function goToNextEntry() {
    if (nextEntryId) {
      router.push(`/entry/${nextEntryId}/edit`);
    }
  }

  useArrowKeyNavigation({
    onLeft: goToPrevEntry,
    onRight: goToNextEntry
  });

  async function handleSave(values: z.infer<typeof editEntrySchema>) {
    try {
      await saveEntry(values);
    } catch (error) {
      toast.error("Failed to save entry");
    }
  }

  function onFormError(errors: any) {
    console.log("Form validation errors:", errors);
    toast.error("Please fix the form errors before submitting");
  }

  return (
    <>
      <div className="grid w-full">
        <div className="mb-4 flex items-center justify-between">
          <Button variant="outline" asChild>
            <Link href={`/journal/${entry.journal_id}`} className="flex items-center gap-2">
              <ArrowLeft className="size-4" /> Back to Journal
            </Link>
          </Button>
        </div>

        <div className="space-y-4 overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <FileText className="size-4" />
              <span>Title</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditingTitle(!isEditingTitle)}
              className="cursor-pointer"
            >
              <Edit3 className="size-3" />
              <span className="sr-only">{isEditingTitle ? "Stop Editing" : "Edit Title"}</span>
            </Button>
          </div>

          {isEditingTitle ? (
            <Form {...form}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Entry title" {...field} disabled={isSaving} />
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
            </Form>
          ) : (
            <h3 className="w-full overflow-hidden truncate whitespace-nowrap text-2xl font-bold">
              {title || "Untitled Entry"}
            </h3>
          )}
        </div>

        <div className="text-muted-foreground mt-2 flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="size-3" />
            <span>Created {new Date(entry.created_at).toLocaleDateString()}</span>
          </div>
          {entry.updated_at && entry.updated_at !== entry.created_at && (
            <div className="flex items-center gap-1">
              <Clock className="size-3" />
              <span>Updated {new Date(entry.updated_at).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>

      <Separator className="my-6" />

      <div className="space-y-6">
        <Separator className="my-6" />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <FileText className="size-4" />
              <span>Content</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditingContent(!isEditingContent)}
              className="cursor-pointer"
            >
              <Edit3 className="size-3" />
              <span className="sr-only">{isEditingContent ? "Stop Editing" : "Edit Content"}</span>
            </Button>
          </div>

          {isEditingContent ? (
            <Form {...form}>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="w-full overflow-x-auto">
                        <TiptapEditor
                          content={field.value}
                          onChange={field.onChange}
                          placeholder="Write your entry..."
                        />
                      </div>
                    </FormControl>
                    <div
                      className={`text-right text-sm ${
                        content.length > MAX_CONTENT_LENGTH
                          ? "text-red-500"
                          : "text-muted-foreground"
                      }`}
                    >
                      {content.length}/{MAX_CONTENT_LENGTH}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>
          ) : (
            <div className="prose max-w-none">
              {entry.content ? (
                <Markdown>{entry.content}</Markdown>
              ) : (
                <p className="text-muted-foreground italic">No content</p>
              )}
            </div>
          )}
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TagIcon className="size-4" />
              <span className="text-lg font-semibold">Tags</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditingTags(!isEditingTags)}
              className="cursor-pointer"
            >
              <Edit3 className="size-3" />
              <span className="sr-only">{isEditingTags ? "Stop Editing" : "Edit Tags"}</span>
            </Button>
          </div>

          {isEditingTags ? (
            <div>
              <Card className="p-2">
                <ReactTags
                  tags={tags}
                  handleDelete={handleDeleteTag}
                  handleAddition={(tag) => handleAdditionTag({ id: "", text: tag.text })}
                  separators={separators}
                  inputFieldPosition="top"
                  autocomplete
                  suggestions={suggestions}
                  placeholder="Add new tag"
                  allowDragDrop={false}
                  readOnly={isSaving}
                  classNames={{
                    tags: "flex flex-wrap gap-2 mt-2",
                    tag: "rounded-full px-2 py-0.5 text-xs text-muted-foreground bg-black/20 dark:bg-white/20",
                    tagInput: "w-full",
                    tagInputField: "w-full focus:outline-none text-sm",
                    selected: "flex flex-wrap gap-2",
                    remove: "ml-2 text-xs cursor-pointer text-destructive hover:underline"
                  }}
                />
              </Card>
            </div>
          ) : (
            <div className="flex min-h-8 flex-wrap items-center gap-2">
              {tags.length > 0 ? (
                tags.map((tag) => (
                  <TagComponent journalId={entry.journal_id} tag={{ id: tag.id, name: tag.text }} />
                ))
              ) : (
                <span className="text-muted-foreground text-sm">No tags</span>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-4">
          <Form {...form}>
            <Button
              onClick={form.handleSubmit(handleSave, onFormError)}
              disabled={isSaving}
              className="flex cursor-pointer items-center gap-2"
            >
              {isSaving ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  Save Changes
                </>
              )}
            </Button>
          </Form>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/entry/${entryId}`)}
            disabled={isSaving}
            className="flex cursor-pointer items-center gap-2"
          >
            <X className="size-4" />
            Cancel
          </Button>
        </div>

        <Separator className="my-6" />

        <div className="flex justify-between pt-4">
          <div>
            {prevEntryId && (
              <Button variant="outline" asChild>
                <Link href={`/entry/${prevEntryId}`} className="flex items-center gap-2">
                  <ArrowLeft className="size-4" /> Previous Entry
                </Link>
              </Button>
            )}
          </div>
          <div>
            {nextEntryId && (
              <Button variant="outline" asChild>
                <Link href={`/entry/${nextEntryId}`} className="flex items-center gap-2">
                  Next Entry <ArrowRight className="size-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default function EditEntryPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="py-8">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              <ErrorBoundary FallbackComponent={EntryErrorFallback}>
                {mounted ? (
                  <Suspense fallback={<EntrySkeleton />}>
                    <EditEntryContent />
                  </Suspense>
                ) : (
                  <EntrySkeleton />
                )}
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
