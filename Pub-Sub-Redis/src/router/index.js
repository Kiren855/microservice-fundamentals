'use strict'

const express = require('express');

const router = express.Router();

router.use(require('./commentRoute'));
router.use(require('./studentRoute'));
module.exports = router;