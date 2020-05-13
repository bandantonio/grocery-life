const { validateDate } = require('./helpers.js');
const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');
const fs = require('fs');
const path = require('path');

// Initialize JsonDB
let db = new JsonDB(new Config('grocery-list', true, true, '/'));

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
    db.push(`/${userId}`, [dataSet], false);
    return ctx.replyWithMarkdown(`*Added*. Your product is *${dataSet.grocery}* that expires at *${dataSet.expiration_date}*`);
}

let getGroceryItems = (userId) => {
    let contents = JSON.parse(fs.readFileSync(path.resolve('grocery-list.json'), 'utf8'));
    let filteredContent = Array.from(contents[userId + '']);
    return filteredContent;
}

module.exports = {
    addGroceryItem,
    getGroceryItems
}