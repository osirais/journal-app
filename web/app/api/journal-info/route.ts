import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = new URL(req.url).searchParams;
  const journalId = searchParams.get("id");

  if (!journalId) {
    return NextResponse.json({ error: "Missing journal ID" }, { status: 400 });
  }

  // select journal fields plus a count of entries (not deleted)
  const { data: journal, error } = await supabase
    .from("journal")
    .select(
      `
      *,
      entry_count:entry(
        id
      )
    `
    )
    .eq("id", journalId)
    .eq("author_id", user.id)
    .is("deleted_at", null)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Journal not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // count entries where deleted_at is null
  const entryCount = await supabase
    .from("entry")
    .select("id", { count: "exact" })
    .eq("journal_id", journalId)
    .is("deleted_at", null);

  if (entryCount.error) {
    return NextResponse.json({ error: entryCount.error.message }, { status: 500 });
  }

  return NextResponse.json({
    journal,
    entries: entryCount.count || 0
  });
}
