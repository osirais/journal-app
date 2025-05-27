"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateJournal(journalId: string, formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!title?.trim()) {
    return { error: "Title is required" };
  }

  try {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const { error } = await supabase
      .from("journal")
      .update({
        title: title.trim(),
        description: description?.trim() || null,
        updated_at: new Date().toISOString()
      })
      .eq("id", journalId)
      .eq("author_id", user.id)
      .is("deleted_at", null);

    if (error) {
      console.error("Error updating journal:", error);
      return { error: "Failed to update journal" };
    }

    revalidatePath("/dashboard");
    revalidatePath(`/journal/${journalId}`);

    return { success: true };
  } catch (error) {
    console.error("Error updating journal:", error);
    return { error: "Failed to update journal" };
  }
}

export async function deleteJournal(journalId: string) {
  const supabase = await createClient();

  try {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    // Soft delete the journal
    const { error } = await supabase
      .from("journal")
      .update({
        deleted_at: new Date().toISOString()
      })
      .eq("id", journalId)
      .eq("author_id", user.id)
      .is("deleted_at", null);

    if (error) {
      console.error("Error deleting journal:", error);
      return { error: "Failed to delete journal" };
    }

    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error deleting journal:", error);
    return { error: "Failed to delete journal" };
  }
}
