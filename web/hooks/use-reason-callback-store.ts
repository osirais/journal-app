import { create } from "zustand";

type ReasonCallbackStore = {
  onReasonDeleted: (reasonId: string) => void;
  setOnReasonDeleted: (cb: (reasonId: string) => void) => void;
};

export const useReasonCallbackStore = create<ReasonCallbackStore>((set) => ({
  onReasonDeleted: () => {}, // default no-op
  setOnReasonDeleted: (cb) => set({ onReasonDeleted: cb })
}));
