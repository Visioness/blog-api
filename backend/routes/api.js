import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { signUpRouter } from './signUp.js';
import { logInRouter } from './logIn.js';
import { profileRouter } from './profile.js';
import { logOutRouter } from './logOut.js';
import { postsRouter } from './posts.js';
import { commentsRouter } from './comments.js';

const router = Router();

router.use('/sign-up', signUpRouter);
router.use('/log-in', logInRouter);
router.use('/log-out', requireAuth, logOutRouter);

router.use('/profile', profileRouter);

router.use('/posts', postsRouter);
router.use('/comments', requireAuth, commentsRouter);

export { router };
