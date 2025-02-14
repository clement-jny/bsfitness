import { z } from 'zod';

// TODO: do better
const loginSchema = z.object({
  email: z
    .string()
    .min(2, { message: 'Your firstname must be 2 characters' })
    .max(50)
    .email(),
  password: z.string().min(6, {
    message: 'Your password must be 6 characters.',
  }),
});

export { loginSchema };
