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
import { useDialogStore } from "@/hooks/use-dialog-store";
import { useJournalCallbackStore } from "@/hooks/use-journal-callback-store";
import type { JournalWithEntryCount } from "@/types";
import { formatDateAgo } from "@/utils/format-date-ago";
import { CalendarIcon, Clock, Edit, MoreVertical, NotebookPen, Trash2 } from "lucide-react";
import Link from "next/link";
import type React from "react";
import type { FC } from "react";

type JournalCardProps = {
  journal: JournalWithEntryCount;
};

export const JournalCard: FC<JournalCardProps> = ({ journal }) => {
  const dialog = useDialogStore();

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dialog.open("edit-journal", { editJournalData: { journal } });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dialog.open("delete-journal", { deleteJournalData: { journal } });
  };

  return (
    <>
      <Card className="group relative w-full max-w-sm overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5">
        <CardContent className="flex h-full flex-col p-4">
          <div className="flex items-start gap-4">
            <div
              style={{ backgroundColor: journal.color_hex }}
              className="grid size-20 place-content-center rounded-lg border"
            >
              <NotebookPen className="text-white/50" size={48} />
            </div>
            <div className="flex flex-1 flex-col overflow-hidden">
              <h3 className="line-clamp-2 text-base font-semibold leading-tight">
                {journal.title}
              </h3>
              <div className="text-muted-foreground mt-2 grid items-center gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="size-3" />
                  <span>Created {formatDateAgo(new Date(journal.created_at))}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="size-3" />
                  <span>Updated {formatDateAgo(new Date(journal.updated_at))}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="size-3" />
                  <span>
                    {journal.entries} {journal.entries === 1 ? "entry" : "entries"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 min-h-12">
            {journal.description && (
              <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                {journal.description}
              </p>
            )}
          </div>
          <div className="mt-auto pt-4">
            <div className="flex h-full items-center justify-between gap-2">
              <Button asChild size="sm" variant="outline" className="h-full flex-1">
                <Link href={`/journal/${journal.id}`}>Open</Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="aspect-square h-full cursor-pointer p-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="size-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
                    <Edit className="mr-2 size-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleDelete} className="cursor-pointer text-red-500">
                    <Trash2 className="mr-2 size-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
