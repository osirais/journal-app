import Typography from "@tiptap/extension-typography";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

export default function Editor({ content }: { content?: string }) {
  const editor = useEditor({
    extensions: [StarterKit, Typography],
    content: content
  });

  return (
    <EditorContent
      editor={editor}
      className="[&_[contenteditable]:focus]:outline-none [&_[contenteditable]:focus]:ring-0"
    />
  );
}
