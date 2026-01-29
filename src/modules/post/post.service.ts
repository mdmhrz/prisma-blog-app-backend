
import { Post } from "../../../generated/prisma/client";
import { CommentStatus, PostStatus } from "../../../generated/prisma/enums";
import { PostWhereInput } from "../../../generated/prisma/models";
import { UserRole } from "../../constants/enums/user.role.enum";
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
        include: {
            _count: {
                select: {
                    comments: true
                }
            }
        }
    });

    const total = await prisma.post.count({
        where: { AND: whereConditions }
    })

    return {
        data: allPost,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };
};


const getPostById = async (id: string) => {
    return await prisma.$transaction(async (tx) => {

        // Check if post exists
        const postExists = await tx.post.findUnique({
            where: { id }
        });

        if (!postExists) {
            throw new Error('Post not found');
        }

        // Update view count
        await tx.post.update({
            where: { id },
            data: {
                views: { increment: 1 }
            }
        });

        // Fetch full post
        const postData = await tx.post.findUnique({
            where: { id },
            include: {
                comments: {
                    where: {
                        parentId: null,
                        status: CommentStatus.APPROVED
                    },
                    orderBy: { createdAt: 'asc' },
                    include: {
                        replies: {
                            where: { status: CommentStatus.APPROVED },
                            orderBy: { createdAt: 'asc' },
                            include: {
                                replies: {
                                    where: { status: CommentStatus.APPROVED }
                                }
                            }
                        }
                    }
                },
                _count: {
                    select: { comments: true }
                }
            }
        });

        return postData;
    });
};


const getMyPosts = async (authorId: string) => {
    const userInfo = await prisma.user.findUnique({
        where: {
            id: authorId,
            status: "ACTIVE"
        }

    })

    if (!userInfo) {
        throw new Error("You are not an active user")
    }



    const result = await prisma.post.findMany({
        where: {
            authorId
        },
        orderBy: { createdAt: 'desc' },
        include: {
            _count: {
                select: {
                    comments: true
                }
            }
        }
    })

    // method 1 to get cont
    // const total = await prisma.post.count({
    //     where: {
    //         authorId
    //     }
    // })

    // method 2 to get count
    const total = await prisma.post.aggregate({
        _count: {
            id: true
        },
        where: {
            authorId
        }
    })


    return {
        data: result,
        total
    }
}


const updatePost = async (
    postId: string,
    data: Partial<Post>,
    authorId: string,
    isAdmin: boolean
) => {

    const postData = await prisma.post.findUnique({
        where: {
            id: postId
        },
        select: {
            id: true,
            authorId: true
        }
    })


    if (!isAdmin && (postData?.authorId !== authorId)) {
        throw new Error("You are not allowed to update this post")
    }

    if (!isAdmin) {
        delete data.ifFeatured
    }

    if (!postData) {
        throw new Error("Post Data not found")
    }

    const result = await prisma.post.update({
        where: {
            id: postData.id
        },
        data
    })

    return result
};


const deletePost = async (postId: string, authorId: string, isAdmin: boolean) => {
    const postData = await prisma.post.findUnique({
        where: {
            id: postId
        },
        select: {
            id: true,
            authorId: true
        }
    });

    if (!postData) {
        throw new Error("Post not found")
    }

    if (!isAdmin && (postData?.authorId !== authorId)) {
        throw new Error("You are not allowed to update this post")
    }

    return await prisma.post.delete({
        where: {
            id: postId
        }
    })

};


const getStats = async () => {
    //post count
    //total published post
    // draft post
    //total comments
    //total views

    return await prisma.$transaction(async (tx) => {

        return await prisma.$transaction(async (tx) => {
            const [
                totalPosts,
                publishedPosts,
                draftPosts,
                archivedPosts,
                totalComments,
                approvedComments,
                rejectedStatus,
                totalUsers,
                adminCount,
                userCount,
                totalViews
            ] = await Promise.all([

                await tx.post.count(),
                await tx.post.count({
                    where: {
                        status: PostStatus.PUBLISHED
                    }
                }),
                await tx.post.count({
                    where: {
                        status: PostStatus.DRAFT
                    }
                }),
                await tx.post.count({
                    where: {
                        status: PostStatus.ARCHIVED
                    }
                }),
                await tx.comment.count(),
                await tx.comment.count({
                    where: {
                        status: CommentStatus.APPROVED
                    }
                }),
                await tx.comment.count({
                    where: {
                        status: CommentStatus.REJECTED
                    }
                }),
                await tx.user.count(),
                await tx.user.count({
                    where: {
                        role: UserRole.ADMIN
                    }
                }),
                await tx.user.count({
                    where: {
                        role: UserRole.USER
                    }
                }),
                await tx.post.aggregate({
                    _sum: {
                        views: true
                    }
                })

            ])

            return {
                totalPosts,
                publishedPosts,
                draftPosts,
                archivedPosts,
                totalComments,
                approvedComments,
                rejectedStatus,
                totalUsers,
                adminCount,
                userCount,
                totalViews: totalViews._sum.views

            }

        })




    })
}

export const PostService = {
    createPost,
    getAllPost,
    getPostById,
    getMyPosts,
    updatePost,
    deletePost,
    getStats
};
