"use server";

import { getUserOrThrow } from "@/utils/get-user-throw";
import { createClient } from "@/utils/supabase/server";

export async function completeTour() {
  try {
    const supabase = await createClient();
    const user = await getUserOrThrow(supabase);

    const { error } = await supabase
      .from("users")
      .update({ completed_tour: true })
      .eq("id", user.id);

    if (error) {
      throw error;
    }

    return { success: true, message: "Tour completed successfully!" };
  } catch (error) {
    console.error("Error completing tour:", error);
    return { success: false, message: "Failed to complete tour" };
  }
}
