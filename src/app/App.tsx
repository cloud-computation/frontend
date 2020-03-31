import React, {createContext, useCallback, useEffect, useState} from "react";
import {IConfig, IFirebaseConfig} from "../entity";
import firebase from "firebase";
import {transport} from "../service";
import {Router} from "react-router";
import {AppContext} from "../context";
import {PublicRoute} from "../components/public-route";
import {SignIn} from "../pages";

const firebaseConfig: IFirebaseConfig = require("../config/firebase-config.json"); // данные находятся в консоли firebase
const config: IConfig = require("../config/config.json"); // данные находятся в консоли firebase

export const FirebaseContext = createContext<firebase.app.App | undefined>(undefined);
firebase.initializeApp(firebaseConfig);
transport.init(config.serverUrl);

export const App = () => {
    const [logged, setLogged] = useState(false);

    const isInitialized = useCallback(() => {
        return new Promise((resolve) => {
            firebase
                .app()
                .auth()
                .onAuthStateChanged(resolve);
        });
    }, []);

    useEffect(() => {
        isInitialized().then((data) => setLogged(!!data));
    }, [isInitialized]);

    return (
        <FirebaseContext.Provider value={firebase.app()}>
            <Router history={AppContext.getHistory()}>
                <PublicRoute
                    auth={logged}
                    path={"/sign-in"}
                    exact
                    render={() => <SignIn setLogged={setLogged} />}
                />
            </Router>
        </FirebaseContext.Provider>
        );
}
