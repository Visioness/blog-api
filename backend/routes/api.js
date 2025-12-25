import { Router } from 'express';
import { verifyJWT } from '../middlewares/verifyJWT.js';
import { signUpRouter } from './signUp.js';
import { logInRouter } from './logIn.js';
import { logOutRouter } from './logOut.js';

const router = Router();

router.use('/sign-up', signUpRouter);
router.use('/log-in', logInRouter);
router.use('/log-out', logOutRouter);

export { router };
