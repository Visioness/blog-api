import { Router } from 'express';
import {
  logIn,
  authenticateUser,
  validateLogInInput,
} from '../controllers/logIn.js';

const router = Router();

router.post('/', validateLogInInput, authenticateUser, logIn);

export { router as logInRouter };
