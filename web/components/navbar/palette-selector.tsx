"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/contexts/theme-context";
import { Palette, palettes } from "@/lib/theme-palettes";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export function PaletteInput() {
  const { query, setQuery } = usePaletteSelectorContext();

  return (
    <div className="relative flex items-center p-4">
      <Search className="text-muted-foreground absolute left-7 size-4" />
      <Input
        type="search"
        placeholder="Search palettes..."
        className="pl-10"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

function formatPaletteName(name: string) {
  return name
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function PaletteGrid() {
  const { paletteName, setPaletteName } = useTheme();
  const { filteredPalettes, query } = usePaletteSelectorContext();

  if (!filteredPalettes) {
    return (
      <div className="text-muted-foreground py-8 text-center">
        No palettes found matching "{query}"
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 p-4 pt-1">
      {filteredPalettes.map((palette) => (
        <Button
          key={palette.name}
          className={cn("py-5", paletteName === palette.name && "ring-2")}
          style={{
            backgroundColor: palette.colors.bg,
            color: palette.colors.main,
            borderColor: palette.colors.subAlt
          }}
          onClick={() => setPaletteName(palette.name)}
        >
          <span className="block truncate text-sm font-medium">
            {formatPaletteName(palette.name)}
          </span>
        </Button>
      ))}
    </div>
  );
}

export const PaletteSelectorContext = createContext<{
  query: string;
  setQuery: (q: string) => void;
  filteredPalettes: Palette[];
} | null>(null);

export function usePaletteSelectorContext() {
  const ctx = useContext(PaletteSelectorContext);
  if (!ctx)
    throw new Error(
      "usePaletteSelectorContext must be used within PaletteSelectorContext.Provider"
    );
  return ctx;
}

export function PaletteSelector({ children }: { children?: ReactNode }) {
  const [query, setQuery] = useState("");
  const [filteredPalettes, setFilteredPalettes] = useState<Palette[]>(palettes);

  useEffect(() => {
    const q = query.trim();
    setFilteredPalettes(
      q ? palettes.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())) : palettes
    );
  }, [query]);

  return (
    <PaletteSelectorContext.Provider value={{ query, setQuery, filteredPalettes }}>
      {children ? (
        children
      ) : (
        <div className="flex min-h-0 flex-1 flex-col">
          <PaletteSelector>
            <PaletteInput />
            <ScrollArea className="min-h-0 flex-1">
              <PaletteGrid />
            </ScrollArea>
          </PaletteSelector>
        </div>
      )}
    </PaletteSelectorContext.Provider>
  );
}
