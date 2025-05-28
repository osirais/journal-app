import { MoodCardCSR } from "@/components/dashboard/mood-csr";
import { createClient } from "@/utils/supabase/server";

export async function MoodCardSSR() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  let eligible = false;
  let streak = 0;

  if (user && !userError) {
    const userId = user.id;

    const { data: lastTransaction, error: txError } = await supabase
      .from("balance_transaction")
      .select("id")
      .eq("user_id", userId)
      .eq("currency", "stamps")
      .eq("reason", "daily_mood_entry")
      .gt("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .limit(1)
      .maybeSingle();

    eligible = !lastTransaction && !txError;

    const { data: streakData, error: streakError } = await supabase
      .from("streak")
      .select("current_streak")
      .eq("user_id", userId)
      .eq("category", "mood_entries")
      .maybeSingle();

    if (streakData && !streakError) {
      streak = streakData.current_streak ?? 0;
    }
  }

  const { data: moodData } = await supabase
    .from("mood_entry")
    .select("scale")
    .eq("user_id", user?.id ?? "")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const currentMood = moodData?.scale ?? null;

  return <MoodCardCSR initialMood={currentMood} eligible={eligible} streak={streak} />;
}
