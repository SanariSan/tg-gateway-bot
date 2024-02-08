import type { Express, NextFunction, Request, Response } from 'express';
import { NotFoundError } from './errors';

export function setupHandleErrors(app: Express) {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);

    // for rare cases when something broke while streaming data to client
    // fallback to default express handler
    if (res.headersSent) {
      next(err);
      return;
    }

    if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
    }

    res.send(err.message !== '' ? err.message : 'Internal error');
  });
}
