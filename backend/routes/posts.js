import { Router } from 'express';
import { verifyAuthor } from '../middlewares/verifyAuthor.js';
import { verifyJWT } from '../middlewares/verifyJWT.js';
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

router.post('/', verifyJWT, verifyAuthor, postValidation, createPost);
router.patch('/:postId', verifyJWT, verifyAuthor, postValidation, updatePost);
router.delete('/:postId', verifyJWT, verifyAuthor, deletePost);

router.patch(
  '/:postId/status',
  verifyJWT,
  verifyAuthor,
  postStatusValidation,
  changePostStatus
);

router.post('/:postId/like', verifyJWT, likePost);

router.get('/:postId/comments', getPostComments);
router.post('/:postId/comments', verifyJWT, commentValidation, createComment);

export { router as postsRouter };
