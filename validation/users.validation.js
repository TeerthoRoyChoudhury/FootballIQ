import { email, z } from "zod";

export const userSignupPostValidation = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
});

export const userLoginPostValidation = z.object({
  email: z.email(),
  password: z.string().min(8),
});
