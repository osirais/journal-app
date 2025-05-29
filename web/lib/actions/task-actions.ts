"use server";

import { DAILY_TASKS_COMPLETION_REWARD } from "@/constants/rewards";
import { Task } from "@/types";
import { getUserOrThrow } from "@/utils/get-user";
import { createClient } from "@/utils/supabase/server";

export async function getTasks(): Promise<Task[]> {
  const supabase = await createClient();
  const user = await getUserOrThrow(supabase);

  const { data, error } = await supabase
    .from("task")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch tasks: ${error.message}`);
  }

  return data;
}

export async function createTask(
  name: string,
  description: string,
  interval: Task["interval"],
  active: boolean = true
): Promise<Task> {
  if (!name.trim() || name.length > 100) {
    throw new Error("Task name must be between 1 and 100 characters");
  }

  const supabase = await createClient();
  const user = await getUserOrThrow(supabase);

  const { data, error } = await supabase
    .from("task")
    .insert({
      name: name.trim(),
      description: description || null,
      interval,
      active,
      user_id: user.id
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create task: ${error.message}`);
  }

  return data;
}

export async function updateTask(
  id: string,
  updates: {
    name: string;
    description: string | null;
    interval: Task["interval"];
    active: boolean;
  }
): Promise<Task> {
  if (!updates.name.trim() || updates.name.length > 100) {
    throw new Error("Task name must be between 1 and 100 characters");
  }

  const supabase = await createClient();
  const user = await getUserOrThrow(supabase);

  const { data, error } = await supabase
    .from("task")
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update task: ${error.message}`);
  }

  return data;
}

export async function toggleTaskActive(id: string): Promise<Task> {
  const supabase = await createClient();
  const user = await getUserOrThrow(supabase);

  const { data: currentTask, error: fetchError } = await supabase
    .from("task")
    .select("active")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (fetchError) {
    throw new Error(`Failed to fetch task: ${fetchError.message}`);
  }

  const { data, error } = await supabase
    .from("task")
    .update({
      active: !currentTask.active,
      updated_at: new Date().toISOString()
    })
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to toggle task status: ${error.message}`);
  }

  return data;
}

export async function deleteTask(id: string): Promise<void> {
  const supabase = await createClient();
  const user = await getUserOrThrow(supabase);

  const { error } = await supabase.from("task").delete().eq("id", id).eq("user_id", user.id);

  if (error) {
    throw new Error(`Failed to delete task: ${error.message}`);
  }
}

export async function completeTask(taskId: string) {
  const supabase = await createClient();
  const user = await getUserOrThrow(supabase);

  const today = new Date().toISOString().split("T")[0];
  const startOfDay = `${today}T00:00:00.000Z`;
  const endOfDay = `${today}T23:59:59.999Z`;

  const { data: existingCompletion, error: completionError } = await supabase
    .from("task_completion")
    .select("id")
    .eq("user_id", user.id)
    .eq("task_id", taskId)
    .gte("completed_at", startOfDay)
    .lt("completed_at", endOfDay)
    .is("deleted_at", null)
    .maybeSingle();

  if (completionError) {
    return { success: false, error: completionError.message };
  }

  if (!existingCompletion) {
    const { error: insertError } = await supabase.from("task_completion").insert({
      user_id: user.id,
      task_id: taskId
    });

    if (insertError) {
      return { success: false, error: insertError.message };
    }
  }

  const { data: activeTasks, error: activeTasksError } = await supabase
    .from("task")
    .select("id")
    .eq("user_id", user.id)
    .eq("active", true);

  if (activeTasksError) {
    return { success: false, error: activeTasksError.message };
  }

  const { data: completedTasks, error: completedTasksError } = await supabase
    .from("task_completion")
    .select("task_id")
    .eq("user_id", user.id)
    .gte("completed_at", startOfDay)
    .lt("completed_at", endOfDay)
    .is("deleted_at", null);

  if (completedTasksError) {
    return { success: false, error: completedTasksError.message };
  }

  const activeTaskIds = activeTasks.map((task) => task.id);
  const completedTaskIds = completedTasks.map((c) => c.task_id);
  const allCompleted = activeTaskIds.every((id) => completedTaskIds.includes(id));

  let reward = 0;
  let streak = 0;

  if (allCompleted) {
    ({ reward, streak } = await handleDailyTaskCompletionReward(supabase, user.id));
  }

  return { success: true, reward, streak, error: null };
}

async function handleDailyTaskCompletionReward(
  supabase: any,
  userId: string
): Promise<{ reward: number; streak: number }> {
  const today = new Date().toISOString().slice(0, 10);

  const { data: lastTransaction, error: transactionError } = await supabase
    .from("balance_transaction")
    .select("id")
    .eq("user_id", userId)
    .eq("currency", "stamps")
    .eq("reason", "daily_task_completion")
    .gte("created_at", `${today}T00:00:00.000Z`)
    .lt("created_at", `${today}T23:59:59.999Z`)
    .limit(1)
    .maybeSingle();

  if (transactionError) {
    throw new Error("Failed to fetch transactions");
  }

  if (lastTransaction) {
    const { data: streak } = await supabase
      .from("streak")
      .select("current_streak")
      .eq("user_id", userId)
      .eq("category", "task_completions")
      .maybeSingle();

    return { reward: 0, streak: streak?.current_streak || 0 };
  }

  const { data: userBalance } = await supabase
    .from("user_balance")
    .select("balance")
    .eq("user_id", userId)
    .eq("currency", "stamps")
    .single();

  if (!userBalance) throw new Error("User balance not found");

  await supabase.from("balance_transaction").insert([
    {
      user_id: userId,
      currency: "stamps",
      amount: DAILY_TASKS_COMPLETION_REWARD,
      reason: "daily_task_completion"
    }
  ]);

  await supabase
    .from("user_balance")
    .update({ balance: userBalance.balance + DAILY_TASKS_COMPLETION_REWARD })
    .eq("user_id", userId)
    .eq("currency", "stamps");

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  const { data: streak, error: streakError } = await supabase
    .from("streak")
    .select("id, current_streak, longest_streak, last_completed_date")
    .eq("user_id", userId)
    .eq("category", "task_completions")
    .maybeSingle();

  let currentStreak = 1;

  if (!streak || streakError) {
    const { error: insertError } = await supabase.from("streak").insert([
      {
        user_id: userId,
        category: "task_completions",
        current_streak: 1,
        longest_streak: 1,
        last_completed_date: today
      }
    ]);

    if (insertError) {
      console.error("Failed to insert streak:", insertError);
      throw insertError;
    }
  } else {
    const lastDateStr = streak.last_completed_date
      ? new Date(streak.last_completed_date).toISOString().slice(0, 10)
      : null;

    if (lastDateStr === today) {
      currentStreak = streak.current_streak;
    } else if (lastDateStr === yesterday) {
      currentStreak = streak.current_streak + 1;
    } else {
      currentStreak = 1;
    }

    const longest = Math.max(currentStreak, streak.longest_streak);

    await supabase
      .from("streak")
      .update({
        current_streak: currentStreak,
        longest_streak: longest,
        last_completed_date: today
      })
      .eq("user_id", userId)
      .eq("category", "task_completions");
  }

  return { reward: DAILY_TASKS_COMPLETION_REWARD, streak: currentStreak };
}
