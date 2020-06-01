const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const webhookUrl = process.env.WEBHOOK_URL;
const token = process.env.TELEGRAM_BOT_TOKEN;
let bot;

if (process.env.NODE_ENV === 'production') {
    bot = new TelegramBot(token);
    bot.setWebHook(webhookUrl + token);
} else {
    bot = new TelegramBot(token, { polling: true });
}

module.exports = bot;