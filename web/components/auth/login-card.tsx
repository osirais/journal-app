"use client";

import { loginAction, signInWithGoogleAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CredentialResponse } from "google-one-tap";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

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

  const router = useRouter();

  (window as any).handleSignInWithGoogle = async (response: CredentialResponse) => {
    const path = await signInWithGoogleAction(response);
    router.push(path);
  };

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
            <div>
              <div
                id="g_id_onload"
                data-client_id="716483514426-daok008f7m7ql7od8gio67tb9mmmutol.apps.googleusercontent.com"
                data-context="signin"
                data-ux_mode="popup"
                data-callback="handleSignInWithGoogle"
                data-nonce=""
                data-itp_support="true"
                data-use_fedcm_for_prompt="true"
              ></div>

              <div
                className="g_id_signin"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signin_with"
                data-size="large"
                data-logo_alignment="left"
              ></div>
            </div>
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
    </>
  );
}
