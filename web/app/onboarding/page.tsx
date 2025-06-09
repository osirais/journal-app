import { OnboardingPage } from "@/components/onboarding/onboarding-page";
import { getUserOrThrow } from "@/utils/get-user-throw";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();
  const user = await getUserOrThrow(supabase);

  const { data: profile, error } = await supabase
    .from("users")
    .select("onboarded")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    redirect("/login");
  }

  if (profile.onboarded) {
    redirect("/dashboard");
  }

  return <OnboardingPage />;
}
