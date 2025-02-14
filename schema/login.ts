import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).trim(),
  password: z
    .string()
    .min(6, { message: 'Your password must be at least 6 characters long' })
    .max(100, { message: 'Your password must be at most 100 characters long' })
    .trim(),
});

export { loginSchema };
