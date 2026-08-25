import { z } from "zod";

export const authSchema = z.object({
  username: z.string().min(3, "Username must have at least 3 characters"),
  password: z.string().min(6, "Password must have at least 6 characters"),
});

export type AuthFormValues = z.infer<typeof authSchema>;