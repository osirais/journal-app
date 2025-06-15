"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const JOURNAL_COLORS = [
  "#99aab5",
  "#1abc9c",
  "#2ecc71",
  "#3498db",
  "#9b59b6",
  "#e91e63",
  "#f1c40f",
  "#e67e22",
  "#e74c3c",
  "#95a5a6",
  "#607d8b",
  "#11806a",
  "#1f8b4c",
  "#206694",
  "#71368a",
  "#ad1457",
  "#c27c0e",
  "#a84300",
  "#992d22",
  "#979c9f",
  "#546e7a"
];

export function ColorPicker({ selectedColor, onColorChange }: ColorPickerProps) {
  const defaultColor = "#99aab5";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1 text-center">
          <div className="text-muted-foreground text-sm">Default</div>
          <button
            type="button"
            onClick={() => onColorChange(defaultColor)}
            className="relative h-12 w-full rounded-md border-2 border-gray-600 transition hover:border-white/40"
            style={{ backgroundColor: defaultColor }}
          >
            {selectedColor === defaultColor && (
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
        {JOURNAL_COLORS.filter((color) => color !== defaultColor).map((color) => (
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
