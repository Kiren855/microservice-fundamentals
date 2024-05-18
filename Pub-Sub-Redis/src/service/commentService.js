const { NotFoundError } = require('../core/errrorResponse');
const Comment = require('../model/commentModel');

class CommentService {
    static async createComment({
        productId, userId, content, parentId = null
    }) {
        const comment = new Comment({
            comment_productId: productId,
            comment_userId: userId,
            comment_content: content,
            comment_parentId: parentId
        });

        let rightValue;
        if (parentId) {
            const parent = await Comment.findById(parentId);
            if (!parent) throw new NotFoundError('comment parent not found');

            rightValue = parent.comment_right;

            await Comment.updateMany({
                comment_productId: productId,
                comment_right: { $gte: rightValue }
            }, {
                $inc: { comment_right: 2 }
            });

            await Comment.updateMany({
                comment_productId: productId,
                comment_left: { $gt: rightValue }
            }, {
                $inc: { comment_left: 2 }
            });

        } else {
            const maxRightvalue = await Comment.findOne({
                comment_productId: productId
            }, 'comment_right', { sort: { comment_right: -1 } });

            if (maxRightvalue) {
                rightValue = maxRightvalue.comment_right + 1;
            } else {
                rightValue = 1;
            }
        }

        comment.comment_left = rightValue;
        comment.comment_right = rightValue + 1;
        await comment.save();

        return comment;
    }

    static async getCommentbyParentId({
        productId,
        parentId = null,
        limit = 50,
        offset = 0
    }) {
        if (parentId) {
            const parent = await Comment.findById(parentId);
            if (!parent) throw new NotFoundError("Not found parent");

            const comments = await Comment.find({
                comment_productId: productId,
                comment_left: { $gt: parent.comment_left },
                comment_right: { $lt: parent.comment_right }
            })
                .select({
                    comment_left: 1,
                    comment_right: 1,
                    comment_content: 1,
                    comment_parentId: 1
                })
                .sort({
                    comment_left: 1
                });

            return comments;
        } else {
            const comments = await Comment.find({
                comment_productId: productId,
                comment_parentId: parentId,
            })
                .select({
                    comment_left: 1,
                    comment_right: 1,
                    comment_content: 1,
                    comment_parentId: 1
                })
                .sort({
                    comment_left: 1
                });

            return comments;
        }
    }

    static async deleteComment({
        productId,
        commentId
    }) {
        /*
           xuwr 
        */

        const comment = await Comment.findById(commentId);
        if (!comment) throw new NotFoundError('comment not found');

        const leftValue = comment.comment_left;
        const rightValue = comment.comment_right;

        const width = rightValue - leftValue + 1;

        await Comment.deleteMany({
            comment_productId: productId,
            comment_left: { $gte: leftValue, $lte: rightValue }
        });

        await Comment.updateMany({
            comment_productId: productId,
            comment_right: { $gt: rightValue }
        }, {
            $inc: { comment_right: -width }
        });

        await Comment.updateMany({
            comment_productId: productId,
            comment_left: { $gt: rightValue }
        }, {
            $inc: { comment_left: -width }
        });
    }
}

module.exports = CommentService;