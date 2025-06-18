"use client";

import { CreateEntryDialog } from "@/components/dialogs/create-entry-dialog";
import { CreateJournalDialog } from "@/components/dialogs/create-journal-dialog";
import { CreateTaskDialog } from "@/components/dialogs/create-task-dialog";
import { DeleteJournalDialog } from "@/components/dialogs/delete-journal-dialog";
import { DeleteReasonDialog } from "@/components/dialogs/delete-reason-dialog";
import { DeleteTaskDialog } from "@/components/dialogs/delete-task-dialog";
import { EditJournalDialog } from "@/components/dialogs/edit-journal-dialog";
import { EditTaskDialog } from "@/components/dialogs/edit-task-dialog";
import { PickJournalDialog } from "@/components/dialogs/pick-journal-dialog";
import { SearchDialog } from "@/components/dialogs/search-dialog";
import { SignOutDialog } from "@/components/dialogs/sign-out-dialog";
import { TourDialog } from "@/components/dialogs/tour-dialog";
//
import { useDialogStore } from "@/hooks/use-dialog-store";
import { useEntryCallbackStore } from "@/hooks/use-entry-callback-store";
import { useJournalCallbackStore } from "@/hooks/use-journal-callback-store";
import { useReasonCallbackStore } from "@/hooks/use-reason-callback-store";
import { useTaskCallbackStore } from "@/hooks/use-task-callback-store";
//
import { JournalWithEntryCount, Reason, Task } from "@/types";
//
import { useEffect, useState } from "react";

export const DialogProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  const dialogStore = useDialogStore();

  const onEntryCreated = useEntryCallbackStore((s) => s.onEntryCreated);

  const onJournalCreated = useJournalCallbackStore((s) => s.onJournalCreated);
  const onJournalDeleted = useJournalCallbackStore((s) => s.onJournalDeleted);

  const onTaskCreated = useTaskCallbackStore((s) => s.onTaskCreated);
  const onTaskDeleted = useTaskCallbackStore((s) => s.onTaskDeleted);

  const onReasonDeleted = useReasonCallbackStore((s) => s.onReasonDeleted);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateEntryDialog
        journalId={dialogStore.data.createEntryData?.journalId ?? ""}
        onEntryCreated={onEntryCreated}
      />
      <CreateJournalDialog onJournalCreated={onJournalCreated} />
      <CreateTaskDialog onTaskCreated={onTaskCreated} />
      <DeleteJournalDialog
        journal={dialogStore.data.deleteJournalData?.journal as JournalWithEntryCount}
        onJournalDeleted={onJournalDeleted}
      />
      <DeleteReasonDialog
        reason={dialogStore.data.deleteReasonData?.reason as Reason}
        onReasonDeleted={onReasonDeleted}
      />
      <DeleteTaskDialog
        task={dialogStore.data.deleteTaskData?.task as Task}
        onTaskDeleted={onTaskDeleted}
      />
      {/* <EditJournalDialog /> */}
      {/* <EditTaskDialog /> */}
      <PickJournalDialog />
      <SearchDialog />
      <SignOutDialog />
      <TourDialog />
    </>
  );
};
