import { CommentStatus } from "../../../generated/prisma/enums";
import { UserRole } from "../../constants/enums/user.role.enum";
import { prisma } from "../../lib/prisma";

const createComment = async (payload: {
    content: string;
    authorId: string;
    postId: string;
    parentId?: string;

}) => {
    // console.log('create comment server', payload);

    // check if post exist or not
    await prisma.post.findUniqueOrThrow({
        where: {
            id: payload.postId
        }
    })

    if (payload.parentId) {
        await prisma.comment.findUniqueOrThrow({
            where: {
                id: payload.parentId
            }
        })
    }



    return await prisma.comment.create({
        data: payload
    })
}


//get comment by id
const getCommentById = async (id: string) => {
    return await prisma.comment.findUnique({
        where: {
            id
        },
        include: {
            post: {
                select: {
                    id: true,
                    title: true,
                    views: true
                }
            }
        }
    })
}


// getCommentsbyAuthor

const getCommentsbyAuthor = async (authorId: string) => {
    return await prisma.comment.findMany({
        where: {
            authorId
        },
        orderBy: { createdAt: 'desc' },
        include: {
            post: {
                select: {
                    id: true,
                    title: true,
                    views: true
                }
            }
        }
    })
}

// update comment by id
const updateCommentById = async (
    commentId: string,
    data: {
        content?: string,
        status?: CommentStatus
    },
    role: string,
    authorId: string) => {

    //first check is comment exist or not
    const commentData = await prisma.comment.findFirst({
        where: {
            id: commentId,
            authorId
        }
    })

    if (!commentData) {
        throw new Error("Your provided info is invalid")
    }

    //secondly check is this admin or user
    const hasPermission = commentData.authorId === authorId || role === UserRole.ADMIN

    if (!hasPermission) {
        throw new Error("You don't have the permission to delete")
    }

    return await prisma.comment.update({
        where: {
            id: commentId
        },
        data
    })


}





//delete comment by id
const deleteCommentbyId = async (commentId: string, userId: string, role: string) => {

    //first check is comment exist or not
    const commentData = await prisma.comment.findFirst({
        where: {
            id: commentId,
            authorId: userId
        }
    })

    if (!commentData) {
        throw new Error("Your provided info is invalid")
    }

    //secondly check is this admin or user
    const hasPermission = commentData.authorId === userId || role === UserRole.ADMIN

    if (!hasPermission) {
        throw new Error("You don't have the permission to delete")
    }

    return await prisma.comment.delete({
        where: {
            id: commentId
        }
    })
}


export const commentService = {
    createComment, getCommentById, getCommentsbyAuthor, deleteCommentbyId, updateCommentById
}