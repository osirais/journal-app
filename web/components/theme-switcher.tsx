"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme as useCustomTheme } from "@/contexts/theme-context";
import { palettes } from "@/lib/theme-palettes";
import { Laptop, Moon, Palette, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function PaletteSelector() {
  const { theme: currentTheme, setPaletteName } = useCustomTheme();
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
  }, [searchQuery]);

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

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { theme: customTheme, setPaletteName, clearTheme } = useCustomTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCustomActive, setIsCustomActive] = useState(false);

  useEffect(() => {
    if (mounted) {
      const hasCustomPalette = customTheme?.palette?.name && customTheme.palette.name !== "";
      setIsCustomActive(Boolean(hasCustomPalette && theme === "custom"));
    }
  }, [customTheme, theme, mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const ICON_SIZE = 16;

  const handleCustomThemeSelect = () => {
    setTheme("custom");
    setIsDrawerOpen(true);
  };

  const handleStandardThemeSelect = (newTheme: string) => {
    clearTheme();
    setTheme(newTheme);
  };

  const getThemeIcon = () => {
    if (isCustomActive) {
      return <Palette key="custom" size={ICON_SIZE} className="text-muted-foreground" />;
    }

    switch (theme) {
      case "light":
        return <Sun key="light" size={ICON_SIZE} className="text-muted-foreground" />;
      case "dark":
        return <Moon key="dark" size={ICON_SIZE} className="text-muted-foreground" />;
      default:
        return <Laptop key="system" size={ICON_SIZE} className="text-muted-foreground" />;
    }
  };

  const getCurrentThemeValue = () => {
    if (isCustomActive) return "custom";
    return theme;
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Button variant="ghost" size={"sm"}>
            {getThemeIcon()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-content" align="start">
          <DropdownMenuRadioGroup
            value={getCurrentThemeValue()}
            onValueChange={(value) => {
              if (value === "custom") handleCustomThemeSelect();
              else handleStandardThemeSelect(value);
            }}
          >
            <DropdownMenuRadioItem className="flex cursor-pointer gap-2" value="light">
              <Sun size={ICON_SIZE} className="text-muted-foreground" />
              <span>Light</span>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem className="flex cursor-pointer gap-2" value="dark">
              <Moon size={ICON_SIZE} className="text-muted-foreground" />
              <span>Dark</span>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem className="flex cursor-pointer gap-2" value="system">
              <Laptop size={ICON_SIZE} className="text-muted-foreground" />
              <span>System</span>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem className="flex cursor-pointer gap-2" value="custom">
              <Palette size={ICON_SIZE} className="text-muted-foreground" />
              <span>Custom</span>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Drawer direction="right" open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="w-[300px] p-0 sm:w-[350px]">
          <DrawerHeader className="border-b p-4">
            <DrawerTitle className="text-left">Custom Theme</DrawerTitle>
          </DrawerHeader>
          <div className="flex min-h-0 flex-1 flex-col">
            <PaletteSelector />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
