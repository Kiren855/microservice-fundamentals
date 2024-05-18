'use strict'

const express = require('express');
const router = express.Router();

const Controller = require('../controller/studentController');
const asyncHandle = require('../helper/asyncHandle');


router.get('/students', asyncHandle(Controller.getAllStudent));
router.patch('/students/:studentId', asyncHandle(Controller.updateStudent));
router.delete('/students/:studentId', asyncHandle(Controller.removeStudent));
router.post('/students', asyncHandle(Controller.createStudent));

module.exports = router;