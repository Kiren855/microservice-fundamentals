'use strict'

const Controller = require('../controller/commentController');
const express = require('express');

const router = express.Router();

router.post('/comments', Controller.createComment);
router.get('/comments', Controller.getCommentByParentId);
router.delete('/comments', Controller.deleteComment);
module.exports = router;