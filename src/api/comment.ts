import {transport} from "../service";
import {IComment, TCreateComment} from "../entity";

export function getList(postId: number) {
    return transport.get<IComment[]>(`/comment/${postId}/list`);
}

export function createComment(data: TCreateComment) {
    return transport.post<TCreateComment, undefined>("/comment", data);
}

export function editComment(id: number, data: Partial<IComment>) {
    return transport.put<Partial<IComment>, undefined>(`/comment/${id}`, data);
}

export function deleteComment(id: number) {
    return transport.delete<undefined>(`/comment/${id}`);
}
