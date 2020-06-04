require('./server');
const bot = require('./src/bot');
const { addGroceryItem } = require('./src/commands');

bot.onText(/\/add (.+)/, (msg, match) => {
    addGroceryItem(msg, match);
});