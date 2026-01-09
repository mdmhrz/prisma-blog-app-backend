import express, { Router, Request, Response } from 'express';
import { PostController } from './post.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '../../constants/enums/user.role.enum';
const router = express.Router();




router.get(
    '/',
    PostController.getAllPost
)


router.get(
    '/my-posts',
    auth(UserRole.USER, UserRole.ADMIN),
    PostController.getMyPosts
)


router.get(
    '/:id',
    PostController.getPostById
)

router.post(
    '/',
    auth(UserRole.USER, UserRole.ADMIN),
    PostController.createPost
)
export const postRouter: Router = router;