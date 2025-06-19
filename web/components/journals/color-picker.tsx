"use client";

import { DEFAULT_JOURNAL_COLOR, JOURNAL_COLORS } from "@/constants/journal-colors";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export function ColorPicker({ selectedColor, onColorChange }: ColorPickerProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1 text-center">
          <div className="text-muted-foreground text-sm">Default</div>
          <button
            type="button"
            onClick={() => onColorChange(DEFAULT_JOURNAL_COLOR)}
            className="relative h-12 w-full rounded-md border-2 border-gray-600 transition hover:border-white/40"
            style={{ backgroundColor: DEFAULT_JOURNAL_COLOR }}
          >
            {selectedColor === DEFAULT_JOURNAL_COLOR && (
              <Check className="absolute inset-0 m-auto h-5 w-5 text-white drop-shadow" />
            )}
          </button>
        </div>
        <div className="space-y-1 text-center">
          <div className="text-muted-foreground text-sm">Preview</div>
          <div
            className="relative h-12 w-full rounded-md border-2 border-white/40"
            style={{ backgroundColor: selectedColor }}
          ></div>
        </div>
      </div>
      <div className="grid grid-cols-10 gap-1">
        {JOURNAL_COLORS.filter((color) => color !== DEFAULT_JOURNAL_COLOR).map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onColorChange(color)}
            className={cn(
              "relative grid aspect-square w-full place-items-center rounded-md border-2 border-transparent transition hover:border-white/30",
              selectedColor === color && "border-white/60"
            )}
            style={{ backgroundColor: color }}
          >
            {selectedColor === color && <Check className="h-3 w-3 text-white drop-shadow-sm" />}
          </button>
        ))}
      </div>
    </div>
  );
}
