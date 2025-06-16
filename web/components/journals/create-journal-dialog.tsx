"use client";

import { ColorPicker } from "@/components/journals/color-picker";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
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
import { useDialog } from "@/hooks/use-dialog-store";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  description: z.string().optional()
});

interface CreateJournalDialogProps {
  onJournalCreated: (journal: any) => void;
}

export function CreateJournalDialog({ onJournalCreated }: CreateJournalDialogProps) {
  const dialog = useDialog();

  const isDialogOpen = dialog.isOpen && dialog.type === "create-journal";

  const [color, setColor] = useState("#99aab5");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: ""
    }
  });

  async function handleCreate(values: z.infer<typeof formSchema>) {
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
      dialog.onClose();
    } catch (err: any) {
      toast.error("Failed to create journal");
      console.error(err);
    }
  }

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={dialog.onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create a new journal</AlertDialogTitle>
          <AlertDialogDescription>Add a new journal to your collection.</AlertDialogDescription>
        </AlertDialogHeader>
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
            <AlertDialogFooter>
              <AlertDialogCancel type="button" className="cursor-pointer">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction type="submit" className="cursor-pointer">
                Create
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
