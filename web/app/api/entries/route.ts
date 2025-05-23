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

  const url = new URL(req.url);
  const journalId = url.searchParams.get("journalId");
  if (!journalId) {
    return NextResponse.json({ error: "journalId query parameter required" }, { status: 400 });
  }

  // verify the journal belongs to the user and is not deleted
  const { data: journal, error: journalError } = await supabase
    .from("journal")
    .select("id")
    .eq("id", journalId)
    .eq("author_id", user.id)
    .is("deleted_at", null)
    .single();

  if (journalError || !journal) {
    return NextResponse.json({ error: "Journal not found or access denied" }, { status: 404 });
  }

  const { data: entries, error } = await supabase
    .from("entry")
    .select("*")
    .eq("journal_id", journalId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ entries });
}

export async function POST(req: Request) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { journalId, title, content } = body;

  if (!journalId || typeof journalId !== "string") {
    return NextResponse.json({ error: "journalId is required" }, { status: 400 });
  }

  if (!content || typeof content !== "string") {
    return NextResponse.json(
      { error: "content is required and must be a string" },
      { status: 400 }
    );
  }

  // verify the journal belongs to the user and is not deleted
  const { data: journal, error: journalError } = await supabase
    .from("journal")
    .select("id")
    .eq("id", journalId)
    .eq("author_id", user.id)
    .is("deleted_at", null)
    .single();

  if (journalError || !journal) {
    return NextResponse.json({ error: "Journal not found or access denied" }, { status: 404 });
  }

  const { data: entry, error } = await supabase
    .from("entry")
    .insert([
      {
        journal_id: journalId,
        title: title ?? null,
        content
      }
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ entry }, { status: 201 });
}
