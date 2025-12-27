import { Router } from 'express';
import {
  getProfileByUsername,
  getProfilePosts,
  getProfileComments,
  upgradeRole,
} from '../controllers/profile.js';

const router = Router();

router.get('/:username', getProfileByUsername);
router.get('/:username/posts', getProfilePosts);
router.get('/:username/comments', getProfileComments);

router.patch('/role', upgradeRole);

export { router as profileRouter };
