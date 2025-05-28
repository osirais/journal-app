"use client";

import EntryEditor from "@/components/editor";
import { EntryDrawer } from "@/components/entry-drawer";
import { Markdown } from "@/components/markdown";
import { TagComponent } from "@/components/tag-component";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/utils/supabase/client";
import type { Editor } from "@tiptap/react";
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
import { useParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { WithContext as ReactTags } from "react-tag-input";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

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

  const {
    data: { user }
  } = await supabase.auth.getUser();

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

function EntryContent() {
  const { entryId } = useParams<{ entryId: string }>();
  const editorRef = useRef<Editor | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingTags, setIsEditingTags] = useState(false);
  const [tags, setTags] = useState<{ id: string; text: string; className: string }[]>([]);

  const { data, mutate } = useSWR(entryId, fetchEntry, {
    suspense: true,
    onSuccess: (data) => {
      setTags(data.tags.map((tag) => ({ id: tag.id, text: tag.name, className: "" })));
    }
  });

  const { data: userTags } = useSWR(data?.userId ? `user-tags-${data.userId}` : null, () =>
    data?.userId ? fetchUserTags(data.userId) : null
  );

  const { trigger: saveEntry, isMutating: isSavingEntry } = useSWRMutation(
    "entry_save",
    async () => {
      const supabase = createClient();

      const markdown = editorRef.current?.storage.markdown.getMarkdown();
      if (!markdown) {
        return;
      }

      const { error: entryError } = await supabase
        .from("entry")
        .update({
          content: markdown,
          updated_at: new Date().toISOString()
        })
        .eq("id", entryId);

      if (entryError) {
        throw new Error("Failed to save entry");
      }

      setIsEditing(false);
      mutate();
    }
  );

  const { trigger: saveTags, isMutating: isSavingTags } = useSWRMutation("tags_save", async () => {
    const supabase = createClient();

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

    setIsEditingTags(false);
    mutate();
  });

  const { entry, prevEntryId, nextEntryId } = data;

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

  const creating = isSavingTags;

  const handleEditTags = () => {
    setTags(data.tags.map((tag) => ({ id: tag.id, text: tag.name, className: "" })));
    setIsEditingTags(true);
  };

  const handleCancelTagEdit = () => {
    setTags(data.tags.map((tag) => ({ id: tag.id, text: tag.name, className: "" })));
    setIsEditingTags(false);
  };

  return (
    <>
      <div className="fixed left-2 top-20 z-10">
        <EntryDrawer journalId={entry.journal_id} currentEntryId={entryId} />
      </div>
      <div className="grid w-full">
        <h1 className="wrap-anywhere text-center text-2xl font-bold">{entry.title}</h1>
        <div className="grid items-center">
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
      </div>

      <Separator className="my-6" />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TagIcon className="size-4" />
            <span className="text-lg font-semibold">Tags</span>
          </div>
          {!isEditingTags && (
            <Button variant="ghost" size="sm" onClick={handleEditTags} className="cursor-pointer">
              <Edit3 className="size-3" />
              <span className="sr-only">Edit Tags</span>
            </Button>
          )}
        </div>

        {isEditingTags ? (
          <div className="space-y-4">
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
                readOnly={creating}
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
            <div className="flex gap-2">
              <Button
                onClick={() => saveTags()}
                disabled={isSavingTags}
                className="flex cursor-pointer items-center gap-2"
              >
                {isSavingTags ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    Save Tags
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handleCancelTagEdit}
                disabled={isSavingTags}
                className="cursor-pointer"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex min-h-[2rem] flex-wrap items-center gap-2">
            {data.tags.length > 0 ? (
              data.tags.map((tag) => (
                <TagComponent
                  key={tag.id}
                  journalId={entry.journal_id}
                  tag={{ id: tag.id, name: tag.name }}
                />
              ))
            ) : (
              <span className="text-muted-foreground text-sm">No tags</span>
            )}
          </div>
        )}
      </div>

      <Separator className="my-6" />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <FileText className="size-4" />
            <span>Content</span>
          </div>
          {!isEditing ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="cursor-pointer"
            >
              <Edit3 className="size-3" />
              <span className="sr-only">Edit Content</span>
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(false)}
              className="cursor-pointer"
            >
              <X className="size-3" />
              <span className="sr-only">Cancel Edit</span>
            </Button>
          )}
        </div>

        {isEditing ? (
          <>
            <div className="border-input bg-background rounded-md border p-4">
              <EntryEditor
                content={entry.content}
                onCreate={(editor) => (editorRef.current = editor)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => saveEntry()}
                disabled={isSavingEntry}
                className="flex cursor-pointer items-center gap-2"
              >
                {isSavingEntry ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    Save
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                disabled={isSavingEntry}
                className="cursor-pointer"
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <div className="prose prose-current dark:prose-invert max-w-none">
            <Markdown>{entry.content}</Markdown>
          </div>
        )}
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
            <Button asChild>
              <Link href={`/entry/${nextEntryId}`} className="flex items-center gap-2">
                Next Entry <ArrowRight className="size-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default function EntryPage() {
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
                    <EntryContent />
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
