require('./server');
const bot = require('./src/bot');
const { addGroceryItem, getGroceryItems } = require('./src/commands');

bot.onText(/\/add (.+)/, (msg, match) => {
    addGroceryItem(msg, match);
});

bot.onText(/\/get/, (msg) => {
    getGroceryItems(msg.from.id);
});