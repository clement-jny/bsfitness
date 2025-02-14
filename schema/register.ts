import { z } from 'zod';

const registerSchema = z
  .object({
    lastname: z
      .string()
      .min(2, { message: 'Your lastname must be at least 2 characters long' })
      .max(50, { message: 'Your lastname must be at most 50 characters long' })
      .trim(),
    firstname: z
      .string()
      .min(2, { message: 'Your firstname must be at least 2 characters long' })
      .max(50, { message: 'Your firstname must be at most 50 characters long' })
      .trim(),
    email: z.string().email({ message: 'Invalid email address' }).trim(),
    password: z
      .string()
      .min(6, { message: 'Your password must be at least 6 characters long' })
      .max(100, {
        message: 'Your password must be at most 100 characters long',
      })
      .trim(),
    passwordConfirm: z
      .string()
      .min(6, {
        message:
          'Your password confirmation must be at least 6 characters long',
      })
      .max(100, {
        message:
          'Your password confirmation must be at most 100 characters long',
      })
      .trim(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: "Passwords don't match",
  });

export { registerSchema };
