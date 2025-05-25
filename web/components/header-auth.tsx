import { UserActionsDropdown } from "@/components/user-actions-dropdown";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { createClient } from "@/utils/supabase/server";
import { Ticket } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data } = await supabase.from("users_with_stamps").select("*").eq("id", user?.id).single();

  const hoverBgClass = "hover:bg-white/20";
  const cursorPointer = "cursor-pointer";

  if (!hasEnvVars) {
    return (
      <div className="flex items-center gap-4">
        <div>
          <Badge variant="default" className="pointer-events-none font-normal">
            Please update .env.local file with anon key and url
          </Badge>
        </div>
      </div>
    );
  }

  return data ? (
    <div className="flex items-center gap-3">
      <div className="grid grid-cols-[repeat(3,max-content)] place-items-center gap-2">
        <UserActionsDropdown username={data.username} />
        <div
          className="mt-1 grid grid-cols-[max-content_max-content] items-center gap-2"
          title="Stamps"
        >
          <span>{data.stamps}</span>
          <Ticket size={16} />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant="ghost" className={`${hoverBgClass} ${cursorPointer}`}>
        <Link href="/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant="ghost" className={`${hoverBgClass} ${cursorPointer}`}>
        <Link href="/register">Sign up</Link>
      </Button>
    </div>
  );
}
