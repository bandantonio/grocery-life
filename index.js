const Telegraf = require('telegraf');
require('dotenv').config();

// Instantiate a new bot
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => ctx.reply(`Hello ${ctx.from.first_name}. Welcome to Grocery Life.\n
Type /help for more information about how to use the bot` 
));

bot.command('help', (ctx) => {
    ctx.replyWithMarkdown(`Use the following commands to control your bot:\nTODO`);
});

bot.launch()