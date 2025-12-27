import { Router } from 'express';
import { verifyAuthor } from '../middlewares/verifyAuthor.js';
import { requireAuth, optionalAuth } from '../middlewares/auth.js';
import {
  postValidation,
  postStatusValidation,
  commentValidation,
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
import { createComment } from '../controllers/comments.js';

const router = Router();

router.get('/', getAllPosts);
router.get('/:postId', optionalAuth, getPostByPostId);

router.post('/', requireAuth, verifyAuthor, postValidation, createPost);
router.patch('/:postId', requireAuth, verifyAuthor, postValidation, updatePost);
router.delete('/:postId', requireAuth, verifyAuthor, deletePost);

router.patch(
  '/:postId/status',
  requireAuth,
  verifyAuthor,
  postStatusValidation,
  changePostStatus
);

router.post('/:postId/like', requireAuth, likePost);

router.post('/:postId/comments', requireAuth, commentValidation, createComment);

export { router as postsRouter };
