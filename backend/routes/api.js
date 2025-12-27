import { Router } from 'express';
import { verifyJWT } from '../middlewares/verifyJWT.js';
import { signUpRouter } from './signUp.js';
import { logInRouter } from './logIn.js';
import { profileRouter } from './profile.js';
import { logOutRouter } from './logOut.js';
import { postsRouter } from './posts.js';
import { commentsRouter } from './comments.js';

const router = Router();

router.use('/sign-up', signUpRouter);
router.use('/log-in', logInRouter);
router.use('/log-out', verifyJWT, logOutRouter);

router.use('/profile', verifyJWT, profileRouter);

router.use('/posts', verifyJWT, postsRouter);
router.use('/comments', verifyJWT, commentsRouter);

export { router };
