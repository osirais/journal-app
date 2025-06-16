import { create } from "zustand";

export type DialogType = "search" | "create-journal";

interface DialogData {}

interface DialogStore {
  type: DialogType | null;
  data: DialogData;
  isOpen: boolean;
  onOpen: (type: DialogType, data?: DialogData) => void;
  onClose: () => void;
}

export const useDialog = create<DialogStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false })
}));
