import express, { Router } from 'express';
import { CommentController } from './comment.controller';

import { UserRole } from '../../constants/enums/user.role.enum';
import auth from '../../middlewares/auth';


const router = express.Router();


router.get('/:commentId', CommentController.getCommentbyId);
router.get("/author/:authorId", CommentController.getCommentsbyAuthor)
router.post('/', auth(UserRole.ADMIN, UserRole.USER), CommentController.createPost)

router.patch('/:commentId', auth(UserRole.ADMIN, UserRole.USER), CommentController.updateCommentbyId)
router.patch("/:commentId/moderate", auth(UserRole.ADMIN), CommentController.moderateComment)
router.delete('/:commentId', auth(UserRole.USER, UserRole.ADMIN), CommentController.deleteCommentbyId)



export const commentRouter: Router = router;