import { ISignInData } from "../entity";
import { useContext } from "react";
import { FirebaseContext } from "../app/App";

export function useSignIn(): {
    signIn: (data: ISignInData) => Promise<firebase.auth.UserCredential>;
} {
    const firebase = useContext(FirebaseContext);

    const signIn = (data: ISignInData) => {
        return firebase.auth().signInWithEmailAndPassword(data.email, data.password);
    };

    return { signIn };
}
