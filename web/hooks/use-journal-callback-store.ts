import type { JournalWithEntryCount } from "@/types";
import { create } from "zustand";

type JournalCallbackStore = {
  onJournalCreated: (journal: JournalWithEntryCount) => void;
  setOnJournalCreated: (cb: (journal: JournalWithEntryCount) => void) => void;

  onJournalDeleted: (journalId: string) => void;
  setOnJournalDeleted: (cb: (journalId: string) => void) => void;

  onJournalEdited: (journal: JournalWithEntryCount) => void;
  setOnJournalEdited: (cb: (journal: JournalWithEntryCount) => void) => void;
};

export const useJournalCallbackStore = create<JournalCallbackStore>((set) => ({
  onJournalCreated: () => {},
  setOnJournalCreated: (cb) => set({ onJournalCreated: cb }),

  onJournalDeleted: () => {},
  setOnJournalDeleted: (cb) => set({ onJournalDeleted: cb }),

  onJournalEdited: () => {},
  setOnJournalEdited: (cb) => set({ onJournalEdited: cb })
}));
