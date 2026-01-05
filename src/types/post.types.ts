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
