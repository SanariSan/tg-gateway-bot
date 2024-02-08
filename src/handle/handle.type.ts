import type { NextFunction, Response } from 'express';

// too complicated to make strong type checking here, maybe some day...
type TAsyncMWFN = (req: any, res: Response, next: NextFunction) => Promise<void>;
type TSyncMWFN = (req: any, res: Response, next: NextFunction) => void;

export type { TAsyncMWFN, TSyncMWFN };
