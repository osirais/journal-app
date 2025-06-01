"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Node as ProseMirrorNode } from "@tiptap/pm/model";
import { Editor } from "@tiptap/react";
import { TableOfContents } from "lucide-react";
import * as React from "react";

function getHeadings(editor: Editor) {
  const headings: { [id: string]: { level: number; text: string } } = {};

  editor.state.doc.descendants((node: ProseMirrorNode) => {
    if (node.type.name === "heading" && node.attrs.id && node.textContent) {
      headings[node.attrs.id] = {
        level: node.attrs.level,
        text: node.textContent
      };
    }
  });

  return headings;
}

export function OutlineCombobox({ editor }: { editor: Editor }) {
  const [open, setOpen] = React.useState(false);

  const headings = React.useMemo(() => getHeadings(editor), [editor]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="cursor-pointer">
          <TableOfContents className="size-4" />
          <span className="sr-only">Outline</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0" onCloseAutoFocus={(e) => e.preventDefault()}>
        <Command
          filter={(value, search) => {
            const heading = headings[value];
            if (!heading) return 0;
            return heading.text.toLowerCase().includes(search.trim().toLowerCase()) ? 1 : 0;
          }}
        >
          <CommandInput placeholder="Search headings..." className="h-9" />
          <CommandList>
            <CommandEmpty>No headings found.</CommandEmpty>
            <CommandGroup>
              {Object.entries(headings).map(([id, { level, text }]) => (
                <CommandItem
                  key={id}
                  value={id}
                  onSelect={() => {
                    const el = document.getElementById(id);
                    if (el) {
                      requestAnimationFrame(() => {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                      });
                      setOpen(false);
                    }
                  }}
                >
                  <span
                    className={cn("truncate", level === 1 && "font-bold")}
                    style={{ paddingLeft: `${(level - 1) * 20}px` }}
                  >
                    {text}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
