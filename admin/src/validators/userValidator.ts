import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string({ required_error: "Email is mandatory!" }).trim().email({
    message: "Invalid email format. Please enter a valid email address!",
  }),
  password: z.string().min(8, "Password must be at least 8 characters"),
  mobile: z.coerce.string().min(10, "Password must be at least 6 characters"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
