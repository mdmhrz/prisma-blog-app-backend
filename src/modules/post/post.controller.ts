import { Request, Response } from "express";
import { PostService } from "./post.service";


const createPost = async (req: Request, res: Response) => {
    console.log('req from controller', req.body);
    try {
        const result = await PostService.createPost(req.body)
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


export const PostController = {
    createPost
};