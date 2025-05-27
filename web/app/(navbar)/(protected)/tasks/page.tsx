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
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskName.trim()) return;

    setIsCreating(true);
    try {
      const newTask = await createTask(
        newTaskName.trim(),
        newTaskDescription.trim(),
        newTaskInterval
      );
      setTasks((prev) => [newTask, ...prev]);
      setNewTaskName("");
      setNewTaskDescription("");
      setNewTaskInterval("daily");
      setIsDialogOpen(false);
      toast.success("Task created successfully");
    } catch {
      toast.error("Failed to create task.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      toast.success("Task deleted successfully");
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center space-y-4 p-4">
        <LoaderCircle className="h-4 w-4 animate-spin" />
        <p className="text-muted-foreground">Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground">Manage your recurring tasks</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="cursor-pointer gap-2">
                <Plus className="h-4 w-4" />
                Create Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleCreateTask}>
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                  <DialogDescription>
                    Add a new recurring task. Task names must be unique.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="task-name">Task Name</Label>
                    <Input
                      id="task-name"
                      placeholder="Enter task name..."
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
                      placeholder="Enter description..."
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
                        {["daily", "weekly", "monthly"].map((interval) => (
                          <DropdownMenuItem
                            key={interval}
                            onSelect={() => setNewTaskInterval(interval as TaskType["interval"])}
                            className={newTaskInterval === interval ? "font-semibold" : ""}
                          >
                            {interval.charAt(0).toUpperCase() + interval.slice(1)}
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
                    {isCreating ? "Creating..." : "Create Task"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="relative">
          <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        {filteredTasks.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <CardTitle className="mb-2 text-xl">
                {searchQuery ? "No tasks found" : "No tasks yet"}
              </CardTitle>
              <CardDescription className="max-w-sm text-center">
                {searchQuery
                  ? "Try adjusting your search terms"
                  : "Create your first task to start managing your recurring work"}
              </CardDescription>
              {!searchQuery && (
                <Button onClick={() => setIsDialogOpen(true)} className="mt-4 cursor-pointer gap-2">
                  <Plus className="h-4 w-4" />
                  Create Your First Task
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm">
                {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""} found
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTasks.map((task) => (
                <Card key={task.id} className="group relative transition-shadow hover:shadow-md">
                  <CardHeader className="flex items-center justify-between pb-3">
                    <h2 className="cursor-default text-lg font-semibold">{task.name}</h2>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 cursor-pointer p-0"
                          aria-label="Task options"
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit (WIP)
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="cursor-pointer text-red-500"
                          onSelect={() => handleDeleteTask(task.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
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
