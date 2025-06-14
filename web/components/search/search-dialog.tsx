"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="hidden">Search</DialogTitle>
      <DialogContent className="max-w-2xl p-0 [&>button]:hidden">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 border-b p-4">
            <Search className="text-muted-foreground h-5 w-5" />
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="placeholder:text-muted-foreground flex-1 bg-transparent text-lg outline-none"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
              className="h-8 w-8 cursor-pointer p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="max-h-96 min-h-[200px] overflow-y-auto">
            {query === "" ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Search className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                  <p className="text-muted-foreground">Start typing to search</p>
                </div>
              </div>
            ) : (
              <div className="p-4">
                <div className="py-8 text-center">
                  <Search className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                  <p className="text-muted-foreground">No results found for "{query}"</p>
                </div>
              </div>
            )}
          </div>
          <div className="bg-muted/50 flex items-center justify-between border-t p-3">
            <div className="text-muted-foreground flex items-center gap-4 text-xs">
              <span>
                Press <kbd className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs">Ctrl+K</kbd>{" "}
                to search
              </span>
            </div>
            <div className="text-muted-foreground flex items-center gap-2 text-xs">
              <span>
                Press <kbd className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs">Esc</kbd> to
                close
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
