const bot = require('./bot');
const { validateDate, daysToMilliseconds } = require('./helpers');
const { saveToDatabase, getFromDatabase, deleteFromDatabase } = require('./db');
require('dotenv').config();

let addGroceryItem = (msg, match) => {
    let userInput = match[1].split(/\s+/g);
    let groceryItem = userInput.slice(0, [userInput.length - 1]);
    let groceryExpirationDate = userInput[userInput.length - 1];
    let isDateValid = validateDate(groceryExpirationDate);
    if (userInput == null) {
        bot.sendMessage(msg.chat.id, 'Grocery item is missing. Please enter it properly');
    } else if (!isDateValid) {
        let warning = 'Your date is incorrect\\. Please enter the correct date in the following format: *`YYYY-MM-DD`*';
        bot.sendMessage(msg.chat.id, warning, {
            parse_mode: 'MarkdownV2'
        });
    } else {
        saveToDatabase(msg.from.id, groceryItem, groceryExpirationDate);
        let success_message = `*Successfully added:*\n\\- Grocery: ${groceryItem.join(' ')}\n\\- Expiration date: \`${groceryExpirationDate}\``;
        bot.sendMessage(msg.chat.id, success_message, {
            parse_mode: 'MarkdownV2'
        });
    }
}

let getGroceryItems = (userId) => {
    let retrievedItems = getFromDatabase(userId);
    let items = retrievedItems.map(item => {
        return `${item.grocery} - ${item.expiration_date}`;
    }).join('\n');
    bot.sendMessage(userId, items);
}

let deleteGroceryItems = (msg, match) => {
    deleteFromDatabase(msg.from.id, match);
}

let getExpiringGroceryItems = (userId) => {
    let thresholdDays = process.env.THRESHOLD_DAYS;
    let threshold = Date.now() + daysToMilliseconds(thresholdDays);
    let retrievedItems = getFromDatabase(userId);
    return retrievedItems.filter(item => {
        let groceryExpirationTime = new Date(item.expiration_date).getTime();
        return groceryExpirationTime >= threshold;
    });
}

module.exports = {
    addGroceryItem,
    getGroceryItems,
    deleteGroceryItems,
    getExpiringGroceryItems
}