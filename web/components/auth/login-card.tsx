"use client";

import { loginAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/client";
import { encodedRedirect } from "@/utils/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Button } from "../ui/button";

export function LoginCard() {
  return (
    <Suspense fallback={<Card className="p-6">Loading...</Card>}>
      <LoginCardContent />
    </Suspense>
  );
}

function LoginCardContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") ?? "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit = email.trim() !== "" && password.trim() !== "";

  async function signInWithGoogle() {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google"
    });

    if (error) {
      encodedRedirect("error", "/login", error.message);
    }
  }

  return (
    <>
      <Card className="p-6">
        <form className="flex min-w-64 flex-1 flex-col">
          <h1 className="text-2xl font-medium">Sign in</h1>
          <p className="text-foreground text-sm">
            Don't have an account?{" "}
            <Link className="text-foreground font-medium underline" href="/register">
              Sign up
            </Link>
          </p>
          <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link className="text-foreground text-xs underline" href="/forgot-password">
                Forgot Password?
              </Link>
            </div>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex flex-col gap-6">
              <SubmitButton
                pendingText="Signing In..."
                formAction={loginAction}
                disabled={!canSubmit}
              >
                Sign in
              </SubmitButton>
              <Separator />
              <Button onClick={signInWithGoogle}>
                <svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 24 24">
                  <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28a5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934a8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934c0-.528-.081-1.097-.202-1.625z" />
                </svg>
                Sign in with Google
              </Button>
            </div>
            {error && (
              <div className="mt-4 rounded-md border border-red-500 bg-red-500/20 p-3 text-sm text-red-500">
                {decodeURIComponent(error)}
              </div>
            )}
          </div>
        </form>
      </Card>
    </>
  );
}
