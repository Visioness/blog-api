import { Router } from 'express';
import { commentValidation } from '../middlewares/validations.js';
import { updateComment, deleteComment } from '../controllers/comments.js';

const router = Router();

router.patch('/:commentId', commentValidation, updateComment);
router.delete('/:commentId', deleteComment);

export { router as commentsRouter };
