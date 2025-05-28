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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/contexts/theme-context";
import { palettes } from "@/lib/theme-palettes";
import { Palette, Search } from "lucide-react";
import { useEffect, useState } from "react";

export function PaletteSelector() {
  const { theme: currentTheme, setPaletteName } = useTheme();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPalettes, setFilteredPalettes] = useState(palettes);

  function formatPaletteName(name: string) {
    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPalettes(palettes);
    } else {
      setFilteredPalettes(
        palettes.filter((palette) => palette.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
  }, [searchQuery, palettes]);

  return (
    <div className="space-y-4">
      <div className="relative p-4 pb-0">
        <Search className="text-muted-foreground absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
        <Input
          type="search"
          placeholder="Search palettes..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-4 p-4 pt-0">
          <div className="grid grid-cols-2 gap-2">
            {filteredPalettes.map((palette) => (
              <button
                key={palette.name}
                className={`rounded-md border p-3 transition-colors ${
                  currentTheme.palette.name === palette.name ? "ring-primary ring-2" : ""
                }`}
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
              </button>
            ))}
          </div>

          {filteredPalettes.length === 0 && (
            <div className="text-muted-foreground py-8 text-center">
              No palettes found matching "{searchQuery}"
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

export function ThemeDrawer() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="relative cursor-pointer">
          <Palette className="size-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-[300px] p-0 sm:w-[350px]">
        <DrawerHeader className="border-b p-4">
          <DrawerTitle className="text-left">Theme</DrawerTitle>
        </DrawerHeader>
        <div className="flex min-h-0 flex-1 flex-col">
          <PaletteSelector />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
