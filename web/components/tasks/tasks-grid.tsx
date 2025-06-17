"use client";

import { CreateTaskDialog } from "@/components/dialogs/create-task-dialog";
import { DeleteTaskDialog } from "@/components/dialogs/delete-task-dialog";
import { EditTaskDialog } from "@/components/dialogs/edit-task-dialog";
import { TaskSkeleton } from "@/components/tasks/task-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useDialogStore } from "@/hooks/use-dialog-store";
import { getTasks, toggleTaskActive } from "@/lib/actions/task-actions";
import { cn } from "@/lib/utils";
import { Task } from "@/types";
import { Edit, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export function TasksGrid() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const fetched = await getTasks();
      setTasks(fetched);
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setIsLoading(false);
    }
  }

  function handleTaskCreated(task: Task) {
    setTasks((prev) => [task, ...prev]);
  }

  function handleTaskDeleted(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function handleTaskUpdated(updatedTask: Task) {
    setTasks((prev) => prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  }

  // function handleToggleActive(taskId: string) {
  //   startTransition(async () => {
  //     try {
  //       const updatedTask = await toggleTaskActive(taskId);
  //       setTasks((prev) => prev.map((task) => (task.id === taskId ? updatedTask : task)));
  //     } catch {
  //       toast.error("Failed to update task status");
  //     }
  //   });
  // }

  const filtered = tasks.filter((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const dialog = useDialogStore();

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <EditTaskDialog
        task={taskToEdit}
        open={!!taskToEdit}
        onOpenChange={(open) => {
          if (!open) setTaskToEdit(null);
        }}
        onTaskUpdated={handleTaskUpdated}
      />
      <DeleteTaskDialog
        task={taskToDelete}
        open={!!taskToDelete}
        onOpenChange={(open) => {
          if (!open) setTaskToDelete(null);
        }}
        onTaskDeleted={handleTaskDeleted}
      />
      <div className="flex flex-col space-y-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground">Manage your recurring tasks</p>
          </div>
          <Button onClick={() => dialog.open("create-task")} className="cursor-pointer gap-2">
            <Plus className="size-4" />
            Create Task
          </Button>
        </header>
        <div className="relative">
          <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2 transform" />
          <Input
            placeholder="Search tasks"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        {isLoading ? (
          <div className="grid gap-4">
            <div className="bg-muted h-4 w-24 animate-pulse rounded" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <TaskSkeleton key={i} />
              ))}
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <CardTitle className="mb-2 text-xl">
                {searchQuery ? "No tasks found" : "No tasks yet"}
              </CardTitle>
              <CardDescription className="max-w-sm text-center">
                {searchQuery
                  ? "Try adjusting your search terms"
                  : "Create your first task to start managing your work"}
              </CardDescription>
              {!searchQuery && (
                <CreateTaskDialog
                  onTaskCreated={handleTaskCreated}
                  triggerButton={
                    <Button className="mt-4 cursor-pointer gap-2">
                      <Plus className="size-4" />
                      Create Your First Task
                    </Button>
                  }
                />
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            <p className="text-muted-foreground text-sm">
              {filtered.length} task{filtered.length !== 1 ? "s" : ""} found
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((task) => (
                <Card
                  key={task.id}
                  className={cn(
                    "group relative transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5",
                    !task.active && "opacity-75"
                  )}
                >
                  <CardHeader className="flex items-center justify-between pb-3">
                    <div className="flex w-full items-start justify-between gap-2">
                      <h2
                        className={cn(
                          "cursor-default text-lg font-semibold transition-colors",
                          !task.active && "text-muted-foreground"
                        )}
                      >
                        {task.name}
                      </h2>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="size-8 cursor-pointer p-0"
                            aria-label="Task options"
                          >
                            <MoreHorizontal className="size-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32">
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onSelect={() => setTaskToEdit(task)}
                          >
                            <Edit className="mr-2 size-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="cursor-pointer text-red-500"
                            onSelect={() => setTaskToDelete(task)}
                          >
                            <Trash2 className="mr-2 size-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {task.description && (
                      <p
                        className={cn(
                          "mb-3 text-sm",
                          task.active ? "text-muted-foreground" : "text-muted-foreground/70"
                        )}
                      >
                        {task.description}
                      </p>
                    )}
                    <div className="flex flex-col space-y-2">
                      <p className="text-muted-foreground text-xs">
                        Interval: {task.interval.charAt(0).toUpperCase() + task.interval.slice(1)}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Created {new Date(task.created_at).toLocaleDateString()}
                      </p>
                      <div className="mt-2 flex items-center justify-between border-t pt-2">
                        <span
                          className={cn(
                            "text-xs font-medium",
                            task.active ? "text-green-500" : "text-muted-foreground"
                          )}
                        >
                          {task.active ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
