import jwt from 'jsonwebtoken';
import passport from 'passport';

const validateLogInInput = (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'Request body is required.',
      });
    }

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required.',
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

const authenticateUser = (req, res, next) => {
  passport.authenticate('local', { session: false }, (error, user, info) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: 'Authentication error occurred',
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: info?.message || 'Authentication failed',
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

const logIn = async (req, res, next) => {
  try {
    const user = req.user;

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
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

    return res.json({
      success: true,
      message: `Successfully logged in as ${user.username}`,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { logIn, authenticateUser, validateLogInInput };
