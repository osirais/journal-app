import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useDialogStore } from "@/hooks/use-dialog-store";
import { updateTask } from "@/lib/actions/task-actions";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
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

interface EditTaskDialogProps {
  task: Task | null;
  onTaskEdited: (task: Task) => void;
}

export function EditTaskDialog({ task, onTaskEdited }: EditTaskDialogProps) {
  const dialog = useDialogStore();

  const isDialogOpen = dialog.isOpen && dialog.type === "edit-task";

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskInterval, setTaskInterval] = useState<Task["interval"]>("daily");
  const [taskActive, setTaskActive] = useState(true);
  const [isUpdating, startTransition] = useTransition();

  useEffect(() => {
    if (task) {
      setTaskName(task.name);
      setTaskDescription(task.description || "");
      setTaskInterval(task.interval);
      setTaskActive(task.active);
    }
  }, [task]);

  function handleUpdateTask(e: React.FormEvent) {
    e.preventDefault();
    if (!task || !taskName.trim()) return;

    startTransition(async () => {
      try {
        const updated = await updateTask(task.id, {
          name: taskName.trim(),
          description: taskDescription.trim() || null,
          interval: taskInterval,
          active: taskActive
        });
        onTaskEdited(updated);
        dialog.close();
        toast.success("Task updated successfully");
      } catch {
        toast.error("Failed to update task");
      }
    });
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={dialog.close}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleUpdateTask}>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>Make changes to your task</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-task-name">Task Name</Label>
              <Input
                id="edit-task-name"
                placeholder="Enter task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                maxLength={50}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-task-description">Description (optional)</Label>
              <Input
                id="edit-task-description"
                placeholder="Enter description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                maxLength={200}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-task-interval">Interval</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    id="edit-task-interval"
                    variant="outline"
                    role="combobox"
                    aria-expanded="false"
                    className="w-max cursor-pointer justify-between"
                  >
                    {taskInterval.charAt(0).toUpperCase() + taskInterval.slice(1)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {["daily", "weekly", "monthly"].map((i) => (
                    <DropdownMenuItem
                      key={i}
                      onSelect={() => setTaskInterval(i as Task["interval"])}
                      className={`${taskInterval === i ? "font-semibold" : ""} cursor-pointer`}
                    >
                      {i.charAt(0).toUpperCase() + i.slice(1)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="edit-task-active" className="cursor-pointer">
                Active
              </Label>
              <Switch
                id="edit-task-active"
                checked={taskActive}
                onCheckedChange={setTaskActive}
                className="cursor-pointer"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => dialog.close()}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUpdating || !taskName.trim()}
              className="cursor-pointer"
            >
              {isUpdating ? (
                <>
                  <LoaderCircle className="mr-2 size-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
