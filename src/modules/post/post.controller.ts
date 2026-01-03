import { Request, Response } from "express";
import { PostService } from "./post.service";


const createPost = async (req: Request, res: Response) => {
    console.log('req from controller', req.user);
    try {
        const user = req.user
        if (!user) {
            return res.status(400).json({
                error: 'Unauthorized'
            });
        }

        const result = await PostService.createPost(req.body, user.id as string)
        return res.status(201).json({
            message: 'Post created successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: 'Post creation failed',
            error: error instanceof Error ? error.message : String(error)
        });
    }
}


const getAllPost = async (req: Request, res: Response) => {
    try {
        const { search } = req.query
        console.log(search);

        const result = await PostService.getAllPost({ search: search as string || '' })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({
            message: 'Post creation failed',
            error: error instanceof Error ? error.message : String(error)
        });
    }
}


export const PostController = {
    createPost, getAllPost
};