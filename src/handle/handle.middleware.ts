import type { NextFunction, Request, Response } from 'express';
import type { TAsyncMWFN, TSyncMWFN } from './handle.type';

function asyncHandleMW(asyncCb: TAsyncMWFN) {
  return (req: Request, res: Response, next: NextFunction) => {
    asyncCb(req, res, next).catch(next);
  };
}

function syncHandleMW(syncCb: TSyncMWFN) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      syncCb(req, res, next);
    } catch (error: unknown) {
      next(error);
    }
  };
}

export { asyncHandleMW, syncHandleMW };
