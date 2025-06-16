import { create } from "zustand";

type EntryCallbackStore = {
  onEntryCreated: (entry: any) => void;
  setOnEntryCreated: (cb: (entry: any) => void) => void;
};

export const useEntryCallbackStore = create<EntryCallbackStore>((set) => ({
  onEntryCreated: () => {}, // default no-op
  setOnEntryCreated: (cb) => set({ onEntryCreated: cb })
}));
