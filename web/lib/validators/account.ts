import { z } from "zod";

export const updateUsernameSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Username must be at least 1 character long" })
    .max(30, { message: "Username must be at most 30 characters long" })
    .regex(/^[a-z0-9._-]*$/i, {
      message: "Username can only contain letters, numbers, dots, underscores, or hyphens"
    })
});
