export type Journal = {
  id: string;
  author_id: string;
  title: string;
  description: string;
  thumbnail_url: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type JournalWithEntryCount = Journal & {
  entries: number;
};

export type TagType = {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
};

export interface Task {
  id: string;
  name: string;
  description: string | null;
  interval: "daily" | "weekly" | "monthly";
  created_at: string;
  updated_at: string;
}
