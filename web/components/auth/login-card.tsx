"use client";

import { loginAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FC, Suspense, useState } from "react";

export const LoginCard: FC = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") ?? "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit = email.trim() !== "" && password.trim() !== "";

  return (
    <Suspense fallback={<Card className="p-6">Loading...</Card>}>
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
            <SubmitButton
              pendingText="Signing In..."
              formAction={loginAction}
              disabled={!canSubmit}
            >
              Sign in
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
  );
};
