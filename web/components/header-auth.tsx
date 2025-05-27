import StampCountSSR from "@/components/stamp-count-ssr-wrapper";
import { UserActionsDropdown } from "@/components/user-actions-dropdown";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!hasEnvVars) {
    return (
      <div className="flex items-center gap-4">
        <Badge variant="default" className="pointer-events-none font-normal">
          Please update .env.local file with anon key and url
        </Badge>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex gap-2">
        <Button asChild size="sm" variant="ghost">
          <Link href="/login">Sign in</Link>
        </Button>
        <Button asChild size="sm" variant="ghost">
          <Link href="/register">Sign up</Link>
        </Button>
      </div>
    );
  }

  const { data } = await supabase
    .from("users_with_stamps")
    .select("username")
    .eq("id", user.id)
    .single();

  if (!data) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="grid grid-cols-[repeat(3,max-content)] place-items-center gap-2">
        <UserActionsDropdown username={data.username} />
        <StampCountSSR userId={user.id} />
      </div>
    </div>
  );
}
