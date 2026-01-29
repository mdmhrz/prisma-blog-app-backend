import { PostStatus } from "../../generated/prisma/enums";

export type GetAllPostPayload = {
    search?: string;
    tags: string[];
    isFeatured?: boolean;
    status?: PostStatus;
    authorId?: string;
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
};


export type Post = {
    id: string;
    title: string;
    content: string;
    thumbnail: string | null;
    ifFeatured: boolean;
    status: PostStatus;
    tags: string[];
    views: number;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
}
