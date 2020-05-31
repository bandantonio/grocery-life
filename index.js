const Telegraf = require('telegraf');
require('./server');
require('dotenv').config();
const { addGroceryItem, getGroceryItems } = require('./src/commands.js');
const { formatDbResponse } = require('./src/helpers.js');
const { enableNotificationsForUser } = require('./src/cron.js');

// Instantiate a new bot
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => ctx.reply(`Hello ${ctx.from.first_name}. Welcome to Grocery Life.\n
Type /help for more information about how to use the bot` 
));

bot.command('add', (ctx) => {
    addGroceryItem(ctx);
});

bot.command('get', (ctx) => {
    ctx.reply(formatDbResponse(getGroceryItems(ctx.from.id)));
});

bot.command('cron', (ctx) => {
    enableNotificationsForUser(ctx.from.id);
});

bot.command('help', (ctx) => {
    ctx.replyWithMarkdown(`Use the following commands to control your bot:\nTODO`);
});

bot.launch()