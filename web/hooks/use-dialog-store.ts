import { JournalWithEntryCount } from "@/types";
import { create } from "zustand";

export type DialogType =
  | "create-entry"
  | "create-journal"
  | "create-task"
  | "delete-journal"
  | "delete-reason"
  | "delete-task"
  | "edit-journal"
  | "edit-task"
  | "pick-journal"
  | "search"
  | "sign-out"
  | "tour";

interface DialogData {
  createEntryData?: {
    journalId: string;
  };
  deleteJournalData?: {
    journal: JournalWithEntryCount;
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
  open: (type, newData = {}) =>
    set((state) => ({
      isOpen: true,
      type,
      data: { ...state.data, ...newData }
    })),
  close: () => set({ type: null, isOpen: false })
}));
