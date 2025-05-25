import Typography from "@tiptap/extension-typography";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

export default function Editor({ content }: { content?: string }) {
  const editor = useEditor({
    extensions: [StarterKit, Typography],
    content: content,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base lg:prose-sm xl:prose-md m-5 focus:outline-none"
      }
    }
  });

  return (
    <EditorContent
      editor={editor}
      className="[&_[contenteditable]:focus]:outline-none [&_[contenteditable]:focus]:ring-0"
    />
  );
}
