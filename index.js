require('./server');
const cronTask = require('./src/cron')

const bot = require('./src/bot');
const { addGroceryItem, getGroceryItems, getExpiringGroceryItems, deleteGroceryItems, enableCronNotifications, disableCronNotifications } = require('./src/commands');
const { formatGroceriesOutput } = require('./src/helpers');

cronTask.start();

bot.onText(/\/add (.+)/, (msg, match) => {
    addGroceryItem(msg, match);
    enableCronNotifications(msg.from.id);
});

bot.onText(/\/get (.+)/, (msg, match) => {
    let items = getGroceryItems(msg.from.id, match);
    bot.sendMessage(msg.from.id, formatGroceriesOutput(items));
});

bot.onText(/\/delete (.+)/, (msg, match) => {
    deleteGroceryItems(msg, match);
});

bot.onText(/\/expiring/, (msg) => {
    let expiringItems = getExpiringGroceryItems(msg.from.id);
    bot.sendMessage(msg.from.id, formatGroceriesOutput(expiringItems));
});

bot.onText(/\/enable/, (msg) => {
    enableCronNotifications(msg.from.id);
});

bot.onText(/\/disable/, (msg) => {
    disableCronNotifications(msg.from.id);
});
