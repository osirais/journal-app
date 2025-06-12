import { TasksCardCSR } from "@/components/dashboard/tasks-csr";
import { getTasks } from "@/lib/actions/task-actions";
import type { Task } from "@/types";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export async function TasksCardSSR() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return null;

  let tasks: Task[] = [];
  let error = null;

  try {
    tasks = await getTasks();
    tasks = tasks.filter((task) => task.active);
  } catch (e) {
    error = e instanceof Error ? e.message : "Error fetching tasks";
  }

  const { data: streakData } = await supabase
    .from("streak")
    .select("current_streak")
    .eq("user_id", user.id)
    .eq("category", "task_completions")
    .maybeSingle();

  const today = new Date().toISOString().split("T")[0];
  const startOfDay = `${today}T00:00:00.000Z`;
  const endOfDay = `${today}T23:59:59.999Z`;

  const { data: completedTasks } = await supabase
    .from("task_completion")
    .select("task_id")
    .eq("user_id", user.id)
    .gte("completed_at", startOfDay)
    .lt("completed_at", endOfDay);

  const completedTaskIds = completedTasks?.map((completion) => completion.task_id) || [];

  return (
    <TasksCardCSR
      tasks={tasks}
      error={error ? String(error) : null}
      streak={streakData?.current_streak}
      completedTaskIds={completedTaskIds}
    />
  );
}
