import { Router } from 'express';
import { verifyJWT } from '../middlewares/verifyJWT.js';
import { signUpRouter } from './signUp.js';
import { logInRouter } from './logIn.js';
import { logOutRouter } from './logOut.js';
import { postsRouter } from './posts.js';

const router = Router();

router.use('/sign-up', signUpRouter);
router.use('/log-in', logInRouter);
router.use('/log-out', verifyJWT, logOutRouter);

router.use('/posts', verifyJWT, postsRouter);

export { router };
