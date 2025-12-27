import jwt from 'jsonwebtoken';

const verifyToken = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return null;
  }
};

const requireAuth = (req, res, next) => {
  const token = req.cookies.token;
  const user = verifyToken(token);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required.',
    });
  }

  req.user = user;
  next();
};

const optionalAuth = (req, res, next) => {
  const token = req.cookies.token;
  req.user = verifyToken(token);
  next();
};

export { requireAuth, optionalAuth };
