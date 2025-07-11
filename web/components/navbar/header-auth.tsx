import DropletCountSSR from "@/components/navbar/droplet-count-ssr";
import { UserActionsDropdown } from "@/components/navbar/user-actions-dropdown";
import { Button } from "@/components/ui/button";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { createClient } from "@/utils/supabase/server";
import { Badge, LogIn } from "lucide-react";
import Link from "next/link";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!hasEnvVars) {
    return (
      <div className="flex items-center gap-4">
        <Badge className="pointer-events-none font-normal">
          Please update .env.local file with anon key and url
        </Badge>
      </div>
    );
  }

  if (!user) {
    return (
      <Button variant="ghost" asChild>
        <Link href="/login">
          <LogIn />
          <span>Sign in</span>
        </Link>
      </Button>
    );
  }

  const { data } = await supabase.from("users").select("username").eq("id", user.id).single();

  if (!data) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="grid grid-cols-[repeat(3,max-content)] place-items-center gap-2">
        <UserActionsDropdown username={data.username} />
        <DropletCountSSR userId={user.id} />
      </div>
    </div>
  );
}
