import { Request, Response } from 'express';
import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email()
});

export function createUser(req: Request, res: Response) {
  const result = createUserSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.format() });
  }

  const { name, email } = result.data;

  return res.status(201).json({ message: 'Usuário criado', user: { name, email } });
}
