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
