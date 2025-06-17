import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
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
import { createTask } from "@/lib/actions/task-actions";
import { LoaderCircle, Plus } from "lucide-react";
import { useState, useTransition } from "react";
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

interface CreateTaskDialogProps {
  onTaskCreated: (task: Task) => void;
  triggerButton?: React.ReactNode;
}

export function CreateTaskDialog({ onTaskCreated, triggerButton }: CreateTaskDialogProps) {
  const dialog = useDialogStore();

  const isDialogOpen = dialog.isOpen && dialog.type === "create-task";

  const [isOpen, setIsOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskInterval, setTaskInterval] = useState<Task["interval"]>("daily");
  const [taskActive, setTaskActive] = useState(true);
  const [isCreating, startTransition] = useTransition();

  function resetForm() {
    setTaskName("");
    setTaskDescription("");
    setTaskInterval("daily");
    setTaskActive(true);
  }

  function handleCreateTask(e: React.FormEvent) {
    e.preventDefault();
    if (!taskName.trim()) return;

    startTransition(async () => {
      try {
        const created = await createTask(
          taskName.trim(),
          taskDescription.trim(),
          taskInterval,
          taskActive
        );
        onTaskCreated(created);
        resetForm();
        setIsOpen(false);
        toast.success("Task created successfully");
      } catch {
        toast.error("Failed to create task");
      }
    });
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={dialog.close}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleCreateTask}>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              Add a new recurring task. Task names must be unique
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="task-name">Task Name</Label>
              <Input
                id="task-name"
                placeholder="Enter task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                maxLength={50}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="task-description">Description (optional)</Label>
              <Input
                id="task-description"
                placeholder="Enter description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                maxLength={200}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="task-interval">Interval</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    id="task-interval"
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
              <Label htmlFor="task-active" className="cursor-pointer">
                Active
              </Label>
              <Switch id="task-active" checked={taskActive} onCheckedChange={setTaskActive} />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating || !taskName.trim()}
              className="cursor-pointer"
            >
              {isCreating ? (
                <>
                  <LoaderCircle className="mr-2 size-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Task"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
