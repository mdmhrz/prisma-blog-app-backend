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

const getCommentbyId = async (req: Request, res: Response) => {
    try {
        const { commentId } = req.params

        const result = await commentService.getCommentById(commentId as string)
        return res.status(200).json({
            message: 'Comment retrived successfully',
            data: result
        });
    } catch (error) {
        res.status(400).json({
            message: 'Comment retrive failed',
            error: error instanceof Error ? error.message : String(error)
        });
    }
}


//get commnets by authorID

const getCommentsbyAuthor = async (req: Request, res: Response) => {
    try {
        const { authorId } = req.params

        const result = await commentService.getCommentsbyAuthor(authorId as string)
        return res.status(200).json({
            message: 'Comment retrived successfully',
            data: result
        });
    } catch (error) {
        res.status(400).json({
            message: 'Comment retrive failed',
            error: error instanceof Error ? error.message : String(error)
        });
    }
}



//update comment by comment id
const updateCommentbyId = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                message: 'User not authenticated'
            });
        }
        const { id, role } = user;

        const { commentId } = req.params

        const result = await commentService.updateCommentById(
            commentId as string,
            req.body,
            role as string,
            id
        )

        return res.status(200).json({
            message: 'Comment update successfully',
            data: result
        });
    } catch (error) {
        res.status(400).json({
            message: 'Comment update failed',
            error: error instanceof Error ? error.message : String(error)
        });
    }
}


//delete comment by id

const deleteCommentbyId = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                message: 'User not authenticated'
            });
        }
        const { id, role } = user;

        const { commentId } = req.params

        const result = await commentService.deleteCommentbyId(commentId as string, id as string, role as string)
        return res.status(200).json({
            message: 'Comment deleted successfully',
            data: result
        });
    } catch (error) {
        res.status(400).json({
            message: 'Comment delete failed',
            error: error instanceof Error ? error.message : String(error)
        });
    }
}




export const CommentController = {
    createPost, getCommentbyId, getCommentsbyAuthor, deleteCommentbyId, updateCommentbyId
}
