"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { completeTask } from "@/lib/actions/task-actions";
import type { Task } from "@/types";
import { receiveReward } from "@/utils/receive-reward";
import { FlameIcon as FireIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface TasksCardCSRProps {
  tasks: Task[];
  error: string | null;
  streak: number;
  completedTaskIds: string[];
}

export function TasksCardCSR({ tasks, error, streak, completedTaskIds }: TasksCardCSRProps) {
  const [localCompletedTaskIds, setLocalCompletedTaskIds] = useState<Set<string>>(
    new Set(completedTaskIds)
  );
  const [isSubmitting, setIsSubmitting] = useState<Record<string, boolean>>({});
  const [currentStreak, setCurrentStreak] = useState<number>(streak);

  const handleTaskCompletion = async (taskId: string) => {
    if (isSubmitting[taskId]) return;

    setIsSubmitting((prev) => ({ ...prev, [taskId]: true }));

    try {
      const result = await completeTask(taskId);

      if (result.success) {
        setLocalCompletedTaskIds((prev) => {
          const newSet = new Set(prev);
          newSet.add(taskId);
          return newSet;
        });

        if (typeof result.streak === "number") {
          setCurrentStreak(result.streak);
        }

        if (typeof result.reward === "number" && result.reward > 0) {
          receiveReward(
            `Daily task completions reward: +${result.reward} droplets!`,
            result.streak
          );
        }
      } else {
        toast.error("Error", { description: result.error || "Failed to complete task" });
      }
    } catch (e) {
      toast.error("Error", {
        description: e instanceof Error ? e.message : "Failed to complete task"
      });
    } finally {
      setIsSubmitting((prev) => ({ ...prev, [taskId]: false }));
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle id="tour-tasks">Tasks</CardTitle>
          <CardDescription>Your recurring or to-do tasks</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="mr-auto w-max">
          {currentStreak > 0 && (
            <div className="flex items-center gap-1 rounded-md bg-amber-100 px-2 py-1 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400">
              <FireIcon className="h-4 w-4" />
              <span className="text-sm font-medium">{streak} day streak</span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            {error || !tasks || tasks.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                {error ? `Error: ${error}` : "No tasks found."}
              </p>
            ) : (
              <div className="space-y-3">
                {tasks.map((task) => {
                  const isCompleted = localCompletedTaskIds.has(task.id);
                  const isLoading = isSubmitting[task.id] || false;

                  return (
                    <div key={task.id} className="flex items-start space-x-3">
                      <Checkbox
                        id={`task-${task.id}`}
                        checked={isCompleted}
                        disabled={isCompleted || isLoading}
                        onCheckedChange={() => handleTaskCompletion(task.id)}
                        className={`${isLoading ? "opacity-50" : ""} ${isCompleted ? "data-[state=checked]:bg-primary data-[state=checked]:border-primary" : ""}`}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor={`task-${task.id}`}
                          className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                            isCompleted ? "text-muted-foreground line-through" : ""
                          }`}
                        >
                          {task.name}
                        </label>
                        {task.description && (
                          <p
                            className={`text-muted-foreground text-sm ${isCompleted ? "line-through" : ""}`}
                          >
                            {task.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="grid place-items-center">
            <Link href="/tasks">
              <Button
                variant="outline"
                className="mt-auto cursor-pointer"
                id="tour-tasks-manage-button"
              >
                Manage Tasks
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
