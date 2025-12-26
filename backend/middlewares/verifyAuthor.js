const verifyAuthor = (req, res, next) => {
  const { role } = req.user;

  if (role === 'READER') {
    return res.status(403).json({
      success: false,
      message: 'You must have the Author role to access this feature.',
    });
  }

  next();
};

export { verifyAuthor };
