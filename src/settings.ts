import type { Express } from 'express';
import express from 'express';

export function setupSettings(app: Express) {
  app.set('env', process.env.NODE_ENV ?? 'production');
  // app.set('trust proxy', 2);
  // app.use(
  //   cors({
  //     origin: true,
  //     credentials: true,
  //     optionsSuccessStatus: 204,
  //   }),
  // );
  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ limit: '100mb', extended: false }));
  app.set('x-powered-by', false);
}
