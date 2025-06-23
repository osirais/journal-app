"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { updateUsername } from "@/lib/actions/account-actions";
import { updateUsernameSchema } from "@/lib/validators/account";
import { Calendar, Lock, User } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type ManageAccountPageProps = {
  initialUsername: string;
};

export default function ManageAccountPage({ initialUsername }: ManageAccountPageProps) {
  const [username, setUsername] = useState(initialUsername);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(false);

    const result = updateUsernameSchema.safeParse({ name: username });

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setError(null);
    startTransition(async () => {
      try {
        await updateUsername(username);
        toast.success("Account details updated");
        setSuccess(true);
      } catch (err: any) {
        setError(err.message ?? "Failed to update username");
      }
    });
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-foreground mb-2 text-3xl font-bold">
            Account Settings (Placeholder, WIP)
          </h1>
          <p className="text-muted-foreground">
            Manage your account information and security settings
          </p>
        </div>

        <div className="space-y-6">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="size-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    className="max-w-md"
                  />
                  {error && <p className="text-sm text-red-500">{error}</p>}
                </div>
                <div className="pointer-events-none grid gap-4 opacity-50">
                  <Label htmlFor="email">Email (not implemented)</Label>
                  <Input
                    id="email"
                    autoComplete="off"
                    placeholder="Enter your email"
                    className="max-w-md"
                  />
                </div>
                <Button
                  type="submit"
                  variant="outline"
                  disabled={isPending}
                  className="mt-4 cursor-pointer"
                >
                  {isPending ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          </form>

          <Card className="pointer-events-none opacity-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="size-5" />
                Security
              </CardTitle>
              <CardDescription>
                Manage your password and security preferences (not implemented)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <h3 className="font-medium">Password</h3>
                  <p className="text-muted-foreground text-sm">Last changed 30 days ago</p>
                </div>
                <Button variant="outline">Change Password</Button>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-muted-foreground text-sm">Add an extra layer of security</p>
                </div>
                <Button variant="outline">Enable 2FA</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="pointer-events-none opacity-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="size-5" />
                Account Information
              </CardTitle>
              <CardDescription>View your account details (not implemented)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                <div>
                  <Label className="text-muted-foreground">Member since</Label>
                  <p className="font-medium">January 2024</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Account type</Label>
                  <p className="font-medium">Free</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Last login</Label>
                  <p className="font-medium">2 hours ago</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <p className="font-medium text-green-600 dark:text-green-400">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          <Card className="border-destructive/20 pointer-events-none opacity-50">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions for your account (not implemented)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-destructive/20 flex items-center justify-between rounded-lg border p-4">
                <div>
                  <h3 className="text-destructive font-medium">Delete Account</h3>
                  <p className="text-muted-foreground text-sm">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
