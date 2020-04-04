import { IComment, TCreateComment } from "../entity";
import {useCallback, useEffect, useState} from "react";
import { CommentAPI } from "../api";

export function useComment(
    postId: number,
): {
    comments: IComment[];
    createComment: (data: TCreateComment) => Promise<void>;
    editComment: (id: number, data: Partial<IComment>) => Promise<void>;
    deleteComment: (id: number) => Promise<void>;
} {
    const [comments, setComments] = useState<IComment[]>([]);

    const getComments = useCallback(() => {
        return CommentAPI.getList(postId).then((response) => setComments(response.data));
    }, []);

    const createComment = useCallback((data: TCreateComment) => {
        return CommentAPI.createComment(data).then(getComments);
    }, []);

    const editComment = useCallback((id: number, data: Partial<IComment>) => {
        return CommentAPI.editComment(id, data).then(getComments);
    }, []);

    const deleteComment = useCallback((id: number) => {
        return CommentAPI.deleteComment(id).then(getComments);
    }, []);

    useEffect(() => {
        getComments();
    }, []);

    return { comments, createComment, deleteComment, editComment };
}
