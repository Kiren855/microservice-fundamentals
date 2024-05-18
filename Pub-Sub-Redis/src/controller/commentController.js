'use strict'
const { createComment, getCommentbyParentId, deleteComment } = require('../service/commentService');
const { SuccessResponse } = require('../core/successResponse');

class CommnentController {
    createComment = async (req, res, next) => {
        new SuccessResponse({
            message: 'create new comment',
            metadata: await createComment(req.body)
        }).send(res);
    }

    getCommentByParentId = async (req, res, next) => {
        new SuccessResponse({
            message: 'get comments',
            metadata: await getCommentbyParentId(req.query)
        }).send(res);
    }

    deleteComment = async (req, res, next) => {
        new SuccessResponse({
            message: 'delete comment',
            metadata: await deleteComment(req.query)
        }).send(res);
    }
}

module.exports = new CommnentController();