import { z } from 'zod';

const registerSchema = z.object({
  lastname: z
    .string({ required_error: 'Lastname is required' })
    .min(3, { message: 'Your lastname must be at least 3 characters' })
    .max(50, { message: 'Your lastname must be at most 50 characters' })
    .trim(),
  firstname: z
    .string({ required_error: 'Firstname is required' })
    .min(3, { message: 'Your firstname must be at least 3 characters' })
    .max(50, { message: 'Your firstname must be at most 50 characters' })
    .trim(),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' })
    .trim(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, { message: 'Your password must be at least 6 characters' })
    .trim(),
  // passwordConfirm: z
  //   .string({ required_error: 'Password confirm is required' })
  //   .min(6, {
  //     message: 'Your password confirmation must be at least 6 characters',
  //   })
  //   .trim(),
});
// .refine((data) => data.password === data.passwordConfirm, {
//   path: ['passwordConfirm'],
//   message: "Passwords don't match",
// });

export { registerSchema };
