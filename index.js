require('./server');
const bot = require('./src/bot');
const webhookUrl = process.env.WEBHOOK_URL;
const token = process.env.TELEGRAM_BOT_TOKEN;

bot.setWebHook(webhookUrl + token);

bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    bot.sendMessage(chatId, `Hello ${msg.chat.first_name}! You sent: ${resp}`);
});