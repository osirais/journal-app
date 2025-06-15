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

type SortOption =
  | "newest"
  | "oldest"
  | "most-updated"
  | "least-updated"
  | "most-entries"
  | "least-entries";

type JournalsSortDropdownProps = {
  onSortChange: (sortBy: SortOption) => void;
  defaultSort: SortOption;
};

const sortOptions = [
  { value: "newest" as const, label: "Newest Created" },
  { value: "oldest" as const, label: "Oldest Created" },
  { value: "most-updated" as const, label: "Most Recently Updated" },
  { value: "least-updated" as const, label: "Least Recently Updated" },
  { value: "most-entries" as const, label: "Most Entries" },
  { value: "least-entries" as const, label: "Least Entries" }
];

export const JournalsSortDropdown: FC<JournalsSortDropdownProps> = ({
  onSortChange,
  defaultSort = "newest"
}) => {
  const [selectedSort, setSelectedSort] = useState<SortOption>(defaultSort);

  const handleSortChange = (sortBy: SortOption) => {
    setSelectedSort(sortBy);
    onSortChange(sortBy);
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
