export type JournalWithEntries = {
  id: string;
  author_id: string;
  title: string;
  description: string;
  thumbnail_url: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  entries: number;
};

export type TagType = {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
};
