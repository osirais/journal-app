"use server";

import { DAILY_ENTRY_REWARD, DAILY_MOOD_ENTRY_REWARD } from "@/constants/rewards";
import { createEntrySchemaOnboarding } from "@/lib/validators/entry";
import { createJournalSchema } from "@/lib/validators/journal";
import { updateMoodSchema } from "@/lib/validators/mood";
import { createReasonSchema } from "@/lib/validators/reasons";
import { getUserOrThrow } from "@/utils/get-user-throw";
import { createClient } from "@/utils/supabase/server";
import z from "zod";

export async function completeOnboarding() {
  try {
    const supabase = await createClient();
    const user = await getUserOrThrow(supabase);

    const { error } = await supabase.from("users").update({ onboarded: true }).eq("id", user.id);

    if (error) {
      throw error;
    }

    return { success: true, message: "Onboarding completed successfully!" };
  } catch (error) {
    console.error("Error completing onboarding:", error);
    return { success: false, message: "Failed to complete onboarding" };
  }
}

export async function createFirstJournal(form: z.infer<typeof createJournalSchema>) {
  const validated = createJournalSchema.parse(form);

  const supabase = await createClient();
  const user = await getUserOrThrow(supabase);

  const { data: existingJournal, error: fetchError } = await supabase
    .from("journal")
    .select("id")
    .eq("author_id", user.id)
    .limit(1)
    .maybeSingle();

  if (fetchError && fetchError.code !== "PGRST116") {
    throw new Error(fetchError.message);
  }

  if (existingJournal) {
    throw new Error("User already has a journal");
  }

  const { data: journal, error } = await supabase
    .from("journal")
    .insert([
      {
        author_id: user.id,
        title: validated.title,
        description: validated.description || "",
        color_hex: validated.color
      }
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return journal;
}

export async function createFirstEntry(form: { title: string; content: string }) {
  const supabase = await createClient();
  const user = await getUserOrThrow(supabase);
  const { title, content } = form;

  const { data: journals, error: fetchError } = await supabase
    .from("journal")
    .select("id")
    .eq("author_id", user.id);

  if (fetchError) throw new Error(fetchError.message);
  if (!journals?.length) throw new Error("User does not have a journal");
  if (journals.length > 1) throw new Error("User has more than one journal");

  const [{ id: journalId }] = journals;

  const validated = createEntrySchemaOnboarding.parse({
    title,
    content,
    journalId
  });

  const { data: existingEntry, error: entryFetchError } = await supabase
    .from("entry")
    .select("id")
    .eq("journal_id", journalId)
    .limit(1)
    .single();

  if (entryFetchError && entryFetchError.code !== "PGRST116")
    throw new Error(entryFetchError.message);
  if (existingEntry) throw new Error("First entry already exists for this journal");

  const { data: prevTransaction } = await supabase
    .from("balance_transaction")
    .select("id")
    .eq("user_id", user.id)
    .eq("currency", "droplets")
    .eq("reason", "first_journal_entry")
    .maybeSingle();

  const { data: prevStreak } = await supabase
    .from("streak")
    .select("id")
    .eq("user_id", user.id)
    .eq("category", "journal_entries")
    .maybeSingle();

  if (prevTransaction || prevStreak)
    throw new Error("First journal entry reward or streak already exists");

  const { data: entry, error: insertError } = await supabase
    .from("entry")
    .insert([
      {
        journal_id: journalId,
        title: validated.title,
        content: validated.content
      }
    ])
    .select()
    .single();

  if (insertError) throw new Error(insertError.message);

  const { data: balance } = await supabase
    .from("user_balance")
    .select("balance")
    .eq("user_id", user.id)
    .eq("currency", "droplets")
    .maybeSingle();

  if (!balance) {
    await supabase.from("user_balance").insert([
      {
        user_id: user.id,
        currency: "droplets",
        balance: DAILY_ENTRY_REWARD
      }
    ]);
  } else {
    const { balance: currentBalance } = balance;
    await supabase
      .from("user_balance")
      .update({ balance: currentBalance + DAILY_ENTRY_REWARD })
      .eq("user_id", user.id)
      .eq("currency", "droplets");
  }

  await supabase.from("balance_transaction").insert([
    {
      user_id: user.id,
      currency: "droplets",
      amount: DAILY_ENTRY_REWARD,
      reason: "first_journal_entry"
    }
  ]);

  await supabase.from("streak").insert([
    {
      user_id: user.id,
      category: "journal_entries",
      current_streak: 1,
      longest_streak: 1,
      last_completed_date: new Date().toISOString().slice(0, 10)
    }
  ]);

  return entry;
}

export async function createFirstMoodEntry(scale: number) {
  const validation = updateMoodSchema.safeParse({ scale });

  if (!validation.success) {
    throw new Error(validation.error.errors[0].message);
  }

  const supabase = await createClient();
  const user = await getUserOrThrow(supabase);

  const { data: existingMood, error: moodFetchError } = await supabase
    .from("mood_entry")
    .select("id")
    .eq("user_id", user.id)
    .limit(1)
    .single();

  if (moodFetchError && moodFetchError.code !== "PGRST116") throw new Error(moodFetchError.message);
  if (existingMood) throw new Error("Mood entry already exists for this user");

  const { data: prevTransaction } = await supabase
    .from("balance_transaction")
    .select("id")
    .eq("user_id", user.id)
    .eq("currency", "droplets")
    .eq("reason", "first_mood_entry")
    .maybeSingle();

  const { data: prevStreak } = await supabase
    .from("streak")
    .select("id")
    .eq("user_id", user.id)
    .eq("category", "mood_entries")
    .maybeSingle();

  if (prevTransaction || prevStreak)
    throw new Error("First mood entry reward or streak already exists");

  const { data: moodEntry, error } = await supabase
    .from("mood_entry")
    .insert([{ user_id: user.id, scale }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  const { data: balance } = await supabase
    .from("user_balance")
    .select("balance")
    .eq("user_id", user.id)
    .eq("currency", "droplets")
    .maybeSingle();

  if (!balance) {
    await supabase
      .from("user_balance")
      .insert([{ user_id: user.id, currency: "droplets", balance: DAILY_MOOD_ENTRY_REWARD }]);
  } else {
    await supabase
      .from("user_balance")
      .update({ balance: balance.balance + DAILY_MOOD_ENTRY_REWARD })
      .eq("user_id", user.id)
      .eq("currency", "droplets");
  }

  await supabase.from("balance_transaction").insert([
    {
      user_id: user.id,
      currency: "droplets",
      amount: DAILY_MOOD_ENTRY_REWARD,
      reason: "first_mood_entry"
    }
  ]);

  await supabase.from("streak").insert([
    {
      user_id: user.id,
      category: "mood_entries",
      current_streak: 1,
      longest_streak: 1,
      last_completed_date: new Date().toISOString().slice(0, 10)
    }
  ]);

  return moodEntry;
}

export async function createFirstReason(text: string) {
  const validation = createReasonSchema.safeParse({ text });

  if (!validation.success) {
    throw new Error(validation.error.errors[0]?.message || "Invalid reason text");
  }

  const supabase = await createClient();
  const user = await getUserOrThrow(supabase);

  const { data: existingReason, error: fetchError } = await supabase
    .from("reason")
    .select("id")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  if (fetchError) {
    throw new Error("Failed to check for existing reason");
  }

  if (existingReason) {
    throw new Error("Reason already exists for this user");
  }

  const { error: insertError } = await supabase.from("reason").insert([
    {
      user_id: user.id,
      text: validation.data.text
    }
  ]);

  if (insertError) {
    throw new Error("Failed to create reason");
  }
}
