const bot = require('./bot');
const { validateDate } = require('./helpers');

let addGroceryItem = (msg, match) => {
    let userInput = match[1].split(/\s+/g);
    let groceryItem = userInput.slice(0, [userInput.length - 1]);
    let groceryExpirationDate = userInput[userInput.length - 1];
    let isDateValid = validateDate(groceryExpirationDate);

    if (userInput == null) {
        bot.sendMessage(msg.chat.id, 'Grocery item is missing. Please enter it properly');
    } else if (!isDateValid) {
        let warning = 'Your date is incorrect\\. Please enter the correct date in the following format: *`DD.MM.YYYY`*';
        bot.sendMessage(msg.chat.id, warning, {
            parse_mode: 'MarkdownV2'
        });
    } else {
        bot.sendMessage(msg.chat.id, `Grocery: ${groceryItem.join(' ')}; Expiration date: ${groceryExpirationDate}`)
    }
}

module.exports = {
    addGroceryItem
}