const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');
const fs = require('fs');
const path = require('path');
let db = new JsonDB(new Config("grocery-list", true, true, '/'));

let saveToDatabase = (userId, groceryItem, expirationDate) => {
    let dataSet = {
        grocery: groceryItem.join(' '),
        expiration_date: expirationDate
    }
    db.push(`/${userId}`, [dataSet], false);
}

let getFromDatabase = (userId) => {
    return db.getData(`/${userId}`);
}

let getUserIds = () => {
    return db.getData(`/`)
}

module.exports = {
    saveToDatabase,
    getFromDatabase,
    getUserIds
}