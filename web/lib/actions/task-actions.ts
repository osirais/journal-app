"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export interface Task {
  id: string;
  name: string;
  description: string | null;
  interval: "daily" | "weekly" | "monthly";
  created_at: string;
  updated_at: string;
}

export async function getTasks(): Promise<Task[]> {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("task")
    .select("id, name, description, interval, created_at, updated_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch tasks: ${error.message}`);
  }

  return data || [];
}

export async function createTask(
  name: string,
  description: string | null,
  interval: "daily" | "weekly" | "monthly"
): Promise<Task> {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  if (!name.trim() || name.length > 100) {
    throw new Error("Task name must be between 1 and 100 characters");
  }

  if (!["daily", "weekly", "monthly"].includes(interval)) {
    throw new Error("Invalid task interval");
  }

  const { data, error } = await supabase
    .from("task")
    .insert({
      user_id: user.id,
      name: name.trim(),
      description,
      interval
    })
    .select("id, name, description, interval, created_at, updated_at")
    .single();

  if (error) {
    throw new Error(`Failed to create task: ${error.message}`);
  }

  revalidatePath("/tasks");
  return data;
}

export async function deleteTask(taskId: string): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase.from("task").delete().eq("id", taskId).eq("user_id", user.id);

  if (error) {
    throw new Error(`Failed to delete task: ${error.message}`);
  }

  revalidatePath("/tasks");
}

export async function updateTask(
  taskId: string,
  name: string,
  description: string | null,
  interval: "daily" | "weekly" | "monthly"
): Promise<Task> {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  if (!name.trim() || name.length > 100) {
    throw new Error("Task name must be between 1 and 100 characters");
  }

  if (!["daily", "weekly", "monthly"].includes(interval)) {
    throw new Error("Invalid task interval");
  }

  const { data, error } = await supabase
    .from("task")
    .update({
      name: name.trim(),
      description,
      interval,
      updated_at: new Date().toISOString()
    })
    .eq("id", taskId)
    .eq("user_id", user.id)
    .select("id, name, description, interval, created_at, updated_at")
    .single();

  if (error) {
    throw new Error(`Failed to update task: ${error.message}`);
  }

  revalidatePath("/tasks");
  return data;
}
