"use server";

import { createReasonSchema } from "@/lib/validators/reasons";
import { getUserOrThrow } from "@/utils/get-user-throw";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createReason(text: string) {
  const validation = createReasonSchema.safeParse({ text });

  if (!validation.success) {
    throw new Error(validation.error.errors[0]?.message || "Invalid reason text");
  }

  const supabase = await createClient();
  const user = await getUserOrThrow(supabase);

  const { data, error } = await supabase
    .from("reason")
    .insert({
      user_id: user.id,
      text: validation.data.text
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/reasons");

  return data;
}

export async function deleteReason(id: string) {
  if (!id) throw new Error("Missing reason ID");

  const supabase = await createClient();
  const user = await getUserOrThrow(supabase);

  const { error } = await supabase.from("reason").delete().eq("id", id).eq("user_id", user.id);

  if (error) throw new Error(error.message);

  revalidatePath("/reasons");
}
