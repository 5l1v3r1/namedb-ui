"use strict";

const db = require('../db/db.js');

async function getOccurances(name) {
    try {
        return await db.allAsync('select * from occurances where name = ?', [name]);
    } catch(e) {
        console.log(e);
        return null;
    }
}

async function getName(name, doGetOccurances) {
    try {
        let result = await db.getAsync('select * from names where name = ?', [name]);
        if(result === undefined) return null;

        if(doGetOccurances !== false) {
            result.occurances = await getOccurances(name);
        }

        return result;

    } catch(e) {
        console.log(e);
        return null;
    }
}

module.exports = {
    get: async function (name) {
        let result= getName(name);
        return result;
    },
    getRandom: async function (number) {

        try {
            let result = await db.allAsync('select * from names order by random() limit ?', [number]);
            if(result === undefined) return null;

            return result;
        } catch(e) {
            console.log(e);
            return null;
        }

        return null;
    },

    getStartingWith: async function (startingLetters) {
        try {
            let result = await db.allAsync("select * from names where name like ? || '%'", [startingLetters]);
            if(result === undefined) return null;
            return result;
        } catch(e) {
            console.log(e);
            return null;
        }
    }
}