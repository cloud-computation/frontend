import { Dispatch, SetStateAction } from "react";

export interface IUser {
    id: number;
    login: string;
    email: string;
    avatar?: string;
}

export interface IUserContext {
    user: IUser | undefined;
    setUser: Dispatch<SetStateAction<IUser | undefined>>;
}

export interface IUpdateAvatar {
    avatar: File;
}
