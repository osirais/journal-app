"use server";

import { DAILY_MOOD_ENTRY_REWARD } from "@/constants/rewards";
import { getUserOrThrow } from "@/utils/get-user-throw";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getCurrentMood() {
  const supabase = await createClient();

  const user = await getUserOrThrow(supabase);

  const { data: moodEntry, error } = await supabase
    .from("mood_entry")
    .select("scale")
    .eq("user_id", user.id)
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 is "no rows returned"
    return { mood: null, error: error.message };
  }

  return { mood: moodEntry?.scale || null, error: null };
}

export async function updateMood(scale: number) {
  const supabase = await createClient();

  const user = await getUserOrThrow(supabase);

  const today = new Date().toISOString().split("T")[0];
  const startOfDay = `${today}T00:00:00.000Z`;
  const endOfDay = `${today}T23:59:59.999Z`;

  const { data: existingEntry } = await supabase
    .from("mood_entry")
    .select("id")
    .eq("user_id", user.id)
    .gte("created_at", startOfDay)
    .lt("created_at", endOfDay)
    .is("deleted_at", null)
    .maybeSingle();

  let result;

  if (existingEntry) {
    result = await supabase
      .from("mood_entry")
      .update({
        scale,
        updated_at: new Date().toISOString()
      })
      .eq("id", existingEntry.id);
  } else {
    result = await supabase.from("mood_entry").insert({
      user_id: user.id,
      scale
    });
  }

  if (result.error) {
    return { success: false, error: result.error.message };
  }

  const { reward, streak } = await handleDailyMoodEntryReward(supabase, user.id);

  revalidatePath("/dashboard");
  return { success: true, reward, streak, error: null };
}

async function handleDailyMoodEntryReward(
  supabase: any,
  userId: string
): Promise<{ reward: number; streak: number }> {
  const { data: lastTransaction, error: transactionError } = await supabase
    .from("balance_transaction")
    .select("id")
    .eq("user_id", userId)
    .eq("currency", "stamps")
    .eq("reason", "daily_mood_entry")
    .gt("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
    .limit(1)
    .maybeSingle();

  if (lastTransaction || transactionError) {
    const { data: streak } = await supabase
      .from("streak")
      .select("current_streak")
      .eq("user_id", userId)
      .eq("category", "mood_entries")
      .maybeSingle();
    return { reward: 0, streak: streak?.current_streak || 0 };
  }

  const { data: userBalance } = await supabase
    .from("user_balance")
    .select("balance")
    .eq("user_id", userId)
    .eq("currency", "stamps")
    .single();

  await supabase.from("balance_transaction").insert([
    {
      user_id: userId,
      currency: "stamps",
      amount: DAILY_MOOD_ENTRY_REWARD,
      reason: "daily_mood_entry"
    }
  ]);

  await supabase
    .from("user_balance")
    .update({ balance: userBalance.balance + DAILY_MOOD_ENTRY_REWARD })
    .eq("user_id", userId)
    .eq("currency", "stamps");

  const today = new Date().toISOString().slice(0, 10);

  const { data: streak, error: streakError } = await supabase
    .from("streak")
    .select("id, current_streak, longest_streak, last_completed_date")
    .eq("user_id", userId)
    .eq("category", "mood_entries")
    .maybeSingle();

  let currentStreak = 1;

  if (!streak || streakError) {
    await supabase.from("streak").insert([
      {
        user_id: userId,
        category: "mood_entries",
        current_streak: 1,
        longest_streak: 1,
        last_completed_date: today
      }
    ]);
  } else {
    const lastDate = streak.last_completed_date ? new Date(streak.last_completed_date) : null;
    const lastDateStr = lastDate ? lastDate.toISOString().slice(0, 10) : null;

    const yesterdayStr = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

    if (lastDateStr === today) {
      currentStreak = streak.current_streak;
    } else if (lastDateStr === yesterdayStr) {
      currentStreak = streak.current_streak + 1;
    } else {
      currentStreak = 1;
    }

    const longest = Math.max(currentStreak, streak.longest_streak);

    await supabase
      .from("streak")
      .update({
        current_streak: currentStreak,
        longest_streak: longest,
        last_completed_date: today
      })
      .eq("user_id", userId)
      .eq("category", "mood_entries");
  }

  return { reward: DAILY_MOOD_ENTRY_REWARD, streak: currentStreak };
}

export async function getMoodHistory() {
  const supabase = await createClient();

  const user = await getUserOrThrow(supabase);

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data: moodEntries, error } = await supabase
    .from("mood_entry")
    .select("scale, created_at")
    .eq("user_id", user.id)
    .is("deleted_at", null)
    .gte("created_at", thirtyDaysAgo.toISOString())
    .order("created_at", { ascending: true });

  if (error) {
    return { data: [], error: error.message };
  }

  // group by date and get the latest mood for each day
  const moodByDate = new Map<string, number>();

  moodEntries?.forEach((entry) => {
    const date = new Date(entry.created_at).toISOString().split("T")[0];
    moodByDate.set(date, entry.scale);
  });

  // create array of all dates in the past 30 days with mood data
  const chartData = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split("T")[0];
    const mood = moodByDate.get(dateString) || null;

    chartData.push({
      date: dateString,
      mood: mood,
      formattedDate: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      })
    });
  }

  return { data: chartData, error: null };
}
