"use client";

import { CreateJournalDialog } from "@/components/journals/create-journal-dialog";
import { JournalCard } from "@/components/journals/journal-card";
import { JournalCardSkeleton } from "@/components/journals/journal-card-skeleton";
import { JournalsSortDropdown } from "@/components/journals/journals-sort-dropdown";
import type { JournalWithEntryCount } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

type SortOption =
  | "newest"
  | "oldest"
  | "most-updated"
  | "least-updated"
  | "most-entries"
  | "least-entries";

export function JournalsPage() {
  const [journals, setJournals] = useState<JournalWithEntryCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("newest");

  const fetchJournals = async (sortBy: SortOption) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/api/journals?sort=${sortBy}`);
      setJournals(res.data || []);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to load journals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJournals(sort);
  }, [sort]);

  const handleSortChange = (sortBy: SortOption) => {
    setSort(sortBy);
  };

  const handleJournalCreated = (journal: JournalWithEntryCount) => {
    setJournals((prev) => [journal, ...prev]);
  };

  const handleJournalDeleted = (journal: JournalWithEntryCount) => {
    setJournals((prev) => prev.filter((j) => j.id !== journal.id));
  };

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <h1 className="mb-2 text-3xl font-bold">Journals</h1>
      <p className="text-muted-foreground mb-6">Your collection of journals</p>
      {error && (
        <div className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}
      <CreateJournalDialog onJournalCreated={handleJournalCreated} />
      <div className="mb-6">
        <JournalsSortDropdown onSortChange={handleSortChange} defaultSort={sort} />
      </div>
      {loading ? (
        <div className="grid gap-3 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <JournalCardSkeleton key={i} />
          ))}
        </div>
      ) : journals.length === 0 ? (
        <div className="text-muted-foreground py-12 text-center">
          No journals found. Create your first journal to get started.
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {journals.map((journal) => (
            <JournalCard key={journal.id} journal={journal} onDelete={handleJournalDeleted} />
          ))}
        </div>
      )}
    </div>
  );
}
