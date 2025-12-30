import { prisma } from '../lib/prisma.js';
import { validationResult, matchedData } from 'express-validator';

const createComment = async (req, res, next) => {
  const userId = req.user.id;
  const { postId } = req.params;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const mergedMessage = errors
        .array()
        .map((error) => error.msg)
        .join('--');
      return res.status(400).json({
        success: false,
        message: mergedMessage,
      });
    }

    const existingPost = await prisma.post.findFirst({
      where: {
        id: postId,
        OR: [{ status: 'PUBLISHED' }, { authorId: userId }],
      },
    });

    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found.',
      });
    }

    const { content } = matchedData(req);

    const newComment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: userId,
      },
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: 'Successfully created the comment.',
      data: newComment,
    });
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  const userId = req.user.id;
  const { commentId } = req.params;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const mergedMessage = errors
        .array()
        .map((error) => error.msg)
        .join('--');
      return res.status(400).json({
        success: false,
        message: mergedMessage,
      });
    }

    const existingComment = await prisma.comment.findFirst({
      where: {
        id: commentId,
        authorId: userId,
      },
    });

    if (!existingComment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found.',
      });
    }

    const { content } = matchedData(req);

    const updatedComment = await prisma.comment.update({
      where: {
        id: commentId,
        authorId: userId,
      },
      data: {
        content,
      },
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    res.json({
      success: true,
      message: 'Successfully updated the comment.',
      data: updatedComment,
    });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  const userId = req.user.id;
  const { commentId } = req.params;
  try {
    const existingComment = await prisma.comment.findFirst({
      where: {
        id: commentId,
        authorId: userId,
      },
    });

    if (!existingComment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found.',
      });
    }

    await prisma.comment.delete({
      where: {
        id: commentId,
        authorId: userId,
      },
    });

    res.json({
      success: true,
      message: 'Successfully deleted the comment.',
    });
  } catch (error) {
    next(error);
  }
};

export { createComment, updateComment, deleteComment };
