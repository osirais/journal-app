"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import type { Journal } from "@/types";
import { formatDateAgo } from "@/utils/format-date-ago";
import { CalendarIcon, Clock, Edit, FileEdit, MoreVertical, Trash2 } from "lucide-react";
import Link from "next/link";
import type React from "react";
import type { FC } from "react";

type JournalCardProps = {
  journal: Journal;
  onEdit?: (journal: Journal) => void;
  onDelete?: (journal: Journal) => void;
};

export const JournalCard: FC<JournalCardProps> = ({ journal, onEdit, onDelete }) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit?.(journal);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete?.(journal);
  };

  return (
    <Card className="group relative w-full max-w-sm overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5">
      <CardContent className="flex h-full flex-col p-4">
        <div className="flex items-start gap-4">
          {journal.thumbnail_url ? (
            <div className="bg-muted h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border">
              <img
                src={journal.thumbnail_url}
                alt={journal.title}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="bg-muted flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg border">
              <FileEdit className="text-muted-foreground h-8 w-8" />
            </div>
          )}

          <div className="flex flex-1 flex-col overflow-hidden">
            <h3 className="line-clamp-2 text-base font-semibold leading-tight">{journal.title}</h3>
            <div className="text-muted-foreground mt-1 flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-3 w-3" />
                <span>{formatDateAgo(new Date(journal.created_at))}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{formatDateAgo(new Date(journal.updated_at))}</span>
              </div>
            </div>
          </div>
        </div>

        {journal.description && (
          <p className="text-muted-foreground mt-3 line-clamp-3 text-sm leading-relaxed">
            {journal.description}
          </p>
        )}

        <div className="mt-auto pt-4">
          <div className="flex h-full items-center justify-between gap-2">
            <Button asChild size="sm" variant="outline" className="flex-1">
              <Link href={`/journal/${journal.id}`}>Open</Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="aspect-square h-full p-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete} className="cursor-pointer text-red-500">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
