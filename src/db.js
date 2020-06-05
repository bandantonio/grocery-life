const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');
const fs = require('fs');
const path = require('path');
let db = new JsonDB(new Config("grocery-list", true, true, '/'));

let saveToDatabase = (userId, groceryItem, expirationDate) => {
    let dataSet = {
        grocery: groceryItem[0],
        expiration_date: expirationDate
    }
    db.push(`/${userId}`, [dataSet], false);
}

module.exports = {
    saveToDatabase
}