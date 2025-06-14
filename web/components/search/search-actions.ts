import { ClipboardList, LayoutDashboard, NotebookPen, Trophy, UserCog } from "lucide-react";
import { useRouter } from "next/navigation";

export function getSearchActions() {
  const router = useRouter();

  return [
    {
      name: "Dashboard",
      action: () => router.push("/dashboard"),
      icon: LayoutDashboard
    },
    {
      name: "Journals",
      action: () => router.push("/journals"),
      icon: NotebookPen
    },
    {
      name: "Tasks",
      action: () => router.push("/tasks"),
      icon: ClipboardList
    },
    {
      name: "Achievements",
      action: () => router.push("/achievements"),
      icon: Trophy
    },
    {
      name: "Manage Account",
      action: () => router.push("/manage-account"),
      icon: UserCog
    }
  ];
}
