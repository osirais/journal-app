import { TagType } from "@/types";
import { getColorFromString } from "@/utils/get-color-from-string";
import { FC } from "react";

interface TagProps {
  journalId: string;
  tag: TagType;
}

export const TagComponent: FC<TagProps> = ({ journalId, tag }) => {
  const color = getColorFromString(tag.name);

  return (
    // reload document to only show entries with tag, maybe improve this later
    <a href={`/journal/${journalId}?tag=${tag.id}`}>
      <div
        style={{
          backgroundColor: color + "50",
          color: color
        }}
        className="inline-block rounded-full px-2 py-0.5 text-xs"
      >
        {tag.name}
      </div>
    </a>
  );
};
