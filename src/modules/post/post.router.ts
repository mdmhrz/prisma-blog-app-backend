import express, { Router, Request, Response } from 'express';
import { PostController } from './post.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '../../constants/enums/user.role.enum';
const router = express.Router();


router.post('/', auth(UserRole.USER), PostController.createPost);
router.get('/', PostController.getAllPost)
router.get('/:id', PostController.getPostById)

export const postRouter: Router = router;