"use server";

import { Task } from "@/types";
import { createClient } from "@/utils/supabase/server";

async function getUserOrThrow(supabase: any) {
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Unauthorized");
  }

  return user;
}

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
