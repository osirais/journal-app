import { getUserOrThrow } from "@/utils/get-user-throw";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const user = await getUserOrThrow(supabase);

  const { data, error } = await supabase
    .from("journal")
    .select("id, title")
    .eq("author_id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ journals: data });
}
