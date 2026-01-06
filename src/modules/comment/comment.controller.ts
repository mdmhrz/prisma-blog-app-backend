import { Request, Response } from "express";
import { commentService } from "./comment.service";

const createPost = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        req.body.authorId = user?.id;



        const result = await commentService.createComment(req.body)
        return res.status(201).json({
            message: 'Comment created successfully',
            data: result
        });
    } catch (error) {
        res.status(400).json({
            message: 'Comment creation failed',
            error: error instanceof Error ? error.message : String(error)
        });
    }
}

export const CommentController = {
    createPost
}
