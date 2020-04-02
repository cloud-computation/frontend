import {IResponseMessage, ISignInData, ISignUpData, IUser, TResponse} from "../entity";
import { useCallback } from "react";
import { AuthAPI } from "../api";

export function useAuth(): {
    signIn: (data: ISignInData) => Promise<TResponse<{token: string}>>;
    signUp: (data: ISignInData) => Promise<TResponse<IResponseMessage>>;
    forgotPassword: (data: { email: string }) => Promise<TResponse<IResponseMessage>>;
    login: () => Promise<TResponse<IUser>>;
} {
    const signIn = useCallback((data: ISignInData) => {
        return AuthAPI.signIn(data);
    }, []);

    const signUp = useCallback((data: ISignUpData) => {
        return AuthAPI.signUp(data);
    }, []);

    const forgotPassword = useCallback((data: { email: string }) => {
        return AuthAPI.forgotPassword(data);
    }, []);

    const login = useCallback(() => {
        return AuthAPI.login();
    }, []);

    return { signIn, forgotPassword, signUp, login };
}
