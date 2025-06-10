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
  const { title } = form;

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
        description: ""
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
  const { title, content } = form;

  if (!title || typeof title !== "string") {
    throw new Error("Title is required");
  }
  if (!content || typeof content !== "string") {
    throw new Error("Content is required");
  }

  const supabase = await createClient();
  const user = await getUserOrThrow(supabase);

  const { data: journals, error: fetchError } = await supabase
    .from("journal")
    .select("id")
    .eq("author_id", user.id)
    .is("deleted_at", null);

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  if (!journals || journals.length === 0) {
    throw new Error("User does not have a journal");
  }

  if (journals.length > 1) {
    throw new Error("User has more than one journal");
  }

  const journalId = journals[0].id;

  const { data: existingEntry, error: entryFetchError } = await supabase
    .from("entry")
    .select("id")
    .eq("journal_id", journalId)
    .limit(1)
    .single();

  if (entryFetchError && entryFetchError.code !== "PGRST116") {
    throw new Error(entryFetchError.message);
  }

  if (existingEntry) {
    throw new Error("First entry already exists for this journal");
  }

  const { data: entry, error } = await supabase
    .from("entry")
    .insert([
      {
        journal_id: journalId,
        title,
        content
      }
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return entry;
}
