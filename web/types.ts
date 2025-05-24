export type JournalInfo = {
  journal: {
    id: string;
    author_id: string;
    title: string;
    description: string;
    thumbnail_url: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  };
  entries: number;
};
