import { Router } from 'express';
import {
  getProfile,
  getProfileByUsername,
  upgradeRole,
} from '../controllers/profile.js';

const router = Router();

router.get('/', getProfile);
router.get('/users/:username', getProfileByUsername);

router.patch('/role', upgradeRole);

export { router as profileRouter };
