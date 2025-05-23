import { FC } from "react";
import Link from "next/link";
import { getColorFromString } from "@/utils/get-color-from-string";

interface TagProps {
  journalId: string;
  tag: TagType;
}

export type TagType = {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
};

export const TagComponent: FC<TagProps> = ({ journalId, tag }) => {
  const color = getColorFromString(tag.name);

  return (
    <Link href={`/entries/${journalId}?tag=${tag.id}`}>
      <div
        style={{
          backgroundColor: color + "50",
          color: color
        }}
        className="inline-block rounded-full px-2 py-0.5 text-xs"
      >
        {tag.name}
      </div>
    </Link>
  );
};
