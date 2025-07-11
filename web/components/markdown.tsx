import { FC } from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
}

export const Markdown: FC<MarkdownProps> = ({ children }) => {
  return (
    <div className="text-foreground break-words">
      <ReactMarkdown>{children as string}</ReactMarkdown>
    </div>
  );
};
