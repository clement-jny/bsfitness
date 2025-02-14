import { z } from 'zod';

// TODO: do better
const registerSchema = z.object({
  lastname: z
    .string()
    .min(2, { message: 'Your lastname must be 2 characters' })
    .max(50),
  firstname: z
    .string()
    .min(2, { message: 'Your firstname must be 2 characters' })
    .max(50),
  email: z
    .string()
    .min(2, { message: 'Your firstname must be 2 characters' })
    .max(50)
    .email(),
  password: z.string().min(6, {
    message: 'Your password must be 6 characters.',
  }),
  passwordConfirm: z.string().min(6, {
    message: 'Your password must be 6 characters.',
  }), // .refine()
});

export { registerSchema };
