import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import type { FC } from "react";

export const dynamic = "force-dynamic";

export const TasksCard: FC = async () => {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: tasks, error } = await supabase
    .from("task")
    .select("id, name, description, interval")
    .eq("user_id", user!.id);

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-lg font-semibold">Tasks</h3>
      <div className="grid gap-6">
        <Link href="/tasks">
          <Button variant="outline" className="w-full cursor-pointer">
            View All Tasks
          </Button>
        </Link>
        {error || !tasks || tasks.length === 0 ? (
          <p className="text-muted-foreground text-center text-sm">
            {error ? "Error fetching tasks." : "No tasks found."}
          </p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li key={task.id} className="rounded-md border p-3 shadow-sm">
                <div className="flex flex-col gap-1">
                  <span className="font-medium">{task.name}</span>
                  {task.description && (
                    <span className="text-muted-foreground text-sm">{task.description}</span>
                  )}
                  <span className="text-muted-foreground text-xs">Interval: {task.interval}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
};
