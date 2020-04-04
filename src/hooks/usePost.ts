import { ICreatePost, IPost, TResponse } from "../entity";
import { useCallback, useState } from "react";
import { PostAPI } from "../api";

export function usePost(): {
    posts: IPost[];
    post: IPost | undefined;
    getPostList: () => Promise<void>;
    getPost: (id: number) => Promise<void>;
    createPost: (data: ICreatePost) => Promise<TResponse<{ id: number }>>;
    editPost: (id: number, data: Partial<IPost>) => Promise<void>;
    deletePost: (id: number) => Promise<TResponse<undefined>>;
} {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [post, setPost] = useState<IPost | undefined>(undefined);

    const getPostList = useCallback(() => {
        return PostAPI.fetchList().then((response) => setPosts(response.data));
    }, []);

    const getPost = useCallback((id: number) => {
        return PostAPI.fetchOne(id).then((response) => setPost(response.data));
    }, []);

    const createPost = useCallback((data: ICreatePost) => {
        return PostAPI.createPost(data);
    }, []);

    const editPost = useCallback((id: number, data: Partial<IPost>) => {
        return PostAPI.editPost(id, data).then(() => getPost(id));
    }, []);

    const deletePost = useCallback((id: number) => {
        return PostAPI.deletePost(id);
    }, []);

    return { posts, post, createPost, deletePost, editPost, getPost, getPostList };
}
