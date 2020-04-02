import { IResponseMessage, ISignInData, ISignUpData, IUser, TResponse } from "../entity";
import { transport } from "../service";

export function signUp(data: ISignUpData) {
    return transport.post<ISignUpData, IResponseMessage>(`/auth/signUp`, data);
}

export function signIn(data: ISignInData) {
    return transport.post<ISignInData, { token: string }>("/auth/signIn", data);
}

export function forgotPassword(data: { email: string }) {
    return transport.post<{ email: string }, IResponseMessage>("/auth/forgotPassword", data);
}

export function login() {
    return transport.post<{ token: string }, IUser>("/auth/login");
}
