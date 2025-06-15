import { JournalWithEntryCount } from "@/types";
import { getUserOrThrow } from "@/utils/get-user-throw";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = await createClient();

  const user = await getUserOrThrow(supabase);

  const { data, error } = await supabase.rpc("get_journals_with_entry_count", { uid: user.id });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data as JournalWithEntryCount[]);
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const user = await getUserOrThrow(supabase);

  const body = await req.json();
  const { title, description, color } = body;

  if (!title || typeof title !== "string") {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  if (!color || typeof color !== "string") {
    return NextResponse.json({ error: "Color is required" }, { status: 400 });
  }

  const { data: journal, error } = await supabase
    .from("journal")
    .insert([
      {
        author_id: user.id,
        title,
        description,
        color_hex: color
      }
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ journal }, { status: 201 });
}
