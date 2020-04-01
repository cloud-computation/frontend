import {IResponseMessage, ISignInData, ISignUpData} from "../entity";
import {transport} from "../service";

export function signUp(data: ISignUpData) {
    return transport.post<ISignUpData, IResponseMessage>(`/auth/signUp`, data);
}

export function signIn(data: ISignInData) {
    return transport.post<ISignInData, IResponseMessage>("/auth/signIn", data);
}

export function forgotPassword(data: {email: string}) {
    return transport.post<{email: string}, IResponseMessage>("/auth/forgotPassword");
}
