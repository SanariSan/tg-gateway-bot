import TelegramBot = require('node-telegram-bot-api');
import { USERS_DB } from './db';
import { EventEmitter } from './events';

enum EBOT_COMMANDS {
  START = '/start',
  VERIFY = '/verify',
}

export class PromoBot {
  private static bot: TelegramBot;

  static init() {
    this.bot = new TelegramBot(process.env.PROMO_BOT ?? '', {
      polling: true,
    });

    void this.bot.setMyCommands([
      {
        command: EBOT_COMMANDS.VERIFY,
        description: 'Проверить',
      },
    ]);

    void this.bot.addListener(
      'message',
      (message: TelegramBot.Message, metadata: TelegramBot.Metadata) => {
        void this.handleMessage(message, metadata);
      },
    );

    this.bot.onText(
      /\/start (?<tgHash>\w{32})/,
      (message: TelegramBot.Message, match: RegExpExecArray | null) => {
        console.log(message);

        const user = USERS_DB.find((u) => u.tgHash === match?.groups?.hash);

        if (user === undefined) {
          console.log('User not found');
          return;
        }

        user.tgId = message.from?.id;
      },
    );

    EventEmitter.addListener('tg_hash', (email: string, hash: string) => {
      USERS_DB.forEach((user) => {
        if (user.email === email) {
          // eslint-disable-next-line no-param-reassign
          user.tgHash = hash;
        }
      });
    });
  }

  private static async handleMessage(message: TelegramBot.Message, metadata: TelegramBot.Metadata) {
    switch (message.text) {
      case EBOT_COMMANDS.START: {
        await this.handleStartMessage(message);
        break;
      }
      case EBOT_COMMANDS.VERIFY: {
        await this.handleVerify(message);
        break;
      }
      default: {
        // await this.handleUserIdMessage(message);
      }
    }
  }

  private static async sendMessage(chatId: number, message: string) {
    await this.bot.sendMessage(chatId, message, {
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    });
  }

  private static async handleVerify(message: TelegramBot.Message) {
    if (!message.from) {
      throw new Error('Message from is undefined');
    }

    console.log(USERS_DB, message.from.id);

    const user = USERS_DB.find((u) => u.tgId === message.from?.id);
    if (!user) {
      console.log('User not found');
      return;
    }

    if (user.hasJoinedSocials) {
      const promo = 'secret_promo';
      await this.sendMessage(message.chat.id, promo);
    } else {
      await this.sendMessage(message.chat.id, 'not joined socials');
    }
  }

  private static async handleStartMessage(message: TelegramBot.Message) {
    if (!message.from) {
      throw new Error('Message from is undefined');
    }
    await this.sendMessage(message.chat.id, 'started');
  }
}
