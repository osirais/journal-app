import { useDialogStore } from "@/hooks/use-dialog-store";
import { ClipboardList, LayoutDashboard, NotebookPen, Trophy, UserCog } from "lucide-react";
import { useRouter } from "next/navigation";

export function useSearchActions() {
  const router = useRouter();

  const dialog = useDialogStore();

  return [
    {
      name: "Dashboard",
      action: () => {
        dialog.close();
        router.push("/dashboard");
      },
      icon: LayoutDashboard
    },
    {
      name: "Journals",
      action: () => {
        dialog.close();
        router.push("/journals");
      },
      icon: NotebookPen
    },
    {
      name: "Tasks",
      action: () => {
        dialog.close();
        router.push("/tasks");
      },
      icon: ClipboardList
    },
    {
      name: "Achievements",
      action: () => {
        dialog.close();
        router.push("/achievements");
      },
      icon: Trophy
    },
    {
      name: "Manage Account",
      action: () => {
        dialog.close();
        router.push("/manage-account");
      },
      icon: UserCog
    },
    {
      name: "Create New Entry",
      action: () =>
        dialog.open("create-entry", { ...dialog.data, createEntryData: { journalId: "" } }),
      icon: NotebookPen
    }
  ];
}
