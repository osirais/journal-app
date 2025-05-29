import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { deleteTask } from "@/lib/actions/task-actions";
import { LoaderCircle } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

interface Task {
  id: string;
  name: string;
  description: string | null;
  interval: "daily" | "weekly" | "monthly";
  active: boolean;
  created_at: string;
  updated_at: string;
}

interface DeleteTaskDialogProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTaskDeleted: (id: string) => void;
}

export function DeleteTaskDialog({
  task,
  open,
  onOpenChange,
  onTaskDeleted
}: DeleteTaskDialogProps) {
  const [isPending, startTransition] = useTransition();

  function handleDeleteTask() {
    if (!task) return;

    startTransition(async () => {
      try {
        await deleteTask(task.id);
        onTaskDeleted(task.id);
        toast.success("Task deleted successfully");
      } catch {
        toast.error("Failed to delete task");
      } finally {
        onOpenChange(false);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <span className="font-semibold">{task?.name}</span>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleDeleteTask}
            disabled={isPending}
            className="cursor-pointer border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            {isPending ? (
              <>
                <LoaderCircle className="mr-2 size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Task"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
