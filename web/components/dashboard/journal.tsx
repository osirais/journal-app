import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import type { FC } from "react";

export const dynamic = "force-dynamic";

export const JournalCard: FC = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  let eligible = false;
  let message = "";

  if (!user || userError) {
    message = "You must be signed in to claim daily reward.";
  } else {
    const { data: lastTransaction, error } = await supabase
      .from("balance_transaction")
      .select("id")
      .eq("user_id", user.id)
      .eq("currency", "stamps")
      .eq("reason", "daily_entry")
      .gt("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .limit(1)
      .maybeSingle();

    if (error) {
      message = "Error checking eligibility.";
    } else {
      eligible = !lastTransaction;
      message = eligible
        ? "✅ You can claim your daily +5 stamps"
        : "🕒 You've already claimed your reward today";
    }
  }

  // placeholder streak data
  const streakDays = 5;
  const streakPercent = Math.min((streakDays / 7) * 100, 100); // 7 days for full bar

  return (
    <Card>
      <CardHeader>
        <CardTitle>Journal</CardTitle>
        <CardDescription>Record your thoughts and experiences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full max-w-xs place-items-center gap-6">
          <Link href="/journals" className="w-full">
            <Button variant="outline" className="w-full">
              Create Entry
            </Button>
          </Link>
          <p className="text-center text-sm font-medium">{message}</p>
          <p className="text-muted-foreground text-center text-xs font-semibold">
            Current streak: {streakDays} day{streakDays > 1 ? "s" : ""} (placeholder)
          </p>
          <div className="bg-muted relative h-2 w-full overflow-hidden rounded-full">
            <div
              className="bg-primary absolute left-0 top-0 h-2 rounded-full transition-all duration-300"
              style={{ width: `${streakPercent}%` }}
              aria-label={`Streak progress: ${streakPercent}%`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
