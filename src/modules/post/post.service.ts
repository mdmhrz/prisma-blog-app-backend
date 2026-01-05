import { Post, PostStatus } from "../../../generated/prisma/client";
import { SortOrder } from "../../../generated/prisma/internal/prismaNamespace";
import { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

const createPost = async (
    data: Omit<Post, "id" | "createdAt" | "updatedAt" | "authorId">,
    id: string
) => {
    const result = await prisma.post.create({
        data: {
            ...data,
            authorId: id,
        },
    });

    return result;
};

const getAllPost = async (
    payload: {
        search: string | undefined;
        tags: string[] | [];
        isFeatured: boolean | undefined;
        status: PostStatus | undefined;
        authorId: string | undefined;
        page: number;
        limit: number;
        skip: number;
        sortBy: string;
        sortOrder: string;
    }
) => {
    const {
        search,
        tags,
        isFeatured,
        status,
        authorId,
        page,
        limit,
        skip,
        sortBy,
        sortOrder,
    } = payload;

    const whereConditions: PostWhereInput[] = [];

    if (search) {
        whereConditions.push({
            OR: [
                {
                    title: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    content: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    tags: {
                        has: search,
                    },
                },
            ],
        });
    }

    if (tags && tags.length > 0) {
        whereConditions.push({
            tags: {
                hasEvery: tags,
            },
        });
    }

    if (typeof isFeatured === "boolean") {
        whereConditions.push({
            ifFeatured: isFeatured,
        });
    }

    if (status) {
        whereConditions.push({
            status: status,
        });
    }

    if (authorId) {
        whereConditions.push({
            authorId: authorId,
        });
    }

    const allPost = await prisma.post.findMany({
        take: limit,
        skip: skip,
        where: whereConditions.length > 0 ? { AND: whereConditions } : {},
        orderBy: { [sortBy]: sortOrder },
    });

    return allPost;
};

export const PostService = {
    createPost,
    getAllPost,
};
