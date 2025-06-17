import type { Task } from "@/types";
import { create } from "zustand";

type TaskCallbackStore = {
  onTaskCreated: (task: Task) => void;
  setOnTaskCreated: (cb: (task: Task) => void) => void;
};

export const useTaskCallbackStore = create<TaskCallbackStore>((set) => ({
  onTaskCreated: () => {},
  setOnTaskCreated: (cb) => set({ onTaskCreated: cb })
}));
