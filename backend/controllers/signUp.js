import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
import { validationResult, matchedData } from 'express-validator';
import bcrypt from 'bcryptjs';

const signUp = async (req, res, next) => {
  let newUser = null;
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

    const { username, email, password } = matchedData(req);

    const existingUsername = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: 'This username is already taken.',
      });
    }

    const existingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: 'This e-mail is already taken.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '1h',
      }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: `Succesfully signed up as ${newUser.username}`,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    if (newUser) {
      await prisma.user.delete({
        where: {
          id: newUser.id,
        },
      });
    }
    next(error);
  }
};

export { signUp };
