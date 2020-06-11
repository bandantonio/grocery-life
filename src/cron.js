const cron = require('node-cron');
const bot = require('./bot');
const { getUserIds } = require('./db')
const { getExpiringGroceryItems } = require('./commands');

const cronTask = cron.schedule("*/2 * * * * *", () => {
    let getAllGroceries = getUserIds();
    let userIds = Object.keys(getAllGroceries);
    userIds.map(id => {
        let expiringItems = getExpiringGroceryItems(id);
        bot.sendMessage(id, JSON.stringify(expiringItems));
    });
}, {
    scheduled: false
});

module.exports = cronTask;