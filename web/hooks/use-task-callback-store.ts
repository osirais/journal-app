import type { Task } from "@/types";
import { create } from "zustand";

type TaskCallbackStore = {
  onTaskCreated: (task: Task) => void;
  setOnTaskCreated: (cb: (task: Task) => void) => void;

  onTaskDeleted: (taskId: string) => void;
  setOnTaskDeleted: (cb: (taskId: string) => void) => void;
};

export const useTaskCallbackStore = create<TaskCallbackStore>((set) => ({
  onTaskCreated: () => {},
  setOnTaskCreated: (cb) => set({ onTaskCreated: cb }),

  onTaskDeleted: () => {},
  setOnTaskDeleted: (cb) => set({ onTaskDeleted: cb })
}));
