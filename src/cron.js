const CronJob = require('cron').CronJob;
const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { getExpiringGroceryItems } = require('./commands.js');
const { formatDbResponse } = require('./helpers.js');
const emoji = require('node-emoji');

let db_cron = new JsonDB(new Config('cron-settings', true, true, '/'));

// TODO: Cron is not yet functional
let cron = (chatId) => {
    const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    let expiringItems = getExpiringGroceryItems(chatId);
    let usersWithEnabledNotifications = getUsersWithEnabledNotifications();
    console.log(expiringItems);
    usersWithEnabledNotifications.forEach((userId) => {
        let job = new CronJob('0/10 * * * * *', () => {
            axios.get(telegramUrl, {
                params: {
                    chat_id: userId,
                    text: emoji.emojify(':warning: Expiration Notification :warning:\n\n') + formatDbResponse(expiringItems)
                }
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        }, null, true, 'Europe/Kiev');
        job.start();
    });
}

let enableNotificationsForUser = (userId) => {
    db_cron.push(`/${userId}`, {
        "is_cron_enabled": true
    });
    cron(userId);
}

let getUsersWithEnabledNotifications = () => {
    let contents = JSON.parse(fs.readFileSync(path.resolve('cron-settings.json'), 'utf8'));
    let arrayOfUsers = [];
    for (let key in contents) {
        if (contents[key].is_cron_enabled) {
            arrayOfUsers.push(key);
        }
    }
    return arrayOfUsers;
}

module.exports = {
    enableNotificationsForUser
};