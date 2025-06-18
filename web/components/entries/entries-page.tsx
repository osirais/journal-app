"use client";

import { CreateEntryDialog } from "@/components/dialogs/create-entry-dialog";
import { EntriesSortDropdown } from "@/components/entries/entries-sort-dropdown";
import { EntryCard } from "@/components/entries/entry-card";
import { TagComponent } from "@/components/tag-component";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDialogStore } from "@/hooks/use-dialog-store";
import type { JournalWithEntryCount, TagType } from "@/types";
import { formatDateAgo } from "@/utils/format-date-ago";
import axios from "axios";
import { CalendarIcon, FileText, Plus } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Entry = {
  id: string;
  title: string | null;
  content: string;
  created_at: string;
  updated_at: string;
};

type EntryWithTags = Entry & {
  tags: TagType[];
};

type SortOption = "newest" | "oldest";

export default function EntriesPage() {
  const { journalId } = useParams();

  const searchParams = useSearchParams();
  const tagId = searchParams.get("tag");

  const [entries, setEntries] = useState<EntryWithTags[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [tagName, setTagName] = useState<string | null>(null);

  const [journalInfo, setJournalInfo] = useState<JournalWithEntryCount | null>(null);
  const [journalLoading, setJournalLoading] = useState(true);

  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  const dialog = useDialogStore();

  useEffect(() => {
    if (!journalId) return;

    let fetchString = `/api/entries?journalId=${journalId}&sort=${sort}`;
    if (tagId) fetchString += `&tag=${tagId}`;

    if (tagId) {
      axios
        .get(`/api/tags?id=${tagId}`)
        .then((res) => {
          setTagName(res.data.name);
        })
        .catch((err) => {
          setError(err.response?.data?.error || "Failed to load tag name");
        });
    }

    setLoading(true);

    axios
      .get(fetchString)
      .then((res) => {
        setEntries(res.data.entries || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Failed to load entries");
        setLoading(false);
      });

    setJournalLoading(true);
    axios
      .get(`/api/journal?id=${journalId}`)
      .then((res) => {
        setJournalInfo(res.data);
        setJournalLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load journal info", err);
        setJournalLoading(false);
      });
  }, [journalId, tagId, sort]);

  if (!journalId) {
    return <div className="container mx-auto max-w-3xl py-8">No journal selected.</div>;
  }

  const handleSortChange = (sortBy: SortOption) => {
    setSort(sortBy);
  };

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <h1 className="mb-2 text-3xl font-bold">Entries</h1>

      {tagId && (
        <div className="grid grid-cols-[max-content_max-content] place-items-center gap-2 py-4">
          <p className="text-muted-foreground">Showing entries with tag</p>
          <TagComponent journalId={journalId as string} tag={{ id: tagId, name: tagName || "" }} />
        </div>
      )}

      {error && (
        <div className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      {journalLoading ? (
        <div className="mb-6 flex items-center gap-4">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ) : (
        journalInfo && (
          <div className="mb-6 space-y-1">
            <p className="text-muted-foreground">{journalInfo.description}</p>
            <div className="text-muted-foreground flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <CalendarIcon className="size-3" />
                <span>Created {formatDateAgo(new Date(journalInfo.created_at))}</span>
              </div>
              <div className="flex items-center gap-1">
                <FileText className="size-3" />
                <span>{journalInfo.entries} entries</span>
              </div>
            </div>
          </div>
        )
      )}

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Create New Entry</h2>
        <Button
          onClick={() => {
            dialog.open("create-entry", {
              createEntryData: { journalId: journalId as string }
            });
          }}
          size="sm"
          className="size-9 cursor-pointer rounded-full p-0"
        >
          <Plus className="size-4" />
          <span className="sr-only">Create entry</span>
        </Button>
      </div>

      <div className="mb-6">
        <EntriesSortDropdown onSortChange={handleSortChange} defaultSort={sort} />
      </div>

      <div className="space-y-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="flex min-h-[80px] items-center overflow-hidden">
              <CardContent className="w-full p-0">
                <div className="flex items-center gap-4 p-4">
                  <Skeleton className="size-16 rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : entries.length === 0 ? (
          <div className="text-muted-foreground py-12 text-center">
            <FileText className="mx-auto mb-2 size-8" />
            No entries found. Create your first entry to get started.
          </div>
        ) : (
          entries.map((entry) => (
            <EntryCard
              key={entry.id}
              entryId={entry.id}
              title={entry.title!}
              content={entry.content}
              tags={entry.tags}
              journalId={journalId as string}
              created_at={entry.created_at}
              updated_at={entry.updated_at}
            />
          ))
        )}
      </div>
    </div>
  );
}
