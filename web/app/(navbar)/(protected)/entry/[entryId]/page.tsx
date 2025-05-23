"use client";

import { EntryDrawer } from "@/components/entry-drawer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useArrowKeyNavigation } from "@/hooks/useArrowKeyNavigation";
import { createClient } from "@/utils/supabase/client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EntryPage() {
  const router = useRouter();

  const { entryId } = useParams<{ entryId: string }>();

  const [journal, setJournal] = useState<any>(null);
  const [entry, setEntry] = useState<any>(null);

  const [prevEntryId, setPrevEntryId] = useState<string | null>(null);
  const [nextEntryId, setNextEntryId] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const supabase = createClient();

        const { data: entryData, error: entryError } = await supabase
          .from("entry")
          .select("*")
          .eq("id", entryId)
          .single();

        if (entryError) throw new Error("Entry not found");
        setEntry(entryData);

        const { data: journalData, error: journalError } = await supabase
          .from("journal")
          .select("*")
          .eq("id", entryData.journal_id)
          .single();

        if (journalError) throw new Error("Journal not found");
        setJournal(journalData);

        const { data: prevData } = await supabase
          .from("entry")
          .select("id")
          .eq("journal_id", entryData.journal_id)
          .lt("created_at", entryData.created_at)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        setPrevEntryId(prevData?.id || null);

        const { data: nextData } = await supabase
          .from("entry")
          .select("id")
          .eq("journal_id", entryData.journal_id)
          .gt("created_at", entryData.created_at)
          .order("created_at", { ascending: true })
          .limit(1)
          .single();

        setNextEntryId(nextData?.id || null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [entryId]);

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

  function renderContent() {
    if (isLoading) {
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

    if (error || !journal || !entry) {
      return (
        <div className="space-y-4 text-center">
          <p className="text-red-500">{error || "Entry not found"}</p>
        </div>
      );
    }

    return (
      <>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <EntryDrawer journalId={journal.id} currentEntryId={entryId} />
          </div>
          <h1 className="wrap-anywhere flex-5 text-center text-2xl font-bold">{entry.title}</h1>
          <div className="flex-1" />
        </div>
        <Separator />
        <div>{entry.content}</div>
      </>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="py-8">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {renderContent()}

              {!isLoading && !error && journal && entry && (
                <>
                  <Separator />
                  <div className="flex justify-between pt-4">
                    <div>
                      {prevEntryId && (
                        <Button variant="outline" asChild>
                          <Link href={`/entry/${prevEntryId}`} className="flex items-center gap-1">
                            <ArrowLeft className="h-4 w-4" /> Previous Entry
                          </Link>
                        </Button>
                      )}
                    </div>
                    <div>
                      {nextEntryId && (
                        <Button asChild>
                          <Link href={`/entry/${nextEntryId}`} className="flex items-center gap-1">
                            Next Entry <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
