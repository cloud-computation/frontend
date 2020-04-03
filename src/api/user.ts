import {IChangePassword, IUpdateAvatar, IUser} from "../entity";
import {transport} from "../service";

export function getUser() {
    return transport.get<IUser>("/user");
}

export function editUser(user: Partial<IUser>) {
    return transport.put<Partial<IUser>, IUser>("/user", user);
}

export function uploadAvatar(data: IUpdateAvatar) {
    return transport.put<FormData, IUser>("/user/avatar", transport.formatToFormData(data));
}

export function deleteAvatar() {
    return transport.delete<IUser>("/user/avatar")
}

export function changePassword(data: IChangePassword) {
    return transport.put<IChangePassword, undefined>("/user/password", data);
}
