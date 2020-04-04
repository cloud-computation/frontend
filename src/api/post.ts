import {transport} from "../service";
import {ICreatePost, IPost} from "../entity";

export function fetchList() {
    return transport.get<IPost[]>("/post");
}

export function fetchOne(id: number) {
    return transport.get<IPost>(`/post/${id}`);
}

export function createPost(data: ICreatePost) {
    return transport.post<FormData, {id: number}>("/post", transport.formatToFormData(data));
}

export function editPost(id: number, data: Partial<IPost>) {
    return transport.put<FormData, undefined>(`/post/${id}`, transport.formatToFormData(data));
}

export function deletePost(id: number) {
    return transport.delete<undefined>(`/post/${id}`);
}
