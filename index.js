require('./server');
const bot = require('./src/bot');

bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    bot.sendMessage(chatId, `Hello ${msg.chat.first_name}! You sent: ${resp}`);
});