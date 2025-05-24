"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Heading1,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Pilcrow,
  Quote,
  Redo,
  Undo
} from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Markdown } from "tiptap-markdown";

interface TiptapEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
}

export const TiptapEditor: FC<TiptapEditorProps> = ({
  content = "<p>Start writing...</p>",
  onChange,
  placeholder = ""
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [textFormat, setTextFormat] = useState<string[]>([]);
  const [blockType, setBlockType] = useState<string>("paragraph");
  const [listType, setListType] = useState<string[]>([]);

  const editor = useEditor({
    extensions: [StarterKit, Markdown],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.storage.markdown.getMarkdown());
    },
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-slate dark:prose-invert max-w-none",
          "focus:outline-none min-h-[150px] p-4"
        )
      }
    },
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false)
  });

  useEffect(() => {
    if (!editor) return;

    const updateTextFormat = () => {
      const formats: string[] = [];
      if (editor.isActive("bold")) formats.push("bold");
      if (editor.isActive("italic")) formats.push("italic");
      setTextFormat(formats);
    };

    const updateBlockType = () => {
      if (editor.isActive("heading", { level: 1 })) {
        setBlockType("heading1");
      } else if (editor.isActive("heading", { level: 2 })) {
        setBlockType("heading2");
      } else {
        setBlockType("paragraph");
      }
    };

    const updateListType = () => {
      const types: string[] = [];
      if (editor.isActive("bulletList")) types.push("bulletList");
      if (editor.isActive("orderedList")) types.push("orderedList");
      if (editor.isActive("blockquote")) types.push("blockquote");
      setListType(types);
    };

    editor.on("selectionUpdate", () => {
      updateTextFormat();
      updateBlockType();
      updateListType();
    });

    editor.on("update", () => {
      updateTextFormat();
      updateBlockType();
      updateListType();
    });

    updateTextFormat();
    updateBlockType();
    updateListType();

    return () => {
      editor.off("selectionUpdate");
      editor.off("update");
    };
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    editor.commands.setContent(content || "");
  }, [content]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border-input bg-background rounded-md border">
      <div className="flex flex-wrap items-center gap-1 border-b p-2">
        <ToggleGroup
          type="multiple"
          size="sm"
          variant="outline"
          value={textFormat}
          onValueChange={(value) => {
            setTextFormat(value);
            if (value.includes("bold") && !editor.isActive("bold")) {
              editor.chain().focus().toggleBold().run();
            }
            if (!value.includes("bold") && editor.isActive("bold")) {
              editor.chain().focus().toggleBold().run();
            }
            if (value.includes("italic") && !editor.isActive("italic")) {
              editor.chain().focus().toggleItalic().run();
            }
            if (!value.includes("italic") && editor.isActive("italic")) {
              editor.chain().focus().toggleItalic().run();
            }
          }}
        >
          <ToggleGroupItem
            value="bold"
            aria-label="Toggle bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="italic"
            aria-label="Toggle italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>

        <Separator orientation="vertical" className="mx-1 h-6" />

        <ToggleGroup
          type="single"
          size="sm"
          variant="outline"
          value={blockType}
          onValueChange={(value) => {
            if (value) {
              setBlockType(value);
              if (value === "paragraph") {
                editor.chain().focus().setParagraph().run();
              } else if (value === "heading1") {
                editor.chain().focus().toggleHeading({ level: 1 }).run();
              } else if (value === "heading2") {
                editor.chain().focus().toggleHeading({ level: 2 }).run();
              }
            }
          }}
        >
          <ToggleGroupItem value="paragraph" aria-label="Paragraph">
            <Pilcrow className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="heading1" aria-label="Heading 1">
            <Heading1 className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="heading2" aria-label="Heading 2">
            <Heading2 className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>

        <Separator orientation="vertical" className="mx-1 h-6" />

        <ToggleGroup
          type="multiple"
          size="sm"
          variant="outline"
          value={listType}
          onValueChange={(value) => {
            setListType(value);
            if (value.includes("bulletList") && !editor.isActive("bulletList")) {
              editor.chain().focus().toggleBulletList().run();
            }
            if (!value.includes("bulletList") && editor.isActive("bulletList")) {
              editor.chain().focus().toggleBulletList().run();
            }
            if (value.includes("orderedList") && !editor.isActive("orderedList")) {
              editor.chain().focus().toggleOrderedList().run();
            }
            if (!value.includes("orderedList") && editor.isActive("orderedList")) {
              editor.chain().focus().toggleOrderedList().run();
            }
            if (value.includes("blockquote") && !editor.isActive("blockquote")) {
              editor.chain().focus().toggleBlockquote().run();
            }
            if (!value.includes("blockquote") && editor.isActive("blockquote")) {
              editor.chain().focus().toggleBlockquote().run();
            }
          }}
        >
          <ToggleGroupItem value="bulletList" aria-label="Bullet list" className="cursor-pointer">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="orderedList" aria-label="Ordered list" className="cursor-pointer">
            <ListOrdered className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="blockquote" aria-label="Blockquote" className="cursor-pointer">
            <Quote className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <Undo className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <BubbleMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
        className="border-input bg-background flex overflow-hidden rounded-md border shadow-md"
      >
        <Button
          variant="ghost"
          size="sm"
          className={cn("px-2", editor.isActive("bold") && "bg-accent")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn("px-2", editor.isActive("italic") && "bg-accent")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Button>
      </BubbleMenu>

      <EditorContent
        editor={editor}
        className={cn(
          "relative",
          !editor.getText() &&
            !isFocused &&
            "after:text-muted-foreground after:pointer-events-none after:absolute after:left-4 after:top-4 after:content-[attr(data-placeholder)]"
        )}
        data-placeholder={placeholder}
      />
    </div>
  );
};
