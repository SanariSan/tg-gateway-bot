import type { Request, Response } from 'express';

export const ping = (req: Request, res: Response) =>
  res.json({ status: 'success', server: 'echo', message: 'pong' });
