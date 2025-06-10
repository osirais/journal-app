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

export async function createJournal(form: { title: string; description?: string }) {
  const { title, description } = form;

  if (!title || typeof title !== "string") {
    throw new Error("Title is required");
  }

  const supabase = await createClient();
  const user = await getUserOrThrow(supabase);

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
