import { z } from 'zod';
import { loginSchema } from '@/schema';

type TLoginSchema = z.infer<typeof loginSchema>;

export { TLoginSchema };
