import z from "zod";

export const MAX_TITLE_LENGTH = 100;
export const MAX_DESCRIPTION_LENGTH = 300;

export const createJournalSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "Title is required" })
    .max(MAX_TITLE_LENGTH, { message: `Title must be at most ${MAX_TITLE_LENGTH} characters` }),
  description: z
    .string()
    .max(MAX_DESCRIPTION_LENGTH, {
      message: `Description must be at most ${MAX_DESCRIPTION_LENGTH} characters`
    })
    .optional(),
  color: z.string().nonempty({ message: "Color is required" })
});

export const editJournalSchema = createJournalSchema.extend({
  id: z.string().nonempty({ message: "ID is required" })
});

export const deleteJournalSchema = z.object({
  id: z.string().nonempty({ message: "ID is required" })
});
