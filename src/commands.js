const { validateDate } = require('./helpers.js');

let addGroceryItem = (ctx) => {
    let splitInput = ctx.message.text.split(/\s+/g);
    if (splitInput[1] == null) {
        ctx.reply('Grocery item is missing. Please enter it properly');
        return;
    }
    let isDataValid = validateDate(splitInput[splitInput.length-1]);
    if (!isDataValid) {
        ctx.replyWithMarkdown('Your date is incorrect. Please enter the correct date in the following format: `YYYY.MM.DD`');
        return;
    }
    let findGrocery = splitInput.slice(1, [splitInput.length-1]);
    let groceryItem = findGrocery.join(' ');
    let userId = ctx.from.id;
    let dataSet = {
        grocery: groceryItem,
        expiration_date: splitInput[splitInput.length-1]
    };
    return ctx.replyWithMarkdown(`*Added*. Your product is *${dataSet.grocery}* that expires at *${dataSet.expiration_date}*`);
}

module.exports = {
    addGroceryItem
}