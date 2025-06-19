import z from "zod";

export const updateMoodSchema = z.object({
  scale: z
    .number({ invalid_type_error: "Mood must be a number" })
    .min(1, { message: "Mood must be at least 1" })
    .max(5, { message: "Mood must be at most 5" })
});
