import { prisma } from '../lib/prisma.js';
import { validationResult, matchedData } from 'express-validator';

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        status: 'PUBLISHED',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      success: true,
      message: 'Successfully loaded all posts.',
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

const getPostByPostId = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const existingPost = await prisma.post.findFirst({
      where: {
        id: postId,
        OR: [
          {
            status: 'PUBLISHED',
          },
          {
            authorId: userId,
          },
        ],
      },
      include: {
        comments: true,
      },
    });

    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found.',
      });
    }

    res.json({
      success: true,
      message: 'Successfully loaded the post.',
      data: existingPost,
    });
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  const userId = req.user.id;
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

    const { title, content } = matchedData(req);

    const existingPost = await prisma.post.findFirst({
      where: {
        title,
        authorId: userId,
      },
    });

    if (existingPost) {
      return res.status(409).json({
        success: false,
        message: 'You already have a post with this title.',
      });
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Successfully created the post.',
      data: newPost,
    });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  const { postId } = req.params;
  const userId = req.user.id;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const mergedMessage = errors
        .array()
        .map((error) => error.msg)
        .join('--');
      return res.json({
        success: false,
        message: mergedMessage,
      });
    }

    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
        authorId: userId,
      },
    });

    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found.',
      });
    }

    const { title, content } = matchedData(req);
    const filter = {};

    if (existingPost.title !== title) {
      filter.title = title;
    }

    if (existingPost.content !== content) {
      filter.content = content;
    }

    if (Object.keys(filter).length === 0) {
      return res.status(200).json({
        success: true,
        message: 'Title and content are not changed. Post remains unchanged.',
        data: existingPost,
      });
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
        authorId: userId,
      },
      data: filter,
    });

    res.status(200).json({
      success: true,
      message: 'Successfully updated the post.',
      data: updatedPost,
    });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  const { postId } = req.params;
  const userId = req.user.id;
  try {
    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
        authorId: userId,
      },
    });

    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    await prisma.post.delete({
      where: {
        id: postId,
        authorId: userId,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Successfully deleted the post.',
    });
  } catch (error) {
    next(error);
  }
};

const changePostStatus = async (req, res, next) => {
  const { postId } = req.params;
  const userId = req.user.id;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const mergedMessage = errors
        .array()
        .map((error) => error.msg)
        .join('--');
      return res.json({
        success: false,
        message: mergedMessage,
      });
    }

    const { status } = matchedData(req);

    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
        authorId: userId,
      },
    });

    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found.',
      });
    }

    if (existingPost.status === status) {
      return res.status(200).json({
        success: true,
        message: 'Post status is not changed. Post remains unchanged.',
        data: existingPost,
      });
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
        authorId: userId,
      },
      data: {
        status,
      },
    });

    res.json({
      success: true,
      message: `Successfully ${
        status === 'PUBLISHED' ? 'published' : 'hid'
      } the post.`,
      data: updatedPost,
    });
  } catch (error) {
    next(error);
  }
};

const likePost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const existingPost = await prisma.post.findFirst({
      where: {
        id: postId,
        status: 'PUBLISHED',
      },
    });

    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
        status: 'PUBLISHED',
      },
      data: {
        likes: { increment: 1 },
      },
    });

    res.status(200).json({
      success: true,
      message: 'Liked the post.',
      data: updatedPost,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllPosts,
  getPostByPostId,
  createPost,
  updatePost,
  deletePost,
  changePostStatus,
  likePost,
};
