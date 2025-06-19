"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/contexts/theme-context";
import { Palette, palettes } from "@/lib/theme-palettes";
import { cn } from "@/lib/utils";
import { parse } from "culori";
import { ArrowDownUp, ArrowUpDown, Search, Star, StarHalf } from "lucide-react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export function PaletteInput() {
  const { query, setQuery, sortBy, setSortBy, sortAscending, setSortAscending } =
    usePaletteSelectorContext();

  return (
    <div className="flex items-center p-4">
      <div className="text-muted-foreground relative flex h-10 items-center">
        <div className="absolute flex aspect-square h-full items-center justify-center">
          <Search className="size-4" />
        </div>
        <Input
          type="search"
          placeholder="Search palettes..."
          className="h-full pl-10 pr-40"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="absolute right-1 flex items-center gap-1">
          <Separator orientation="vertical" className="bg-muted-foreground min-h-5" />
          <Select value={sortBy} onValueChange={setSortBy}>
            <Button variant="ghost" className="cursor-pointer" asChild>
              <SelectTrigger className="max-h-8 border-0 text-xs shadow-none dark:bg-transparent">
                <SelectValue />
              </SelectTrigger>
            </Button>
            <SelectContent>
              <SelectItem value="name" className="cursor-pointer">
                Name
              </SelectItem>
              <SelectItem value="lightness" className="cursor-pointer">
                Lightness
              </SelectItem>
              <SelectItem value="chroma" className="cursor-pointer">
                Chroma
              </SelectItem>
              <SelectItem value="hue" className="cursor-pointer">
                Hue
              </SelectItem>
            </SelectContent>
          </Select>
          <Separator orientation="vertical" className="bg-muted-foreground min-h-5" />
          <Button
            variant="ghost"
            size="icon"
            className="size-8 cursor-pointer"
            onClick={() => setSortAscending(!sortAscending)}
          >
            {sortAscending ? (
              <ArrowUpDown className="size-4" />
            ) : (
              <ArrowDownUp className="size-4" />
            )}
          </Button>
        </div>
      </div>
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
    <div className="grid w-full grid-cols-2 gap-2 px-4">
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
                <Star className="size-4" />
                <StarHalf
                  className={cn(
                    "absolute size-4 fill-current opacity-0 transition-opacity group-hover/favorite:opacity-100",
                    isFavorite && "opacity-100"
                  )}
                />
                <Star
                  className={cn(
                    "absolute size-4 fill-current opacity-0 transition-opacity",
                    isFavorite && "opacity-100 group-hover/favorite:opacity-0"
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
  sortBy: "name" | "lightness" | "chroma" | "hue";
  setSortBy: (s: "name" | "lightness" | "chroma" | "hue") => void;
  sortAscending: boolean;
  setSortAscending: (a: boolean) => void;
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

  const [sortBy, setSortBy] = useState<"name" | "lightness" | "chroma" | "hue">("name");
  const [sortAscending, setSortAscending] = useState<boolean>(true);

  function getOKLCH(colorStr: string) {
    const parsed = parse(colorStr);
    if (!parsed || parsed.mode !== "oklch") return { l: 0, c: 0, h: 0 };
    return {
      l: parsed.l,
      c: parsed.c,
      h: parsed.h ?? 0
    };
  }

  useEffect(() => {
    const q = query.trim();
    const result = q ? palettes.filter((p) => p.name.toLowerCase().includes(q)) : [...palettes];

    result.sort((a, b) => {
      const aColor = getOKLCH(a.colors["--color-background"]);
      const bColor = getOKLCH(b.colors["--color-background"]);

      let comparison = 0;
      switch (sortBy) {
        case "lightness":
          comparison = aColor.l - bColor.l;
          break;
        case "chroma":
          comparison = aColor.c - bColor.c;
          break;
        case "hue":
          comparison = aColor.h - bColor.h;
          break;
        case "name":
        default:
          comparison = a.name.localeCompare(b.name);
      }

      if (comparison === 0) {
        return a.name.localeCompare(b.name);
      }

      return sortAscending ? comparison : -comparison;
    });

    setFilteredPalettes(result);
  }, [query, sortAscending, sortBy]);

  const favoriteFiltered = favoritePalettes
    ? filteredPalettes.filter((p) => favoritePalettes.includes(p.name))
    : [];
  const nonFavoriteFiltered = favoritePalettes
    ? filteredPalettes.filter((p) => !favoritePalettes.includes(p.name))
    : filteredPalettes;

  return (
    <PaletteSelectorContext.Provider
      value={{
        query,
        setQuery,
        filteredPalettes,
        sortBy,
        setSortBy,
        sortAscending,
        setSortAscending
      }}
    >
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
                <div className="text-muted-foreground p-8 text-center">
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
