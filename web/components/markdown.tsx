import { FC, ReactNode } from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
}

export const Markdown: FC<MarkdownProps> = ({ children }) => {
  return <ReactMarkdown>{children as string}</ReactMarkdown>;
};
