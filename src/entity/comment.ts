export interface IComment {
    id?: number;
    postId: number;
    parentId: number;
    authorId: number;
    text: string;
    login: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
}

export type TCreateComment = Pick<IComment, "postId" | "authorId" | "text">;
