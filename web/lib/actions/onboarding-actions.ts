"use server";

import { getUserOrThrow } from "@/utils/get-user-throw";
import { createClient } from "@/utils/supabase/server";

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

export async function createFirstJournal(form: { title: string; description?: string }) {
  const { title, description } = form;

  if (!title || typeof title !== "string") {
    throw new Error("Title is required");
  }

  const supabase = await createClient();
  const user = await getUserOrThrow(supabase);

  // check if user already has a journal (not deleted)
  const { data: existingJournals, error: fetchError } = await supabase
    .from("journal")
    .select("id")
    .eq("author_id", user.id)
    .is("deleted_at", null)
    .limit(1)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    // PGRST116 means no rows found, so safe to ignore
    throw new Error(fetchError.message);
  }

  if (existingJournals) {
    throw new Error("User already has a journal");
  }

  const { data: journal, error } = await supabase
    .from("journal")
    .insert([
      {
        author_id: user.id,
        title,
        description: description ?? null
      }
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return journal;
}
