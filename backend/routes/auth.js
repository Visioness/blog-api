import { Router } from 'express';
import { optionalAuth } from '../middlewares/auth.js';
import { getMe } from '../controllers/auth.js';

const router = Router();

router.get('/me', optionalAuth, getMe);

export { router as authRouter };
