import ManageAccountPage from "@/components/auth/manage-account-page";
import { getUserOrThrow } from "@/utils/get-user-throw";
import { createClient } from "@/utils/supabase/server";

export const metadata = {
  title: "Manage Account"
};

export default async function Page() {
  const supabase = await createClient();
  const user = await getUserOrThrow(supabase);

  const { data } = await supabase.from("users").select("username").eq("id", user.id).single();

  const username = data?.username ?? "";

  return <ManageAccountPage initialUsername={username} />;
}
