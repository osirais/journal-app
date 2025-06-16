"use client";

import { CreateJournalDialog } from "@/components/journals/create-journal-dialog";
import { SearchDialog } from "@/components/search/search-dialog";
import { useJournalCallbackStore } from "@/hooks/use-journal-callback-store";
import { useEffect, useState } from "react";

export const DialogProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  const onJournalCreated = useJournalCallbackStore((s) => s.onJournalCreated);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SearchDialog />
      <CreateJournalDialog onJournalCreated={onJournalCreated} />
    </>
  );
};
