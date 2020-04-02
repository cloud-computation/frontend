import React, { createContext, useEffect, useState } from "react";
import { IConfig, IUser, IUserContext } from "../entity";
import { transport } from "../service";
import { Route, Router } from "react-router";
import { AppContext } from "../context";
import { Main } from "../pages";
import { SnackbarProvider } from "notistack";
import { useAuth } from "../hooks";
import {PrivateRoute} from "../components/private-route";
import {log} from "util";

const config: IConfig = require("../config/config.json"); // данные находятся в консоли firebase
transport.init(config.serverUrl);
export const UserContext = createContext<IUserContext | undefined>(undefined);

export const App = () => {
    const [user, setUser] = useState<IUser | undefined>(undefined);
    const [logged, setLogged] = useState(false);
    const { login } = useAuth();

    useEffect(() => {
        window.onbeforeunload = () => {
            localStorage.setItem("pathBeforeReload", window.location.pathname);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            transport.setToken(token);
            login().then((response) => {
                setUser(response.data);
                setLogged(true);
                const redirectPath = localStorage.getItem("pathBeforeReload");
                if (redirectPath) {
                    AppContext.getHistory().push(redirectPath);
                }
            });
        }
    }, []);

    useEffect(() => {
        setLogged(!!user);
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <SnackbarProvider>
                <Router history={AppContext.getHistory()}>
                    <PrivateRoute auth={logged} exact path={"/profile"} render={() => <h1>{user.email}</h1>} />
                    <Route path={"/"} exact>
                        <Main />
                    </Route>
                </Router>
            </SnackbarProvider>
        </UserContext.Provider>
    );
};
