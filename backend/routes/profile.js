import { Router } from 'express';
import { verifyJWT } from '../middlewares/verifyJWT.js';
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

router.patch('/role', verifyJWT, upgradeRole);

export { router as profileRouter };
