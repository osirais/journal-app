"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { FC, useState } from "react";

type SortOption = "most-recent" | "least-recent" | "work-in-progress";

type SortDropdownProps = {
  onSortChange: (sortBy: SortOption) => void;
  defaultSort: SortOption;
};

const sortOptions = [
  { value: "work-in-progress" as const, label: "Feature (WIP)" },
  { value: "most-recent" as const, label: "Most Recent Updates" },
  { value: "least-recent" as const, label: "Least Recent Updates" }
];

export const SortDropdown: FC<SortDropdownProps> = ({
  onSortChange,
  defaultSort = "most-recent"
}) => {
  const [selectedSort, setSelectedSort] = useState<SortOption>(defaultSort);

  const handleSortChange = (sortBy: SortOption) => {
    setSelectedSort(sortBy);
    onSortChange?.(sortBy);
  };

  const selectedOption = sortOptions.find((option) => option.value === selectedSort);

  return (
    <div className="flex w-full items-center justify-between">
      <span className="text-muted-foreground text-sm font-medium">Sort By</span>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 cursor-pointer gap-1">
            <span className="text-xs">{selectedOption?.label}</span>
            <ChevronDown className="size-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className="cursor-pointer text-sm"
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
