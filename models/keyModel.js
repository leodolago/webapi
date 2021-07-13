const {v4} = require("uuid");
const fs = require("fs");
const { join } = require("path");
const FILE_PATH = require('path').join( __dirname, "keys.json");

function findKeys() {
    if(!fs.existsSync(FILE_PATH)) return [];

    const rawData = fs.readFileSync(FILE_PATH);
    return JSON.parse(rawData);
}

function findKey(key) {
    return findKeys().find(k => k.key === key);
}

function createKey() {
    const keys = findKeys();
    const apiKey = {
        key: v4(),
        enabled: true,
        lastUsed: null
    }
    keys.push(apiKey);
    fs.writeFileSync( FILE_PATH, JSON.stringify(keys));
    return apiKey;
}

function deleteKey(key) { 
    const users = findKeys();
    keys.forEach((item, index, array) => {
        if(item.key === key)
            array.splice(index, 1);
    })
    fs.writeFileSync( FILE_PATH, JSON.stringify(keys));
    return key;
}

module.exports = {
    findKey, createKey, deleteKey
}