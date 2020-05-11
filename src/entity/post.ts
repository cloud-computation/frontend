export interface IPost {
    id?: number;
    authorId: number;
    title: string;
    text: string;
    background: string;
    views: number;
    createdAt: string;
    updatedAt: string;
}

export interface ICreatePost {
    title: string;
    text: string;
    file: File;
}

export interface IUpdatePostBackground {
    file: File;
}
