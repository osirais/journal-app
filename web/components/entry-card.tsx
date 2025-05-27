import { TagComponent } from "@/components/tag-component";
import { Card, CardContent } from "@/components/ui/card";
import { TagType } from "@/types";
import { formatDateAgo } from "@/utils/format-date-ago";
import { CalendarIcon, Clock } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import Markdown from "react-markdown";

type EntryCardProps = {
  entryId: string;
  title: string;
  content: string;
  tags: TagType[];
  journalId: string;
  created_at: string;
  updated_at: string;
};

export const EntryCard: FC<EntryCardProps> = ({
  entryId,
  title,
  content,
  tags,
  journalId,
  created_at,
  updated_at
}) => {
  return (
    <Card className="flex min-h-[80px] items-center overflow-hidden transition-shadow hover:shadow-md">
      <CardContent className="w-full p-0">
        <div className="flex items-center p-6">
          <div className="min-w-0 flex-1">
            <Link href={`/entry/${entryId}`} className="block">
              <h3 className="truncate text-lg font-medium">{title || "Untitled"}</h3>
            </Link>
            <div className="text-muted-foreground mt-1 text-sm">
              <Markdown>{content}</Markdown>
            </div>
            {tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <TagComponent key={tag.id} journalId={journalId} tag={tag} />
                ))}
              </div>
            )}
            <div className="text-muted-foreground mt-2 flex items-center gap-4 text-xs">
              <div className="flex items-center">
                <CalendarIcon className="mr-1 size-3" />
                <span>Created {formatDateAgo(new Date(created_at))}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 size-3" />
                <span>Updated {formatDateAgo(new Date(updated_at))}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
