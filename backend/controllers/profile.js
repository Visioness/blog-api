import { prisma } from '../lib/prisma.js';
import jwt from 'jsonwebtoken';

const getProfileByUsername = async (req, res, next) => {
  const { username } = req.params;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    res.json({
      success: true,
      message: 'Successfully loaded the profile.',
      data: {
        username: existingUser.username,
        role: existingUser.role,
        createdAt: existingUser.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getProfilePosts = async (req, res, next) => {
  const currentUser = req.user;
  const { username } = req.params;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    const posts = await prisma.post.findMany({
      where: {
        author: {
          username,
        },
        status: username !== currentUser?.username ? 'PUBLISHED' : undefined,
      },
    });

    res.json({
      success: true,
      message: 'Successfully loaded the user posts.',
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

const getProfileComments = async (req, res, next) => {
  const { username } = req.params;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    const comments = await prisma.comment.findMany({
      where: {
        author: {
          username,
        },
      },
    });

    res.json({
      success: true,
      message: 'Successfully loaded the user comments.',
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

const upgradeRole = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    if (existingUser.role === 'AUTHOR') {
      return res.status(200).json({
        success: true,
        message: 'User already has Author role.',
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: 'AUTHOR',
      },
    });

    const token = jwt.sign(
      {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '1h',
      }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: 'Successfully upgraded the user role to Author.',
      data: {
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
        createdAt: updatedUser.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export {
  getProfileByUsername,
  getProfilePosts,
  getProfileComments,
  upgradeRole,
};
