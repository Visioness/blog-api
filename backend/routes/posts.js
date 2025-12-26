import { Router } from 'express';
import { verifyRole } from '../middlewares/verifyRole.js';
import {
  postValidation,
  postStatusValidation,
} from '../middlewares/validations.js';
import {
  getAllPosts,
  getPostByPostId,
  createPost,
  updatePost,
  deletePost,
  changePostStatus,
  likePost,
} from '../controllers/posts.js';

const router = Router();

router.get('/', getAllPosts);
router.get('/:postId', getPostByPostId);

router.post('/', verifyRole, postValidation, createPost);
router.patch('/:postId', verifyRole, postValidation, updatePost);
router.delete('/:postId', verifyRole, deletePost);

router.patch(
  '/:postId/status',
  verifyRole,
  postStatusValidation,
  changePostStatus
);

router.post('/:postId/like', likePost);

export { router as postsRouter };
