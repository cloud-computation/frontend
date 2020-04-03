import {IChangePassword, IUpdateAvatar, IUser, TResponse} from "../entity";
import {useCallback, useState} from "react";
import { UserAPI } from "../api";

export function useUser(): {
    user: IUser | undefined;
    getUser: () => Promise<void>;
    updateUser: (user: Partial<IUser>) => Promise<TResponse<IUser>>;
    uploadAvatar: (data: IUpdateAvatar) => Promise<TResponse<IUser>>;
    deleteAvatar: () => Promise<TResponse<IUser>>;
    changePassword: (data: IChangePassword) => Promise<TResponse<undefined>>;
} {
    const [user, setUser] = useState<IUser | undefined>(undefined);

    const getUser = useCallback(() => {
        return UserAPI.getUser().then((response) => setUser(response.data));
    }, []);

    const updateUser = useCallback((user: Partial<IUser>) => {
        return UserAPI.editUser(user);
    }, []);

    const uploadAvatar = useCallback((data: IUpdateAvatar) => {
        return UserAPI.uploadAvatar(data);
    }, []);

    const deleteAvatar = useCallback(() => {
        return UserAPI.deleteAvatar();
    }, []);

    const changePassword = useCallback((data: IChangePassword) => {
        return UserAPI.changePassword(data);
    }, []);

    return { user, deleteAvatar, getUser, updateUser, uploadAvatar, changePassword };
}