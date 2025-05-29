import { getUserOrThrow } from "@/utils/get-user-throw";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const supabase = await createClient();

  const url = new URL(req.url);
  const tagId = url.searchParams.get("id");

  const _ = await getUserOrThrow(supabase);

  const tag = await supabase.from("tag").select("id, name").eq("id", tagId).single();

  return NextResponse.json(tag.data);
}
