"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/contexts/theme-context";
import { Palette, palettes } from "@/lib/theme-palettes";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Search, Star, StarHalf } from "lucide-react";
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

export function PaletteGrid({ palettes }: { palettes: Palette[] }) {
  const { paletteName, setPaletteName, favoritePalettes, setFavoritePalette } = useTheme();

  const [isFavoriteHovered, setIsFavoriteHovered] = useState(false);

  return (
    <div className="grid grid-cols-2 gap-2 px-4">
      {palettes.map(({ name, colors }) => {
        const isFavorite = favoritePalettes?.includes(name);
        return (
          <div
            key={name}
            className="group relative flex items-center"
            style={{ color: colors["--color-primary"] }}
          >
            <Button
              type="button"
              className={cn(
                "w-full cursor-pointer py-5 text-current",
                paletteName === name && "ring-2"
              )}
              style={{ backgroundColor: colors["--color-background"] }}
              onClick={() => setPaletteName(name)}
            >
              <span className="truncate text-sm font-medium">{formatPaletteName(name)}</span>
            </Button>
            <div className="pointer-events-none absolute flex aspect-square min-h-full items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
              <button
                className="group/favorite pointer-events-auto flex cursor-pointer items-center"
                style={{
                  color: isFavoriteHovered ? colors["--color-accent-foreground"] : "inherit"
                }}
                onClick={() => setFavoritePalette(name, !isFavorite)}
                onMouseEnter={() => setIsFavoriteHovered(true)}
                onMouseLeave={() => setIsFavoriteHovered(false)}
              >
                <Star
                  className={cn(
                    "size-4",
                    isFavorite && "fill-current group-hover/favorite:fill-none"
                  )}
                />
                <StarHalf
                  className={cn(
                    "absolute size-4 fill-current opacity-0 group-hover/favorite:opacity-100",
                    isFavorite && "-scale-x-100"
                  )}
                />
              </button>
            </div>
          </div>
        );
      })}
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
  const { favoritePalettes } = useTheme();
  const [filteredPalettes, setFilteredPalettes] = useState<Palette[]>(palettes);

  useEffect(() => {
    const q = query.trim();
    setFilteredPalettes(
      q ? palettes.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())) : palettes
    );
  }, [query]);

  const favoriteFiltered = favoritePalettes
    ? filteredPalettes.filter((p) => favoritePalettes.includes(p.name))
    : [];
  const nonFavoriteFiltered = favoritePalettes
    ? filteredPalettes.filter((p) => !favoritePalettes.includes(p.name))
    : filteredPalettes;

  return (
    <PaletteSelectorContext.Provider value={{ query, setQuery, filteredPalettes }}>
      {children ? (
        children
      ) : (
        <div className="flex min-h-0 w-full flex-1 flex-col">
          <PaletteInput />
          <ScrollArea className="min-h-0 flex-1">
            <div className="flex flex-col gap-4 pb-4 pt-1">
              {filteredPalettes.length ? (
                <>
                  {favoriteFiltered.length > 0 && <PaletteGrid palettes={favoriteFiltered} />}
                  {favoriteFiltered.length > 0 && nonFavoriteFiltered.length > 0 && (
                    <Separator className="mx-4 border" />
                  )}
                  {nonFavoriteFiltered.length > 0 && <PaletteGrid palettes={nonFavoriteFiltered} />}
                </>
              ) : (
                <div className="text-muted-foreground py-8 text-center">
                  No palettes found matching "{query}"
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      )}
    </PaletteSelectorContext.Provider>
  );
}
