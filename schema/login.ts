import { z } from 'zod';

const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' })
    .trim(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, { message: 'Your password must be at least 6 characters' })
    .trim(),
});

export { loginSchema };
