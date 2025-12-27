import { Router } from 'express';
import { requireAuth, optionalAuth } from '../middlewares/auth.js';
import {
  getProfileByUsername,
  getProfilePosts,
  getProfileComments,
  upgradeRole,
} from '../controllers/profile.js';

const router = Router();

router.get('/:username', getProfileByUsername);
router.get('/:username/posts', optionalAuth, getProfilePosts);
router.get('/:username/comments', getProfileComments);

router.patch('/role', requireAuth, upgradeRole);

export { router as profileRouter };
