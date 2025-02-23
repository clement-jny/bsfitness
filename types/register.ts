import { z } from 'zod';
import { registerSchema } from '@/schema';

type TRegisterSchema = z.infer<typeof registerSchema>;

export { TRegisterSchema };
