import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { User } from "lucide-react";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data } = await supabase.from("users").select("*").eq("id", user?.id).single();

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
        <div className="flex gap-2">
          <Button
            asChild
            size="sm"
            variant="ghost"
            disabled
            className={`pointer-events-none opacity-75 ${hoverBgClass} ${cursorPointer}`}
          >
            <Link href="/login">Sign in</Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="ghost"
            disabled
            className={`pointer-events-none opacity-75 ${hoverBgClass} ${cursorPointer}`}
          >
            <Link href="/register">Sign up</Link>
          </Button>
        </div>
      </div>
    );
  }

  return data ? (
    <div className="flex items-center gap-2">
      <div className="grid grid-cols-[max-content_max-content] place-items-center gap-1 px-4">
        <User size={16} />
        {data.username}
      </div>
      <form action={signOutAction}>
        <Button type="submit" variant="ghost" className={`${hoverBgClass} ${cursorPointer}`}>
          Sign out
        </Button>
      </form>
      <Link href="/journals">
        <Button type="submit" variant="ghost" className={`${hoverBgClass} ${cursorPointer}`}>
          Journals
        </Button>
      </Link>
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
