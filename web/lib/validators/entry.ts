import z from "zod";

export const MAX_TITLE_LENGTH = 100;
export const MAX_CONTENT_LENGTH = 5000;

export const createEntrySchemaOnboarding = z.object({
  title: z
    .string()
    .nonempty({ message: "Title is required" })
    .max(MAX_TITLE_LENGTH, { message: `Title must be at most ${MAX_TITLE_LENGTH} characters` }),
  content: z
    .string()
    .nonempty({ message: "Content is required" })
    .max(MAX_CONTENT_LENGTH, {
      message: `Content must be at most ${MAX_CONTENT_LENGTH} characters`
    }),
  tags: z
    .array(
      z
        .string()
        .nonempty()
        .regex(/^[a-z0-9\s-]+$/i, "Tags can only contain letters, numbers, spaces, and hyphens")
    )
    .optional()
});

export const createEntrySchema = createEntrySchemaOnboarding.extend({
  journalId: z.string().nonempty({ message: "Journal ID is required" })
});
