"use client";

import { registerAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MailCheck } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

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
  const success = searchParams.get("success") ?? "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit = email.length > 0 && password.length > 0;

  return (
    <div className="grid grid-rows-[max-content_max-content] place-items-center gap-6">
      <Suspense fallback={<Card className="p-6">Loading...</Card>}>
        <Card className="w-max p-6">
          {success ? (
            <div className="flex flex-col items-center p-6">
              <h2 className="mb-2 flex items-center gap-2 text-xl font-semibold">
                <MailCheck />
                Check your email
              </h2>
              <p className="text-muted-foreground text-center text-sm">
                We&apos;ve sent a confirmation link to <span className="font-medium">{email}</span>
                .<br />
                Please check your inbox to complete your registration.
              </p>
            </div>
          ) : (
            <form className="mx-auto flex min-w-64 max-w-64 flex-col">
              <h1 className="text-2xl font-medium">Sign up</h1>
              <p className="text text-foreground text-sm">
                Already have an account?{" "}
                <Link className="text-primary font-medium underline" href="/login">
                  Sign in
                </Link>
              </p>

              <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
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
                    await registerAction(email, password);
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
          )}
        </Card>
      </Suspense>
    </div>
  );
}
