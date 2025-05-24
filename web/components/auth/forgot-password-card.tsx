"use client";

import { SmtpMessage } from "@/app/(auth-pages)/smtp-message";
import { forgotPasswordAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FC, useState } from "react";

export const ForgotPasswordCard: FC = () => {
  const [email, setEmail] = useState("");

  const canSubmit = email.trim() !== "";

  return (
    <div className="grid grid-rows-[max-content_max-content] place-items-center gap-6">
      <Card className="p-6">
        <form className="text-foreground mx-auto flex w-full min-w-64 max-w-64 flex-1 flex-col gap-2 [&>input]:mb-6">
          <div>
            <h1 className="text-2xl font-medium">Reset Password</h1>
            <p className="text-secondary-foreground text-sm">
              Already have an account?{" "}
              <Link className="text-primary underline" href="/login">
                Sign in
              </Link>
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <SubmitButton
              formAction={forgotPasswordAction}
              disabled={!canSubmit}
              pendingText="Sending..."
            >
              Reset Password
            </SubmitButton>
          </div>
        </form>
      </Card>
      <SmtpMessage />
    </div>
  );
};
