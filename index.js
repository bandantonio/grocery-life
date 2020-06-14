require('./server');
const cronTask = require('./src/cron')

const bot = require('./src/bot');
const { addGroceryItem, getGroceryItems, getExpiringGroceryItems, deleteGroceryItems } = require('./src/commands');

bot.onText(/\/add (.+)/, (msg, match) => {
    addGroceryItem(msg, match);
});

bot.onText(/\/get (.+)/, (msg, match) => {
    let items = getGroceryItems(msg.from.id, match);
    bot.sendMessage(msg.from.id, items);
});

bot.onText(/\/delete (.+)/, (msg, match) => {
    deleteGroceryItems(msg, match);
});

bot.onText(/\/expiring/, (msg) => {
    let expiringItems = getExpiringGroceryItems(msg.from.id);
    bot.sendMessage(userId, JSON.stringify(expiringItems));
});

bot.onText(/\/cron/, (msg) => {
    cronTask.start(msg.from.id)
});

bot.onText(/\/stop/, (msg) => {
    cronTask.stop();
});
