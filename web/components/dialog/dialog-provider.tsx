"use client";

import { CreateEntryDialog } from "@/components/entries/create-entry-dialog";
import { CreateJournalDialog } from "@/components/journals/create-journal-dialog";
import { SearchDialog } from "@/components/search/search-dialog";
import { useDialogStore } from "@/hooks/use-dialog-store";
import { useEntryCallbackStore } from "@/hooks/use-entry-callback-store";
import { useJournalCallbackStore } from "@/hooks/use-journal-callback-store";
import { useEffect, useState } from "react";

export const DialogProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  const dialogStore = useDialogStore();

  const onJournalCreated = useJournalCallbackStore((s) => s.onJournalCreated);
  const onEntryCreated = useEntryCallbackStore((s) => s.onEntryCreated);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SearchDialog />
      <CreateJournalDialog onJournalCreated={onJournalCreated} />
      <CreateEntryDialog
        journalId={dialogStore.data.createEntryData?.journalId ?? ""}
        onEntryCreated={onEntryCreated}
      />
    </>
  );
};
