"use client";

import EntryEditor from "@/components/editor";
import { EntryDrawer } from "@/components/entry-drawer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useArrowKeyNavigation } from "@/hooks/useArrowKeyNavigation";
import { createClient } from "@/utils/supabase/client";
import { Editor } from "@tiptap/react";
import { ArrowLeft, ArrowRight, LoaderCircle, Save } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

async function fetchEntry(entryId: string) {
  const supabase = createClient();

  const { data: entryData, error: entryError } = await supabase
    .from("entry")
    .select("journal_id, title, content, created_at")
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
  const router = useRouter();
  const { entryId } = useParams<{ entryId: string }>();
  const editorRef = useRef<Editor | null>(null);

  const { data, mutate } = useSWR(entryId, fetchEntry, { suspense: true });
  const { trigger, isMutating } = useSWRMutation("entry_save", saveEntry);
  const { entry, prevEntryId, nextEntryId } = data;

  function goToPrevEntry() {
    if (prevEntryId) {
      router.push(`/entry/${prevEntryId}`);
    }
  }

  function goToNextEntry() {
    if (nextEntryId) {
      router.push(`/entry/${nextEntryId}`);
    }
  }

  useArrowKeyNavigation({
    onLeft: goToPrevEntry,
    onRight: goToNextEntry
  });

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

    mutate();
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <EntryDrawer journalId={entry.journal_id} currentEntryId={entryId} />
        </div>
        <h1 className="wrap-anywhere flex-5 text-center text-2xl font-bold">{entry.title}</h1>
        <div className="flex-1" />
      </div>
      <Separator />
      <EntryEditor content={entry.content} onCreate={(editor) => (editorRef.current = editor)} />
      <Separator />
      <div className="flex justify-between pt-4">
        <div>
          {prevEntryId && (
            <Button variant="outline" asChild>
              <Link href={`/entry/${prevEntryId}`} className="flex items-center gap-1">
                <ArrowLeft className="size-4" /> Previous Entry
              </Link>
            </Button>
          )}
        </div>
        <div>
          <Button
            className="flex items-center gap-1"
            onClick={() => trigger()}
            disabled={isMutating}
          >
            {isMutating ? (
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
        </div>
        <div>
          {nextEntryId && (
            <Button asChild>
              <Link href={`/entry/${nextEntryId}`} className="flex items-center gap-1">
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
