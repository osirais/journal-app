"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useDialogStore } from "@/hooks/use-dialog-store";
import { fuzzyFind } from "@/utils/fuzzy-find";
import { BookOpen, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

export function PickJournalDialog() {
  const dialog = useDialogStore();
  const isDialogOpen = dialog.isOpen && dialog.type === "pick-journal";

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [journals, setJournals] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    const loadJournals = async () => {
      const res = await fetch("/api/journal-names-ids");
      const { journals } = await res.json();
      setJournals(journals);
    };
    loadJournals();
  }, []);

  const filteredJournals = query === "" ? journals : fuzzyFind(journals, "title", query);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, filteredJournals.length]);

  const handleSelect = (journal: { id: string; title: string }) => {
    dialog.open("create-entry", { ...dialog.data, createEntryData: { journalId: journal.id } });

    setQuery("");
  };

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      // needed so doesn't interrupt other dialogs
      if (!isDialogOpen) return;

      if (e.key === "Escape") {
        dialog.close();
        setQuery("");
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredJournals.length);
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredJournals.length) % filteredJournals.length);
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        const journal = filteredJournals[selectedIndex];
        if (journal) {
          handleSelect(journal);
        }
        return;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDialogOpen, filteredJournals, selectedIndex]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={dialog.close}>
      <DialogTitle className="sr-only">Search</DialogTitle>
      <DialogContent className="max-w-lg p-0">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 border-b p-3">
            <Search className="text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search journals"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="placeholder:text-muted-foreground flex-1 bg-transparent outline-none"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dialog.close()}
              className="h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <div className="h-64 overflow-hidden">
            {filteredJournals.length > 0 ? (
              <div className="p-1">
                {filteredJournals.map((journal, index) => (
                  <button
                    key={journal.id}
                    className={`flex w-full items-center gap-2 rounded p-2 text-left text-sm transition-colors ${
                      index === selectedIndex
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => handleSelect(journal)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <BookOpen className="text-muted-foreground h-4 w-4" />
                    <span>{journal.title}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <Search className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                <p className="text-muted-foreground text-sm">No journals found</p>
              </div>
            )}
          </div>
          <div className="bg-muted/30 text-muted-foreground flex items-center justify-between border-t p-2 text-xs">
            <span>
              <kbd className="bg-muted rounded px-1 py-0.5 font-mono text-xs">↑↓</kbd> navigate
            </span>
            <span>
              <kbd className="bg-muted rounded px-1 py-0.5 font-mono text-xs">Enter</kbd> select
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
