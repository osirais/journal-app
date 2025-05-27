"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createTask, deleteTask, getTasks } from "@/lib/actions/task-actions";
import { Edit, LoaderCircle, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

interface TaskType {
  id: string;
  name: string;
  description: string | null;
  interval: "daily" | "weekly" | "monthly";
  created_at: string;
  updated_at: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskInterval, setNewTaskInterval] = useState<TaskType["interval"]>("daily");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [isCreating, setIsCreating] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [taskToDelete, setTaskToDelete] = useState<TaskType | null>(null);

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

  function handleCreateTask(e: React.FormEvent) {
    e.preventDefault();
    if (!newTaskName.trim()) return;

    setIsCreating(true);
    startTransition(async () => {
      try {
        const created = await createTask(
          newTaskName.trim(),
          newTaskDescription.trim(),
          newTaskInterval
        );
        setTasks((t) => [created, ...t]);
        setNewTaskName("");
        setNewTaskDescription("");
        setNewTaskInterval("daily");
        setIsDialogOpen(false);
        toast.success("Task created successfully");
      } catch {
        toast.error("Failed to create task");
      } finally {
        setIsCreating(false);
      }
    });
  }

  function handleDeleteTask(id: string) {
    startTransition(async () => {
      try {
        await deleteTask(id);
        setTasks((t) => t.filter((x) => x.id !== id));
        toast.success("Task deleted successfully");
      } catch {
        toast.error("Failed to delete task");
      } finally {
        setTaskToDelete(null);
      }
    });
  }

  const filtered = tasks.filter((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()));

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center space-y-4 p-4">
        <LoaderCircle className="size-4 animate-spin" />
        <p className="text-muted-foreground">Loading tasks</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <Dialog
        open={!!taskToDelete}
        onOpenChange={(o) => {
          if (!o) setTaskToDelete(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{taskToDelete?.name}</span>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTaskToDelete(null)}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => taskToDelete && handleDeleteTask(taskToDelete.id)}
              disabled={isPending}
              className="cursor-pointer border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              {isPending && <LoaderCircle className="mr-2 size-4 animate-spin" />}
              Delete Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col space-y-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground">Manage your recurring tasks</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="cursor-pointer gap-2">
                <Plus className="size-4" />
                Create Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleCreateTask}>
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                  <DialogDescription>
                    Add a new recurring task. Task names must be unique
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="task-name">Task Name</Label>
                    <Input
                      id="task-name"
                      placeholder="Enter task name"
                      value={newTaskName}
                      onChange={(e) => setNewTaskName(e.target.value)}
                      maxLength={50}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="task-description">Description (optional)</Label>
                    <Input
                      id="task-description"
                      placeholder="Enter description"
                      value={newTaskDescription}
                      onChange={(e) => setNewTaskDescription(e.target.value)}
                      maxLength={200}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="task-interval">Interval</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          id="task-interval"
                          variant="outline"
                          role="combobox"
                          aria-expanded="false"
                          className="w-full cursor-pointer justify-between"
                        >
                          {newTaskInterval.charAt(0).toUpperCase() + newTaskInterval.slice(1)}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {["daily", "weekly", "monthly"].map((i) => (
                          <DropdownMenuItem
                            key={i}
                            onSelect={() => setNewTaskInterval(i as TaskType["interval"])}
                            className={`${
                              newTaskInterval === i ? "font-semibold" : ""
                            } cursor-pointer`}
                          >
                            {i.charAt(0).toUpperCase() + i.slice(1)}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isCreating || !newTaskName.trim()}
                    className="cursor-pointer"
                  >
                    {isCreating ? "Creating…" : "Create Task"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
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

        {filtered.length === 0 ? (
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
                <Button onClick={() => setIsDialogOpen(true)} className="mt-4 cursor-pointer gap-2">
                  <Plus className="size-4" />
                  Create Your First Task
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            <p className="text-muted-foreground text-sm">
              {filtered.length} task
              {filtered.length !== 1 ? "s" : ""} found
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((task) => (
                <Card key={task.id} className="group relative transition-shadow hover:shadow-md">
                  <CardHeader className="flex items-center justify-between pb-3">
                    <h2 className="cursor-default text-lg font-semibold">{task.name}</h2>
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
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="mr-2 size-4" />
                          Edit (WIP)
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
                  </CardHeader>
                  <CardContent className="pt-0">
                    {task.description && (
                      <p className="text-muted-foreground mb-1 text-sm">{task.description}</p>
                    )}
                    <p className="text-muted-foreground text-xs">
                      Interval: {task.interval.charAt(0).toUpperCase() + task.interval.slice(1)}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Created {new Date(task.created_at).toLocaleDateString()}
                    </p>
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
