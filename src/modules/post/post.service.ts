import { Post } from "../../../generated/prisma/client";
import { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

const createPost = async (data: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'authorId'>, id: string) => {

    // console.log(data);
    const result = await prisma.post.create({
        data: {
            ...data,
            authorId: id
        }
    })

    return result;
}

const getAllPost = async (
    payload: {
        search: string | undefined,
        tags: string[] | []
    }) => {

    // console.log('get all post');
    const whereConditions: PostWhereInput[] = [];

    if (payload.search) {
        whereConditions.push({
            OR: [
                {
                    title: {
                        contains: payload.search,
                        mode: 'insensitive'
                    }
                },
                {
                    content: {
                        contains: payload.search,
                        mode: 'insensitive'
                    }
                },
                {
                    tags: {
                        has: payload.search
                    }
                }
            ]
        });
    }

    if (payload.tags && payload.tags.length > 0) {
        whereConditions.push({
            tags: {
                hasEvery: payload.tags
            }
        });
    }

    const allPost = await prisma.post.findMany({
        where: whereConditions.length > 0
            ? { AND: whereConditions }
            : {}
    });
    return allPost;
}


export const PostService = {
    createPost, getAllPost
};