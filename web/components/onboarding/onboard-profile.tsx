import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUserOrThrow } from "@/utils/get-user-throw";
import { createClient } from "@/utils/supabase/client";
import { Check, LoaderCircle, X } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

export function OnboardProfile({ onSuccess }: { onSuccess: () => void }) {
  const supabase = createClient();

  const [hasProfile, setHasProfile] = useState<boolean | null>(null);

  const [username, setUsername] = useState("");

  const [isCheckingUsername, setIsCheckingUsername] = useState<boolean | null>(null);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setHasProfile(null);
    (async () => {
      const user = await getUserOrThrow(supabase);
      if (!user) {
        setHasProfile(false);
        return;
      }

      const { data: profile } = await supabase
        .from("users")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

      setHasProfile(!!profile);
    })();
  }, [supabase]);

  useEffect(() => {
    setIsUsernameAvailable(null);

    if (username) {
      if (!/^[a-zA-Z0-9._-]{3,32}$/.test(username)) {
        setIsCheckingUsername(false);
        return;
      }

      setIsCheckingUsername(true);

      const checkUsername = async () => {
        const { data, error } = await supabase
          .from("users")
          .select("username")
          .eq("username", username)
          .maybeSingle();

        if (error) {
          console.error("Error checking username:", error);
          setIsUsernameAvailable(false);
        } else {
          setIsUsernameAvailable(!data);
        }

        setIsCheckingUsername(false);
      };

      const timeoutId = setTimeout(checkUsername, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [username, supabase]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (hasProfile) onSuccess();

    if (!isUsernameAvailable) return;

    startTransition(async () => {
      const user = await getUserOrThrow(supabase);

      if (!user) return;

      const { error: profileError } = await supabase.from("users").insert({
        id: user.id,
        username,
        name: user.user_metadata?.name || username,
        avatar_url: user.user_metadata?.avatar_url
      });

      if (profileError) {
        console.error(profileError);
        return;
      }

      const { error: balanceError } = await supabase
        .from("user_balance")
        .insert({ user_id: user.id, currency: "droplets" });

      if (balanceError) {
        console.error(balanceError);
        return;
      }

      onSuccess();
    });
  }

  if (hasProfile === null) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center text-center">
        <div className="bg-card flex flex-col items-center space-y-4 rounded-lg px-8 py-12 shadow-md">
          <LoaderCircle className="text-muted-foreground size-8 animate-spin" />
          <h2 className="text-muted-foreground text-lg font-medium">Checking your profile...</h2>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full w-full flex-col justify-center text-center"
    >
      {hasProfile ? (
        <div className="bg-card flex flex-col items-center space-y-4 rounded-lg px-8 py-12">
          <Check className="size-8 text-green-500" />
          <h2 className="text-xl font-semibold">You already have a profile, great!</h2>
          <p className="text-muted-foreground">You're all set to continue.</p>
        </div>
      ) : (
        <div className="flex flex-grow flex-col items-center justify-center space-y-4 px-8">
          <div className="max-w-md space-y-2">
            <h2 className="text-xl font-medium">Set up your profile</h2>
            <p className="text-muted-foreground">Choose a username. You can change this later.</p>
          </div>
          <div className="mx-auto mt-6 w-full max-w-xs">
            <div className="relative">
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your username"
                required
                className={`${
                  isUsernameAvailable
                    ? "not-focus-visible:border-green-500 focus-visible:ring-green-500"
                    : !isUsernameAvailable && isCheckingUsername === false
                      ? "not-focus-visible:border-red-500 focus-visible:ring-red-500"
                      : ""
                }`}
              />
              {username && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
                  {isCheckingUsername ? (
                    <LoaderCircle className="text-muted-foreground size-4 animate-spin" />
                  ) : isUsernameAvailable ? (
                    <Check className="size-4 text-green-500" />
                  ) : !isUsernameAvailable && isCheckingUsername === false ? (
                    <X className="size-4 text-red-500" />
                  ) : null}
                </div>
              )}
            </div>
            {isCheckingUsername !== null && (
              <div className="mt-1 text-left text-xs text-red-500">
                {(username.length < 3 || username.length > 32) && (
                  <p>Username must be 3-32 characters</p>
                )}
                {!/^[a-zA-Z0-9._-]*$/.test(username) && (
                  <p>
                    Username can only contain letters, numbers, underscores, periods, and hyphens
                  </p>
                )}
                {isUsernameAvailable === false && <p>Username is already taken</p>}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={!hasProfile && (!isUsernameAvailable || isPending)}
          className="cursor-pointer"
        >
          {isPending ? "Saving..." : "Next"}
        </Button>
      </div>
    </form>
  );
}
