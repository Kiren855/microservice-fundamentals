const express = require('express');
const app = express();
require('dotenv').config();
require('./database/initDB');
const morgan = require('morgan');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/v1/', require('./router/index'));

//test redis
// const product = require('./test/product.test');
// product.purchaseProduct('product:003', 26);
// require('./test/inventory.test');

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404

    next(error);
})

app.use((err, req, res, next) => {
    const statusCode = err.status || 500

    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: err.message || 'Internal Server Error'
    })
})
module.exports = app;
