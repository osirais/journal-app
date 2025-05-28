"use client";

import { ThemeDrawer } from "@/components/theme-drawer";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useTheme as useCustomTheme } from "@/contexts/theme-context";
import { Laptop, Moon, Palette, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { theme: customTheme, clearTheme } = useCustomTheme();
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
    setTimeout(() => setIsDrawerOpen(true), 100);
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
      <ThemeDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </>
  );
};
