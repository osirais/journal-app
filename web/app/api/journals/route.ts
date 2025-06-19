import { createJournalSchema } from "@/lib/validators/journal";
import { JournalWithEntryCount } from "@/types";
import { getUserOrThrow } from "@/utils/get-user-throw";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const supabase = await createClient();

  const user = await getUserOrThrow(supabase);

  const searchParams = new URL(req.url).searchParams;
  const sortBy = searchParams.get("sort");

  const { data, error } = await supabase.rpc("get_journals_with_entry_count", {
    uid: user.id,
    sort_by: sortBy
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data as JournalWithEntryCount[]);
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const user = await getUserOrThrow(supabase);

  const body = await req.json();
  const result = createJournalSchema.safeParse(body);

  if (!result.success) {
    const error = result.error.errors[0];
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const { title, description, color } = result.data;

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
