import EntryPage from "@/components/entries/entry-page";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ entryId: string }>;
}): Promise<Metadata> {
  const { entryId } = await params;

  const supabase = await createClient();

  const { data: entry } = await supabase
    .from("entry")
    .select("title, journal_id")
    .eq("id", entryId)
    .is("deleted_at", null)
    .single();

  if (!entry) {
    return { title: "Entry not found" };
  }

  const { data: journal } = await supabase
    .from("journal")
    .select("title")
    .eq("id", entry.journal_id)
    .is("deleted_at", null)
    .single();

  return {
    title: journal?.title && entry?.title ? `${journal.title} · ${entry.title}` : "Entry"
  };
}

export default function Page() {
  return <EntryPage />;
}
