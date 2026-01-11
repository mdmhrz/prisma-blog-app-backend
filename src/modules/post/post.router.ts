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
    '/stats',
    auth(UserRole.ADMIN),
    PostController.getStats
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

router.patch(
    '/:postId',
    auth(UserRole.ADMIN, UserRole.USER),
    PostController.updatePost
);

router.delete(
    '/:postId',
    auth(UserRole.ADMIN, UserRole.USER),
    PostController.deletePost
)



export const postRouter: Router = router;