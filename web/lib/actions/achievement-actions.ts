"use server";

import { getUserOrThrow } from "@/utils/get-user-throw";
import { createClient } from "@/utils/supabase/server";

export async function getUserAchievementsData() {
  const supabase = await createClient();
  const user = await getUserOrThrow(supabase);

  const { data: journalActivity } = await supabase
    .from("user_activity_summary")
    .select("date, entries_created")
    .eq("user_id", user.id);

  const journalDaysCount = (journalActivity ?? []).filter((a) => a.entries_created > 0).length;

  const { data: moodDates } = await supabase
    .from("mood_entry")
    .select("created_at")
    .eq("user_id", user.id);

  const { data: taskDates } = await supabase
    .from("task_completion")
    .select("completed_at")
    .eq("user_id", user.id);

  function countDistinctDays(records: { created_at?: string; completed_at?: string }[]) {
    const dateSet = new Set(
      records.map((r) => (r.created_at ?? r.completed_at)?.slice(0, 10)).filter(Boolean)
    );
    return dateSet.size;
  }

  const dailyData = {
    journal: journalDaysCount,
    mood: countDistinctDays(moodDates ?? []),
    tasks: countDistinctDays(taskDates ?? [])
  };

  const { data: streaks } = await supabase
    .from("streak")
    .select("category,current_streak")
    .eq("user_id", user.id);

  const streakData = {
    journal: streaks?.find((s) => s.category === "journal_entries")?.current_streak ?? 0,
    mood: streaks?.find((s) => s.category === "mood_entries")?.current_streak ?? 0,
    tasks: streaks?.find((s) => s.category === "task_completions")?.current_streak ?? 0
  };

  return { dailyData, streakData };
}
