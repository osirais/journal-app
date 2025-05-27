"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getCurrentMood() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { mood: null, error: "User not authenticated" };
  }

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

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { success: false, error: "User not authenticated" };
  }

  // check if user already has a mood entry today
  const today = new Date().toISOString().split("T")[0];
  const { data: existingEntry } = await supabase
    .from("mood_entry")
    .select("id")
    .eq("user_id", user.id)
    .gte("created_at", `${today}T00:00:00.000Z`)
    .lt("created_at", `${today}T23:59:59.999Z`)
    .is("deleted_at", null)
    .single();

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

  revalidatePath("/dashboard");
  return { success: true, error: null };
}

export async function getMoodHistory() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { data: [], error: "User not authenticated" };
  }

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
