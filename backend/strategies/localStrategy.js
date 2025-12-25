import { Strategy } from 'passport-local';
import { prisma } from '../lib/prisma.js';
import bcrypt from 'bcryptjs';

const localStrategy = new Strategy(async (username, password, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return done(null, false, { message: 'User not found!' });
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return done(null, false, { message: 'Incorrect password!' });
    }

    return done(null, user);
  } catch (error) {
    done(error);
  }
});

export { localStrategy };
