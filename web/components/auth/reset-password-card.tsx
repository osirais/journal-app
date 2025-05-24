"use client";

import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FC, useState } from "react";

interface ResetPasswordCardProps {
  message: Message;
}

export const ResetPasswordCard: FC<ResetPasswordCardProps> = ({ message }) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const canSubmit = password.trim() !== "" && confirm.trim() !== "" && password === confirm;

  return (
    <Card className="w-max p-6">
      <form className="flex w-full max-w-md flex-col gap-2 p-4 [&>input]:mb-4">
        <h1 className="text-2xl font-medium">Reset password</h1>
        <p className="text-foreground/60 text-sm">Please enter your new password below.</p>
        <Label htmlFor="password">New password</Label>
        <Input
          type="password"
          name="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <SubmitButton
          formAction={resetPasswordAction}
          pendingText="Resetting..."
          disabled={!canSubmit}
        >
          Reset password
        </SubmitButton>
        <FormMessage message={message} />
      </form>
    </Card>
  );
};
