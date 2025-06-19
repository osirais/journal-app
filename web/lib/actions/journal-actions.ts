"use server";

import { deleteJournalSchema, editJournalSchema } from "@/lib/validators/journal";
import { getUserOrThrow } from "@/utils/get-user-throw";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function editJournal(journalId: string, formData: FormData, color: string) {
  const title = formData.get("title");
  const description = formData.get("description");

  const parseResult = editJournalSchema.safeParse({
    id: journalId,
    title,
    description,
    color
  });

  if (!parseResult.success) {
    const firstError = parseResult.error.errors[0];
    return { error: firstError.message };
  }

  const supabase = await createClient();

  try {
    const user = await getUserOrThrow(supabase);

    const { error } = await supabase
      .from("journal")
      .update({
        title: parseResult.data.title.trim(),
        description: parseResult.data.description?.trim() || null,
        color_hex: parseResult.data.color,
        updated_at: new Date().toISOString()
      })
      .eq("id", journalId)
      .eq("author_id", user.id);

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
  const validation = deleteJournalSchema.safeParse({ id: journalId });

  if (!validation.success) {
    return { error: validation.error.errors[0].message };
  }

  const supabase = await createClient();

  try {
    const user = await getUserOrThrow(supabase);

    const { error } = await supabase
      .from("journal")
      .delete()
      .eq("id", journalId)
      .eq("author_id", user.id);

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
