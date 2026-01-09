import { Request, Response } from "express";
import { PostService } from "./post.service";
import { PostStatus } from "../../../generated/prisma/enums";
import paginationSortinghelper from "../../helpers/parigationSortingHelper";


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
        //tags search params
        const tags = req.query.tags ? (req.query.tags as string).split(',') : [];

        //is featured search params
        const isFeatured = req.query.isFeatured
            ? req.query.isFeatured === 'true'
                ? true
                : req.query.isFeatured === 'false' ? false : undefined
            : undefined;

        //status search params
        const status = req.query.status && typeof req.query.status === 'string' && Object.values(PostStatus).includes(req.query.status as PostStatus) ? req.query.status as PostStatus : undefined

        // authorId search params
        const authorId = req.query.authorId ? (req.query.authorId as string) : undefined;

        //descturing data form pagination helper funciton
        const { page, limit, skip, sortBy, sortOrder } = paginationSortinghelper(req.query)

        //FINAL OUTPUT
        const result = await PostService.getAllPost({
            search: search as string || '',
            tags,
            isFeatured,
            status,
            authorId,
            page,
            limit,
            skip,
            sortBy,
            sortOrder
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({
            message: 'Post data fetch failed',
            error: error instanceof Error ? error.message : String(error)
        });
    }
}


const getPostById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await PostService.getPostById(id as string)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Post data fetch failed',
            error: error instanceof Error ? error.message : String(error)
        });
    }
}

const getMyPosts = async (req: Request, res: Response) => {
    try {
        const user = req.user
        console.log('user from getMyPost', user);
        if (!user) {
            throw new Error("User informaiton in required")
        }


        const result = await PostService.getMyPosts(user.id as string)
        res.status(200).json(result)
    } catch (error) {
        console.log(error, 'error dekho');
        res.status(500).json({
            message: 'My post data fetch failed',
            error: error instanceof Error ? error.message : String(error)
        });
    }
}


export const PostController = {
    createPost,
    getAllPost,
    getPostById,
    getMyPosts
};