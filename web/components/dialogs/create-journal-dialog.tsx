"use client";

import { ColorPicker } from "@/components/journals/color-picker";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDialogStore } from "@/hooks/use-dialog-store";
import { createJournalSchema } from "@/lib/validators/journal";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

interface CreateJournalDialogProps {
  onJournalCreated: (journal: any) => void;
}

export function CreateJournalDialog({ onJournalCreated }: CreateJournalDialogProps) {
  const dialog = useDialogStore();

  const isDialogOpen = dialog.isOpen && dialog.type === "create-journal";

  const [color, setColor] = useState("#99aab5");

  const form = useForm<z.infer<typeof createJournalSchema>>({
    resolver: zodResolver(createJournalSchema),
    defaultValues: {
      title: "",
      description: ""
    }
  });

  async function handleCreate(values: z.infer<typeof createJournalSchema>) {
    const { title, description } = values;

    try {
      const res = await axios.post("/api/journals", {
        title,
        description,
        color
      });

      const journal = res.data.journal;

      toast.success("Journal created");
      onJournalCreated(journal);

      form.reset();
      setColor("#99aab5");
      dialog.close();
    } catch (err: any) {
      toast.error("Failed to create journal");
      console.error(err);
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={dialog.close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new journal</DialogTitle>
          <DialogDescription>Add a new journal to your collection.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="My awesome journal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A brief description of what this journal is about"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Label htmlFor="color">Color</Label>
              <ColorPicker selectedColor={color} onColorChange={setColor} />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="cursor-pointer"
                onClick={() => handleCreate(form.getValues())}
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
