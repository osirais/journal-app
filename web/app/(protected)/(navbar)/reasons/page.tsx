import { ReasonsPage } from "@/components/reasons/reasons-page";
import { getUserOrThrow } from "@/utils/get-user-throw";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const user = await getUserOrThrow(supabase);

  const { data: reasons } = await supabase
    .from("reason")
    .select("id, text, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return <ReasonsPage initialReasons={reasons ?? []} />;
}
