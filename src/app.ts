import express from 'express';
import { createServer } from 'http';
import { initSocial, ping } from './api';
import { setupHandleErrors } from './error';
import { syncHandleMW } from './handle';
import { setupSettings } from './settings';
import { NotFoundError } from './errors';
import { PromoBot } from './promo-bot';
import { ChatBot } from './chat-bot';

function init() {
  const app = express();
  const server = createServer(app);

  server.on('error', (e: NodeJS.ErrnoException) => {
    if (e.code === 'EADDRINUSE' || e.code === 'EADDRNOTAVAIL') {
      setTimeout(() => {
        server.close();

        server.listen(Number(process.env.PORT ?? 80), process.env.HOST ?? '0.0.0.0');
      }, 60_000);
    }
  });

  setupSettings(app);

  app.use('/ping', syncHandleMW(ping));
  app.use('/initSocial', syncHandleMW(initSocial));
  app.use(`*`, () => {
    throw new NotFoundError({ message: 'Route not found' });
  });

  setupHandleErrors(app);

  server
    .listen(Number(process.env.PORT ?? 80), process.env.HOST ?? '0.0.0.0', () => {
      console.log(`Server running on port : ${process.env.PORT ?? ':80'}`);
    })
    .on('error', (e) => {
      console.log(e);
    });

  PromoBot.init();
  ChatBot.init();
}

init();
