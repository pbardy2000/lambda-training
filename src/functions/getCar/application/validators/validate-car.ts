import { z } from 'zod';

const CarSchema = z.object({
  regNumber: z.string().regex(/^[A-Z]{3}[0-9]{3}$/i),
  yearOfManufacturer: z.number().int().min(1900).max(new Date().getFullYear()),
  color: z.enum(['red', 'blue']),
  isTaxed: z.boolean(),
});

export type CarModel = z.infer<typeof CarSchema>;

export function validateCar(data: unknown): data is CarModel {
  return CarSchema.safeParse(data).success;
}
