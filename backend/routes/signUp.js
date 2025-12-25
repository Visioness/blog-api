import { Router } from 'express';
import { signUp } from '../controllers/signUp.js';
import { userValidation } from '../middlewares/validations.js';

const router = Router();

router.post('/', userValidation, signUp);

export { router as signUpRouter };
