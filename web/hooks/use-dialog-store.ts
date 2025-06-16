import { create } from "zustand";

export type DialogType = "search" | "create-journal" | "create-entry" | "pick-journal";

interface DialogData {
  createEntryData?: {
    journalId: string;
  };
}

interface DialogStore {
  type: DialogType | null;
  data: DialogData;
  isOpen: boolean;
  open: (type: DialogType, data?: DialogData) => void;
  close: () => void;
}

export const useDialogStore = create<DialogStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  open: (type, data = {}) => set({ isOpen: true, type, data }),
  close: () => set({ type: null, isOpen: false })
}));
