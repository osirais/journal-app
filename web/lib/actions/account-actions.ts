"use server";

import { updateUsernameSchema } from "@/lib/validators/account";
import { getUserOrThrow } from "@/utils/get-user-throw";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateUsername(name: string) {
  const parsed = updateUsernameSchema.safeParse({ name });

  if (!parsed.success) {
    throw new Error(parsed.error.errors[0].message);
  }

  const supabase = await createClient();
  const user = await getUserOrThrow(supabase);

  const { error } = await supabase
    .from("users")
    .update({ name, updated_at: new Date().toISOString() })
    .eq("id", user.id);

  if (error) {
    throw new Error("Failed to update name");
  }

  revalidatePath("/manage-account");

  return { name };
}
