import z from "zod";

export const createJournalSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  description: z.string().optional(),
  color: z.string().nonempty({ message: "Color is required" })
});
