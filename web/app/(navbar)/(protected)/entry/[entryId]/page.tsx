"use client";

import EntryEditor from "@/components/editor";
import { EntryDrawer } from "@/components/entry-drawer";
import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/utils/supabase/client";
import { Editor } from "@tiptap/react";
import { ArrowLeft, ArrowRight, Calendar, Clock, Edit3, LoaderCircle, Save, X } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

async function fetchEntry(entryId: string) {
  const supabase = createClient();

  const { data: entryData, error: entryError } = await supabase
    .from("entry")
    .select("journal_id, title, content, created_at, updated_at")
    .eq("id", entryId)
    .single();

  if (entryError) throw new Error("Entry not found");

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

  return {
    entry: entryData,
    prevEntryId: prevData?.id || null,
    nextEntryId: nextData?.id || null
  };
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

  const { data, mutate } = useSWR(entryId, fetchEntry, { suspense: true });
  const { trigger, isMutating } = useSWRMutation("entry_save", saveEntry);
  const { entry, prevEntryId, nextEntryId } = data;

  async function saveEntry() {
    const supabase = createClient();

    const markdown = editorRef.current?.storage.markdown.getMarkdown();
    if (!markdown) {
      return;
    }

    const { error: entryError } = await supabase
      .from("entry")
      .update({ content: markdown })
      .eq("id", entryId);

    if (entryError) {
      throw new Error("Failed to save entry");
    }

    setIsEditing(false);
    mutate();
  }

  return (
    <>
      <div className="fixed left-2 top-20 z-10">
        <EntryDrawer journalId={entry.journal_id} currentEntryId={entryId} />
      </div>
      <div className="grid w-full">
        <h1 className="wrap-anywhere text-center text-2xl font-bold">{entry.title}</h1>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          <div></div>
          <div className="text-muted-foreground mt-2 flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Created {new Date(entry.created_at).toLocaleDateString()}</span>
            </div>
            {entry.updated_at && entry.updated_at !== entry.created_at && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Updated {new Date(entry.updated_at).toLocaleDateString()}</span>
              </div>
            )}
          </div>
          <div className="flex flex-1 justify-end">
            {!isEditing ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(true)}
                className="mt-8 cursor-pointer"
              >
                <Edit3 className="h-4 w-4" />
                <span className="sr-only">Edit Entry</span>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(false)}
                className="mt-8 cursor-pointer"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Cancel Edit</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      <Separator className="my-6" />

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
              onClick={() => trigger()}
              disabled={isMutating}
              className="flex cursor-pointer items-center gap-2"
            >
              {isMutating ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              disabled={isMutating}
              className="cursor-pointer"
            >
              Cancel
            </Button>
          </div>
          <Separator className="my-6" />
        </>
      ) : (
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <Markdown>{entry.content}</Markdown>
        </div>
      )}
      <div className="flex justify-between pt-4">
        <div>
          {prevEntryId && (
            <Button variant="outline" asChild>
              <Link href={`/entry/${prevEntryId}`} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> Previous Entry
              </Link>
            </Button>
          )}
        </div>
        <div>
          {nextEntryId && (
            <Button asChild>
              <Link href={`/entry/${nextEntryId}`} className="flex items-center gap-2">
                Next Entry <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default function EntryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="py-8">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              <ErrorBoundary FallbackComponent={EntryErrorFallback}>
                <Suspense fallback={<EntrySkeleton />}>
                  <EntryContent />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
