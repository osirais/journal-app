"use client";

import { CreateEntryDialog } from "@/components/dialogs/create-entry-dialog";
import { CreateJournalDialog } from "@/components/dialogs/create-journal-dialog";
import { PickJournalDialog } from "@/components/dialogs/pick-journal-dialog";
import { SearchDialog } from "@/components/dialogs/search-dialog";
import { SignOutDialog } from "@/components/dialogs/sign-out-dialog";
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
      <SignOutDialog />
      <SearchDialog />
      <CreateJournalDialog onJournalCreated={onJournalCreated} />
      <PickJournalDialog />
      <CreateEntryDialog
        journalId={dialogStore.data.createEntryData?.journalId ?? ""}
        onEntryCreated={onEntryCreated}
      />
    </>
  );
};
