import TelegramBot = require('node-telegram-bot-api');
import { USERS_DB } from './db';

export class ChatBot {
  private static bot: TelegramBot;

  static init() {
    this.bot = new TelegramBot(process.env.CHAT_BOT ?? '', {
      polling: true,
    });

    /**
     * {
     *    message_id: 11,
     *    from: {
     *      id: 123456789,
     *      is_bot: false,
     *      first_name: 'name',
     *      username: 'tg_nickname'
     *    },
     *    chat: {
     *      id: -4177467014,
     *      title: 'CHAT_PROMO',
     *      type: 'group',
     *      all_members_are_administrators: true
     *    },
     *    date: 1707424567,
     *    new_chat_participant: {
     *      id: 123456789,
     *      is_bot: false,
     *      first_name: 'name',
     *      username: 'tg_nickname'
     *    },
     *    new_chat_member: {
     *      id: 123456789,
     *      is_bot: false,
     *      first_name: 'name',
     *      username: 'tg_nickname'
     *    },
     *    new_chat_members: [
     *      {
     *        id: 123456789,
     *        is_bot: false,
     *        first_name: 'name',
     *        username: 'tg_nickname'
     *      }
     *    ]
     * }
     * { type: 'new_chat_members' }
     */
    this.bot.on(
      'new_chat_members',
      (message: TelegramBot.Message, metadata: TelegramBot.Metadata) => {
        console.log(message);
        console.log(metadata);

        const user = USERS_DB.find((u) => u.tgId === message.from?.id);
        if (user === undefined) {
          console.log('User not found, joined not from site');
          return;
        }

        if (!user.hasJoinedSocials) {
          user.hasJoinedSocials = true;
        }
      },
    );
  }
}
