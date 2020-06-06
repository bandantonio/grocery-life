require('./server');
const bot = require('./src/bot');
const { addGroceryItem, getGroceryItems, getExpiringGroceryItems } = require('./src/commands');

bot.onText(/\/add (.+)/, (msg, match) => {
    addGroceryItem(msg, match);
});

bot.onText(/\/get/, (msg) => {
    getGroceryItems(msg.from.id);
});

bot.onText(/\/expiring/, (msg) => {
    getExpiringGroceryItems(msg.from.id);
})