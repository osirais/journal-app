import EntriesPage from "@/components/entries/entries-page";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ journalId: string }>;
}): Promise<Metadata> {
  const { journalId } = await params;

  const supabase = await createClient();

  const { data: journal } = await supabase
    .from("journal")
    .select("title")
    .eq("id", journalId)
    .is("deleted_at", null)
    .single();

  return {
    title: journal?.title ? `Entries · ${journal.title}` : "Entries"
  };
}

export default function Page() {
  return <EntriesPage />;
}
