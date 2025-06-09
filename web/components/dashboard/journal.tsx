import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DAILY_ENTRY_REWARD } from "@/constants/rewards";
import { createClient } from "@/utils/supabase/server";
import { FlameIcon as FireIcon } from "lucide-react";
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
  let streakDays = 0;

  if (!user || userError) {
    message = "You must be signed in to claim daily reward";
  } else {
    const userId = user.id;

    const { data: lastTransaction, error: txError } = await supabase
      .from("balance_transaction")
      .select("id")
      .eq("user_id", userId)
      .eq("currency", "stamps")
      .eq("reason", "daily_entry")
      .gt("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .limit(1)
      .maybeSingle();

    if (txError) {
      message = "Error checking eligibility";
    } else {
      eligible = !lastTransaction;
      message = eligible
        ? `✅ You can claim your daily +${DAILY_ENTRY_REWARD} droplets`
        : "🕒 You have already claimed your reward today";
    }

    const { data: streakData, error: streakError } = await supabase
      .from("streak")
      .select("current_streak")
      .eq("user_id", userId)
      .eq("category", "journal_entries")
      .maybeSingle();

    if (!streakError && streakData) {
      streakDays = streakData.current_streak ?? 0;
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle id="tour-journal">Journal</CardTitle>
          <CardDescription>Record your thoughts and experiences</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid w-full max-w-xs place-items-center gap-6">
          <div className="mr-auto w-max">
            {streakDays > 0 && (
              <div className="flex items-center gap-1 rounded-md bg-amber-100 px-2 py-1 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400">
                <FireIcon className="h-4 w-4" />
                <span className="text-sm font-medium">{streakDays} day streak</span>
              </div>
            )}
          </div>
          <Link href="/journals" className="w-full">
            <Button
              variant="outline"
              className="w-full cursor-pointer"
              id="tour-journal-entry-button"
            >
              Create Entry
            </Button>
          </Link>
          <p className="text-center text-sm font-medium">{message}</p>
        </div>
      </CardContent>
    </Card>
  );
};
