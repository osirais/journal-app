import Typography from "@tiptap/extension-typography";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { Markdown } from "tiptap-markdown";
import { HeadingWithId } from "./heading-with-id";

export default function EntryEditor({
  content,
  onCreate
}: {
  content?: string;
  onCreate?: (editor: Editor) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit, Markdown, Typography, HeadingWithId],
    content: content,
    editorProps: {
      attributes: {
        class: "prose prose-current"
      }
    },
    onCreate({ editor }) {
      onCreate?.(editor);
    },
    editable: false
  });

  return (
    <EditorContent
      editor={editor}
      className="[&_[contenteditable]:focus]:outline-none [&_[contenteditable]:focus]:ring-0"
    />
  );
}
