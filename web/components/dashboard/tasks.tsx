import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
    <Card className="w-full p-6">
      <div className="grid grid-cols-2">
        <div className="w-full sm:w-auto">
          <h3 className="mb-4 text-lg font-semibold">Tasks</h3>
          <div className="w-full space-y-4">
            {error || !tasks || tasks.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                {error ? "Error fetching tasks." : "No tasks found."}
              </p>
            ) : (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-start space-x-3">
                    <Checkbox id={`task-${task.id}`} />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor={`task-${task.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {task.name}
                      </label>
                      {task.description && (
                        <p className="text-muted-foreground text-sm">{task.description}</p>
                      )}
                      <p className="text-muted-foreground text-xs">Interval: {task.interval}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="grid h-full place-items-center">
          <Link href="/tasks">
            <Button variant="outline" className="mt-auto cursor-pointer">
              Manage Tasks
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};
