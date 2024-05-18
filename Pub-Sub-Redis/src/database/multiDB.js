const mongoose = require('mongoose');

function newConnect(url) {
    const db = mongoose.createConnection(url,);

    db.on('error', err => {
        console.log(JSON.stringify(err));
    })
    db.on('connected', function () {
        mongoose.set('debug', (col, method, query, doc) => {
            console.log(`Mongo Debug:: ${this.name}::${col}.${method}(${JSON.stringify(query)}, ${JSON.stringify(doc)})`);
        })
        console.log(`Mongodb:: connected ${this.name}`);
    });
    db.on('disconnected', function () {
        console.log(`Mongodb:: disconnected ${this.name}`);
    });

    return db;
}


const school = newConnect(process.env.SCHOOL_URL);
const user = newConnect(process.env.USER_URL);
module.exports = {
    school,
    user
}