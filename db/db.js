
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('db/name.db');


db.getAsync = function(sql, args) {
    return  new Promise(function(resolve, reject) {
        db.get(sql, args, function(err, row) {
            if(err) return reject(err);
            return resolve(row);
        });
    });
}

db.allAsync = function(sql, args) {
    return  new Promise(function(resolve, reject) {
        db.all(sql, args, function(err, rows) {
            if(err) return reject(err);
            return resolve(rows);
        });
    });
}

module.exports = db;