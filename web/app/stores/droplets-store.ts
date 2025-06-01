import { create } from "zustand";

interface DropletStore {
  droplets: number | null;
  setDroplets: (count: number | null) => void;
}

export const useDropletStore = create<DropletStore>((set) => ({
  droplets: null,
  setDroplets: (count) => set({ droplets: count })
}));
