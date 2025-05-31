import { DAILY_ENTRY_REWARD } from "@/constants/rewards";
import { TagType } from "@/types";
import { getUserOrThrow } from "@/utils/get-user-throw";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const supabase = await createClient();

  const searchParams = new URL(req.url).searchParams;
  const tagId = searchParams.get("tag");
  const journalId = searchParams.get("journalId");

  const user = await getUserOrThrow(supabase);

  if (!journalId) {
    return NextResponse.json({ error: "journalId query parameter required" }, { status: 400 });
  }

  const { data: journal, error: journalError } = await supabase
    .from("journal")
    .select("id")
    .eq("id", journalId)
    .eq("author_id", user.id)
    .single();

  if (journalError || !journal) {
    return NextResponse.json({ error: "Journal not found or access denied" }, { status: 404 });
  }

  const { data: entries, error } = await supabase
    .from("entry")
    .select(
      `
      *,
      entry_tag (
        tag:tag_id (id, name)
      )
    `
    )
    .eq("journal_id", journalId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const transformedEntries = entries.map((entry) => ({
    ...entry,
    tags: entry.entry_tag?.map((et: any) => et.tag).filter(Boolean) || []
  }));

  const filteredEntries = tagId
    ? transformedEntries.filter((entry) => entry.tags.some((tag: TagType) => tag.id === tagId))
    : transformedEntries;

  return NextResponse.json({ entries: filteredEntries });
}

export async function POST(req: Request) {
  const supabase = await createClient();

  const user = await getUserOrThrow(supabase);

  const body = await req.json();
  const { journalId, title, content, tags } = body;

  if (!journalId || typeof journalId !== "string") {
    return NextResponse.json({ error: "journalId is required" }, { status: 400 });
  }

  if (!content || typeof content !== "string") {
    return NextResponse.json(
      { error: "content is required and must be a string" },
      { status: 400 }
    );
  }

  if (tags && !Array.isArray(tags)) {
    return NextResponse.json({ error: "tags must be an array of strings" }, { status: 400 });
  }

  const { data: journal, error: journalError } = await supabase
    .from("journal")
    .select("id")
    .eq("id", journalId)
    .eq("author_id", user.id)
    .single();

  if (journalError || !journal) {
    return NextResponse.json({ error: "Journal not found or access denied" }, { status: 404 });
  }

  const { data: entry, error } = await supabase
    .from("entry")
    .insert([
      {
        journal_id: journalId,
        title: title ?? null,
        content
      }
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (tags && tags.length > 0) {
    const normalizedTags = Array.from(
      new Set(tags.map((tag: string) => tag.toLowerCase().trim()))
    ).filter(Boolean);

    const { data: existingTags, error: fetchTagsError } = await supabase
      .from("tag")
      .select("id, name")
      .eq("user_id", user.id)
      .in("name", normalizedTags);

    if (fetchTagsError) {
      return NextResponse.json({ error: fetchTagsError.message }, { status: 500 });
    }

    const existingTagNames = existingTags?.map((t) => t.name.toLowerCase()) ?? [];
    const newTagNames = normalizedTags.filter((tag) => !existingTagNames.includes(tag));

    let newTags = [];
    if (newTagNames.length > 0) {
      const { data: insertedTags, error: insertTagsError } = await supabase
        .from("tag")
        .insert(newTagNames.map((name) => ({ name, user_id: user.id })))
        .select();

      if (insertTagsError) {
        return NextResponse.json({ error: insertTagsError.message }, { status: 500 });
      }

      newTags = insertedTags ?? [];
    }

    const allTags = [...(existingTags ?? []), ...newTags];

    const entryTagRelations = allTags.map((tag) => ({
      entry_id: entry.id,
      tag_id: tag.id
    }));

    const { error: entryTagError } = await supabase.from("entry_tag").insert(entryTagRelations);

    if (entryTagError) {
      return NextResponse.json({ error: entryTagError.message }, { status: 500 });
    }
  }

  const { reward, streak } = await handleDailyEntryReward(supabase, user.id);

  return NextResponse.json({ entry, reward, streak }, { status: 201 });
}

async function handleDailyEntryReward(
  supabase: any,
  userId: string
): Promise<{ reward: number; streak: number }> {
  const { data: lastTransaction, error: transactionError } = await supabase
    .from("balance_transaction")
    .select("id")
    .eq("user_id", userId)
    .eq("currency", "droplets")
    .eq("reason", "daily_entry")
    .gt("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
    .limit(1)
    .maybeSingle();

  let reward = 0;
  if (!lastTransaction && !transactionError) {
    const { data: userBalance } = await supabase
      .from("user_balance")
      .select("balance")
      .eq("user_id", userId)
      .eq("currency", "droplets")
      .single();

    if (userBalance) {
      await supabase
        .from("balance_transaction")
        .insert([
          {
            user_id: userId,
            currency: "droplets",
            amount: DAILY_ENTRY_REWARD,
            reason: "daily_entry"
          }
        ]);

      await supabase
        .from("user_balance")
        .update({ balance: userBalance.balance + DAILY_ENTRY_REWARD })
        .eq("user_id", userId)
        .eq("currency", "droplets");

      reward = DAILY_ENTRY_REWARD;
    }
  }

  const { data: streakData } = await supabase
    .from("streak")
    .select("id, current_streak, longest_streak, last_completed_date")
    .eq("user_id", userId)
    .eq("category", "journal_entries")
    .maybeSingle();

  const today = new Date().toISOString().slice(0, 10);
  let currentStreak = 1;

  if (!streakData) {
    await supabase.from("streak").insert([
      {
        user_id: userId,
        category: "journal_entries",
        current_streak: 1,
        longest_streak: 1,
        last_completed_date: today
      }
    ]);
  } else {
    const lastDateStr = streakData.last_completed_date
      ? new Date(streakData.last_completed_date).toISOString().slice(0, 10)
      : null;
    const yesterdayStr = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

    if (lastDateStr === today) {
      currentStreak = streakData.current_streak;
    } else if (lastDateStr === yesterdayStr) {
      currentStreak = streakData.current_streak + 1;
    } else {
      currentStreak = 1;
    }

    const longest = Math.max(currentStreak, streakData.longest_streak);

    await supabase
      .from("streak")
      .update({
        current_streak: currentStreak,
        longest_streak: longest,
        last_completed_date: today
      })
      .eq("user_id", userId)
      .eq("category", "journal_entries");
  }

  return { reward, streak: currentStreak };
}
