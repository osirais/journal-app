"use client";

import { loginAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

export const LoginCard: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    setFormValid(email.trim() !== "" && password.trim() !== "");
  }, [email, password]);

  return (
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
            disabled={!formValid}
            className={formValid ? "cursor-pointer text-white" : "cursor-not-allowed text-gray-400"}
          >
            Sign in
          </SubmitButton>
        </div>
      </form>
    </Card>
  );
};
