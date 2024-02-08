import type { Request, Response } from 'express';
import crypto from 'crypto';
import { EventEmitter } from '../events';

const rstr = (l: number) =>
  crypto
    .randomBytes(Math.ceil(l / 2))
    .toString('hex')
    .slice(0, l);

export const initSocial = (req: Request, res: Response) => {
  const hash = rstr(32);

  EventEmitter.emit('tg_hash', req.query.email, hash);

  console.log(req.query.email, hash);

  res.json({
    status: 'success',
    server: 'test',
    message: `${process.env.PROMO_BOT_URL ?? ''}?start=${hash}`,
  });

  return;
};
