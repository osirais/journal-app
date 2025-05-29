"use client";

import { ThemeDrawer } from "@/components/navbar/theme-drawer";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/contexts/theme-context";
import { Laptop, Moon, Palette, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { paletteName, setPaletteName } = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleCustomThemeSelect = () => {
    setTimeout(() => setIsDrawerOpen(true), 100);
  };

  const handleStandardThemeSelect = (newTheme: string) => {
    setPaletteName(newTheme);
  };

  const getThemeIcon = () => {
    switch (paletteName) {
      case "light":
        return <Sun key="light" className="text-muted-foreground size-4" />;
      case "dark":
        return <Moon key="dark" className="text-muted-foreground size-4" />;
      case "system":
        return <Laptop key="system" className="text-muted-foreground size-4" />;
      default:
        return <Palette key="default" className="text-muted-foreground size-4" />;
    }
  };

  const getCurrentThemeValue = () => {
    return paletteName;
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Button variant="ghost" size="sm">
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
              <Sun className="text-muted-foreground size-4" />
              <span>Light</span>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem className="flex cursor-pointer gap-2" value="dark">
              <Moon className="text-muted-foreground size-4" />
              <span>Dark</span>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem className="flex cursor-pointer gap-2" value="system">
              <Laptop className="text-muted-foreground size-4" />
              <span>System</span>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem className="flex cursor-pointer gap-2" value="custom">
              <Palette className="text-muted-foreground size-4" />
              <span>Custom</span>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <ThemeDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </>
  );
};
