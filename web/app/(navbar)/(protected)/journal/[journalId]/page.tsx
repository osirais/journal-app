import EntriesPage from "@/components/entries/entries-page";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";

type Props = {
  params: {
    journalId: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = await createClient();

  const { data: journal } = await supabase
    .from("journal")
    .select("title")
    .eq("id", params.journalId)
    .is("deleted_at", null)
    .single();

  return {
    title: journal?.title ? `Entries · ${journal.title}` : "Entries"
  };
}

export default function Page({ params }: Props) {
  return <EntriesPage />;
}
