const mongoose = require('mongoose');
const db = require('../config/dbConfig');

const mongoString = process.env.CONN_STR;


class Database {
    constructor() {
        this.connect();
    }
    connect(type = 'mongodb') {
        // if (1 === 1) {
        //     mongoose.set('debug', true);
        //     mongoose.set('debug', { color: true });
        // }

        mongoose.connect(mongoString)
            .then(_ => {
                console.log('DB connected success')
            })
            .catch(err => {
                console.log('DB Error connect');
            })
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;