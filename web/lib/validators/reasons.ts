import z from "zod";

export const MAX_REASON_TEXT_LENGTH = 500;

export const createReasonSchema = z.object({
  text: z
    .string()
    .nonempty({ message: "Text is required" })
    .max(MAX_REASON_TEXT_LENGTH, {
      message: `Text must be at most ${MAX_REASON_TEXT_LENGTH} characters`
    })
});
