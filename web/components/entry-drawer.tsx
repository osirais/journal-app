"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { createClient } from "@/utils/supabase/client";
import { ChevronRight, List, Search, SortAsc, SortDesc } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function EntryDrawer({
  journalId,
  currentEntryId
}: {
  journalId: string;
  currentEntryId?: string;
}) {
  const router = useRouter();

  const [entries, setEntries] = useState<any[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<any[]>([]);

  const [journalTitle, setJournalTitle] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      setIsLoading(true);

      try {
        const supabase = createClient();

        const { data: journalData } = await supabase
          .from("journal")
          .select("title")
          .eq("id", journalId)
          .single();

        setJournalTitle(journalData?.title || "");

        const { data: entryData, error: entryError } = await supabase
          .from("entry")
          .select("id, title, created_at")
          .eq("journal_id", journalId)
          .order("created_at", { ascending: true });

        if (entryError) throw entryError;
        setEntries(entryData);
        setFilteredEntries(entryData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (journalId) {
      fetchEntries();
    }
  }, [journalId]);

  useEffect(() => {
    let result = [...entries];

    if (searchQuery) {
      result = result.filter(
        (entry) => entry.title && entry.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    result = result.sort((a, b) => {
      const aTime = new Date(a.created_at).getTime();
      const bTime = new Date(b.created_at).getTime();
      return sortAscending ? aTime - bTime : bTime - aTime;
    });

    setFilteredEntries(result);
  }, [entries, searchQuery, sortAscending]);

  function goToEntry(entryNumber: number) {
    router.push(`/entry/${entryNumber}`);
  }

  function toggleSortOrder() {
    setSortAscending((prev) => !prev);
  }

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <List className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-[300px] p-0 sm:w-[350px]">
        <DrawerHeader className="border-b p-4">
          <DrawerTitle className="text-left">{journalTitle || "Entries"}</DrawerTitle>
        </DrawerHeader>

        <div className="border-b p-4">
          <div className="relative">
            <Search className="text-muted-foreground absolute left-2.5 top-3 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search entries..."
              className="pl-8 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-8 w-8"
                    onClick={toggleSortOrder}
                  >
                    {sortAscending ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>
                    {sortAscending
                      ? "Order ascending (newest first)"
                      : "Order descending (oldest first)"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {isLoading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="animate-pulse">Loading entries...</div>
          </div>
        ) : (
          <div className="h-[calc(100vh-180px)]">
            <div className="py-2">
              {filteredEntries.length > 0 ? (
                filteredEntries.map((entry) => (
                  <button
                    key={entry.id}
                    onClick={() => goToEntry(entry.id)}
                    className={`hover:bg-muted/50 flex w-full items-center justify-between px-4 py-3 text-left transition-colors ${
                      entry.id === currentEntryId ? "bg-muted font-medium" : ""
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">{entry.title}</div>
                      {entry.title && (
                        <div className="text-muted-foreground max-w-[250px] truncate text-sm">
                          {new Date(entry.created_at).toLocaleDateString(undefined, {
                            month: "2-digit",
                            day: "2-digit",
                            year: "2-digit"
                          })}
                        </div>
                      )}
                    </div>
                    <ChevronRight className="text-muted-foreground h-4 w-4" />
                  </button>
                ))
              ) : (
                <div className="text-muted-foreground py-8 text-center">
                  {searchQuery ? `No entries matching "${searchQuery}"` : "No entries available"}
                </div>
              )}
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
