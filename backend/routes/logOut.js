import { Router } from 'express';
import { verifyJWT } from '../middlewares/verifyJWT.js';

const router = Router();

router.post('/', verifyJWT, (req, res, next) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });

    res.json({
      success: true,
      message: 'Successfully logged out.',
    });
  } catch (error) {
    next(error);
  }
});

export { router as logOutRouter };
