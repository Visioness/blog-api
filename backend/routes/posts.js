import { Router } from 'express';
import { verifyAuthor } from '../middlewares/verifyAuthor.js';
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
import { getPostComments, createComment } from '../controllers/comments.js';

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

router.get('/:postId/comments', getPostComments);
router.post('/:postId/comments', commentValidation, createComment);

export { router as postsRouter };
