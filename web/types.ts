export type Journal = {
  id: string;
  author_id: string;
  title: string;
  description: string;
  thumbnail_url: string | null;
  color_hex: string;
  created_at: string;
  updated_at: string;
};

export type JournalWithEntryCount = Journal & {
  entries: number;
};

export type TagType = {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
};

export type Task = {
  id: string;
  name: string;
  description: string | null;
  interval: "daily" | "weekly" | "monthly";
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type Reason = {
  id: string;
  user_id?: string;
  text: string;
  created_at?: string;
  updated_at?: string;
};
