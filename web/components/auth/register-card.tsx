"use client";

import { registerAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import { Check, LoaderCircle, X } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export function RegisterCard() {
  return (
    <Suspense fallback={<Card className="p-6">Loading...</Card>}>
      <RegisterCardContent />
    </Suspense>
  );
}

function RegisterCardContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") ?? "";

  const supabase = createClient();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    if (username) {
      if (!/^[a-zA-Z0-9._-]{3,32}$/.test(username)) {
        setIsUsernameAvailable(false);
        setIsCheckingUsername(false);
        return;
      }

      setIsCheckingUsername(true);
      setIsUsernameAvailable(null);

      const checkUsername = async () => {
        try {
          const { data } = await supabase
            .from("users")
            .select("username")
            .eq("username", username)
            .maybeSingle();

          setIsUsernameAvailable(!data);
        } catch (error) {
          console.error(error);
          setIsUsernameAvailable(null);
        } finally {
          setIsCheckingUsername(false);
        }
      };

      const timeoutId = setTimeout(checkUsername, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setIsUsernameAvailable(null);
    }
  }, [username, supabase]);

  const canSubmit =
    username.length >= 3 &&
    username.length <= 32 &&
    /^[a-zA-Z0-9._-]+$/.test(username) &&
    isUsernameAvailable === true &&
    email.length > 0 &&
    password.length > 0;

  return (
    <div className="grid grid-rows-[max-content_max-content] place-items-center gap-6">
      <Suspense fallback={<Card className="p-6">Loading...</Card>}>
        <Card className="w-max p-6">
          <form className="mx-auto flex min-w-64 max-w-64 flex-col">
            <h1 className="text-2xl font-medium">Sign up</h1>
            <p className="text text-foreground text-sm">
              Already have an account?{" "}
              <Link className="text-primary font-medium underline" href="/login">
                Sign in
              </Link>
            </p>

            <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
              <div>
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Your username"
                    required
                    className={`${
                      isUsernameAvailable === true
                        ? "not-focus-visible:border-green-500 focus-visible:ring-green-500"
                        : isUsernameAvailable === false
                          ? "not-focus-visible:border-red-500 focus-visible:ring-red-500"
                          : ""
                    }`}
                  />
                  {username && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
                      {isCheckingUsername ? (
                        <LoaderCircle className="text-muted-foreground size-4 animate-spin" />
                      ) : isUsernameAvailable === true ? (
                        <Check className="size-4 text-green-500" />
                      ) : isUsernameAvailable === false ? (
                        <X className="size-4 text-red-500" />
                      ) : null}
                    </div>
                  )}
                </div>
                <div className="mt-1 text-xs">
                  {username.length > 0 && !/^[a-zA-Z0-9._-]*$/.test(username) && (
                    <p className="text-red-500">
                      Username can only contain letters, numbers, underscores, periods, and hyphens
                    </p>
                  )}
                  {(username.length < 3 || username.length > 32) && (
                    <p className="text-red-500">Username must be 3-32 characters</p>
                  )}
                  {isUsernameAvailable === false && (
                    <p className="text-red-500">Username is already taken</p>
                  )}
                </div>
              </div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
              <SubmitButton
                pendingText="Signing up..."
                disabled={!canSubmit}
                onClick={async (e) => {
                  e.preventDefault();
                  await registerAction(username, email, password);
                }}
              >
                Sign up
              </SubmitButton>
              {error && (
                <div className="mt-4 rounded-md border border-red-500 bg-red-500/20 p-3 text-sm text-red-500">
                  {decodeURIComponent(error)}
                </div>
              )}
            </div>
          </form>
        </Card>
      </Suspense>
    </div>
  );
}
