"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  ClipboardList,
  LayoutDashboard,
  LogOut,
  NotebookPen,
  Search,
  Trophy,
  UserCog,
  X
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard
    },
    {
      name: "Journals",
      url: "/journals",
      icon: NotebookPen
    },
    {
      name: "Tasks",
      url: "/tasks",
      icon: ClipboardList
    },
    {
      name: "Achievements",
      url: "/achievements",
      icon: Trophy
    },
    {
      name: "Manage Account",
      url: "/manage-account",
      icon: UserCog
    }
  ];

  const filteredActions =
    query === ""
      ? actions
      : actions.filter((action) => action.name.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
        return;
      }

      if (!open) return;

      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredActions.length);
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % filteredActions.length);
        return;
      }

      if (e.key === "Enter" && filteredActions[selectedIndex]) {
        e.preventDefault();
        const action = filteredActions[selectedIndex];
        executeAction(action);
        return;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, filteredActions, selectedIndex]);

  const router = useRouter();

  const executeAction = (action: (typeof actions)[0]) => {
    router.push(action.url);
    setOpen(false);
    setQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="sr-only">Search</DialogTitle>
      <DialogContent className="max-w-lg p-0">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 border-b p-3">
            <Search className="text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="placeholder:text-muted-foreground flex-1 bg-transparent outline-none"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {filteredActions.length > 0 ? (
              <div className="p-1">
                {filteredActions.map((action, index) => (
                  <button
                    key={index}
                    className={`flex w-full items-center gap-2 rounded p-2 text-left text-sm transition-colors ${
                      index === selectedIndex
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => executeAction(action)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <action.icon className="text-muted-foreground h-4 w-4" />
                    <span>{action.name}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <Search className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                <p className="text-muted-foreground text-sm">No results found</p>
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
