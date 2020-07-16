const cron = require('node-cron');
const bot = require('./bot');
const { getUsersWithEnabledNotifications } = require('./db')
const { getExpiringGroceryItems } = require('./commands');
const { formatGroceriesOutput } = require('./helpers')

const cronTask = cron.schedule("0 11 * * *", () => {
    let usersWithEnabledNotifications = getUsersWithEnabledNotifications();
    usersWithEnabledNotifications.forEach(userId => {
        let expiringGroceries = getExpiringGroceryItems(userId);
        bot.sendMessage(userId, formatGroceriesOutput(expiringGroceries));
    });
}, {
    scheduled: false
});

module.exports = cronTask;