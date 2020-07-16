const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');
const fs = require('fs');
const path = require('path');
let db = new JsonDB(new Config("grocery-list", true, true, '/'));
let dbCron = new JsonDB(new Config("cron-settings", true, true, '/'));

let saveToDatabase = (userId, groceryItem, expirationDate) => {
    let dataSet = {
        grocery: groceryItem.join(' '),
        expiration_date: expirationDate
    }
    db.push(`/${userId}`, [dataSet], false);
}

let getFromDatabase = (userId, match=['get', 'all'] ) => {
    if (match[1] === 'all') {
        return db.getData(`/${userId}`);
    } else {
        let grocery = match[1];
        let getGroceryIndex = db.getIndex(`/${userId}`, grocery, "grocery");
        return db.getData(`/${userId}` + '[' + getGroceryIndex + ']');
    }
}

let deleteFromDatabase = (userId, match) => {
    if (match[1] === 'all') {
        db.delete(`/${userId}`);
    } else {
        let grocery = match[1];
        let getGroceryIndex = db.getIndex(`/${userId}`, grocery, "grocery");
        db.delete(`/${userId}` + '[' + getGroceryIndex + ']');
    }
}

let enableCronForUser = (userId) => {
    let dataSet = {
        notifications_enabled: true
    };
    dbCron.push(`/${userId}`, dataSet, false);
}

let disableCronForUser = (userId) => {
    let dataSet = {
        notifications_enabled: false
    };
    dbCron.push(`/${userId}`, dataSet, false);
}

let getUsersWithEnabledNotifications = () => {
    let getAllUsers = dbCron.getData(`/`);
    let usersWithEnabledNotifications = [];
    for (let key in getAllUsers) {
        if (getAllUsers[key].notifications_enabled == true) {
            usersWithEnabledNotifications.push(key);
        }
    }
    return usersWithEnabledNotifications;
}

module.exports = {
    saveToDatabase,
    getFromDatabase,
    deleteFromDatabase,
    enableCronForUser,
    disableCronForUser,
    getUsersWithEnabledNotifications
}