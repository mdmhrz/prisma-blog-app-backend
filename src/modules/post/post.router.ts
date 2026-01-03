import express, { Router, Request, Response } from 'express';
import { PostController } from './post.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '../../constants/enums/user.role.enum';
const router = express.Router();


router.post('/', auth(UserRole.USER), PostController.createPost);
router.get('/', PostController.getAllPost )

export const postRouter: Router = router;