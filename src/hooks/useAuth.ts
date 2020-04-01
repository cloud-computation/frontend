import { IResponseMessage, ISignInData, ISignUpData, TResponse } from "../entity";
import { useCallback } from "react";
import { AuthAPI } from "../api";

export function useAuth(): {
    signIn: (data: ISignInData) => Promise<TResponse<IResponseMessage>>;
    signUp: (data: ISignInData) => Promise<TResponse<IResponseMessage>>;
    forgotPassword: (data: ISignInData) => Promise<TResponse<IResponseMessage>>;
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

    return { signIn, forgotPassword, signUp };
}
