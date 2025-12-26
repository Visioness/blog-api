import { Router } from 'express';
import { verifyAuthor } from '../middlewares/verifyAuthor.js';
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

router.post('/', verifyAuthor, postValidation, createPost);
router.patch('/:postId', verifyAuthor, postValidation, updatePost);
router.delete('/:postId', verifyAuthor, deletePost);

router.patch(
  '/:postId/status',
  verifyAuthor,
  postStatusValidation,
  changePostStatus
);

router.post('/:postId/like', likePost);

export { router as postsRouter };
