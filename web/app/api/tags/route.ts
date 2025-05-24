import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const supabase = await createClient();

  const url = new URL(req.url);
  const tagId = url.searchParams.get("id");

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tag = await supabase.from("tag").select("id, name").eq("id", tagId).single();

  return NextResponse.json(tag.data);
}
