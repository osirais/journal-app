import { JournalWithEntryCount } from "@/types";
import { getUserOrThrow } from "@/utils/get-user-throw";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const supabase = await createClient();

  const user = await getUserOrThrow(supabase);

  const searchParams = new URL(req.url).searchParams;
  const journalId = searchParams.get("id");

  if (!journalId) {
    return NextResponse.json({ error: "Missing journal ID" }, { status: 400 });
  }

  const { data: journal, error } = await supabase
    .from("journal")
    .select("*")
    .eq("id", journalId)
    .eq("author_id", user.id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Journal not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // count entries
  const entryCount = await supabase
    .from("entry")
    .select("id", { count: "exact" })
    .eq("journal_id", journalId);

  if (entryCount.error) {
    return NextResponse.json({ error: entryCount.error.message }, { status: 500 });
  }

  return NextResponse.json({
    ...journal,
    entries: entryCount.count || 0
  } satisfies JournalWithEntryCount);
}
