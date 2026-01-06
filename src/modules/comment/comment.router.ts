import express, { Router } from 'express';
import { CommentController } from './comment.controller';

import { UserRole } from '../../constants/enums/user.role.enum';
import auth from '../../middlewares/auth';


const router = express.Router();

router.post('/', auth(UserRole.ADMIN, UserRole.USER), CommentController.createPost)




export const commentRouter: Router = router;