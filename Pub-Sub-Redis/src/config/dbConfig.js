require('dotenv').config();

const db = {
    port: process.env.DEV_DB_PORT,
    host: process.env.DEV_DB_HOST,
    name: process.env.DEV_DB_NAME
};

const dbLocal = {
    port: process.env.LOCAL_DB_PORT,
    host: process.env.LOCAL_DB_HOST,
    name: process.env.LOCAL_DB_NAME
}

module.exports = {
    db, dbLocal
};