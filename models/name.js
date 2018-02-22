"use strict";

const db = require('../db/db.js')

module.exports = {
    get: async function (name) {
        try {
            let result = await db.getAsync('select * from names where name = ?', [name]);
            if(result === undefined) return null;

            result.occurances = await db.allAsync('select * from occurances where name = ?', [name]);

            return result;
        } catch(e) {
            console.log(e);
            return null;
        }
        
        return null;
    },
    getRandom: async function (number) {

        try {
            let result = await db.allAsync('select name, descr from names order by random() limit ?', [number]);
            let row = {};
            for (row of result)
                row.occurances = await db.allAsync('select * from occurances where name = ?', [row.name]);

            if(result === undefined) return null;
            return result;
        } catch(e) {
            console.log(e);
            return null;
        }

        return null;
    }
}