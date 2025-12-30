const getMe = async (req, res, next) => {
  const user = req.user;
  try {
    if (!user) {
      return res.status(200).json({
        success: true,
        message: 'User is not authenticated.',
        user: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User is authenticated.',
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

export { getMe };
