import React, { createContext, useEffect, useState } from "react";
import { IConfig, IUser, IUserContext } from "../entity";
import { transport } from "../service";
import { Route, Router } from "react-router";
import { AppContext } from "../context";
import { Main } from "../pages";
import { SnackbarProvider } from "notistack";
import { useAuth } from "../hooks";

const config: IConfig = require("../config/config.json"); // данные находятся в консоли firebase
transport.init(config.serverUrl);
export const UserContext = createContext<IUserContext | undefined>(undefined);

export const App = () => {
    const [user, setUser] = useState<IUser | undefined>(undefined);
    const { login } = useAuth();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            transport.setToken(token);
            login().then((response) => setUser(response.data));
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <SnackbarProvider>
                <Router history={AppContext.getHistory()}>
                    <Route path={"/"}>
                        <Main />
                    </Route>
                </Router>
            </SnackbarProvider>
        </UserContext.Provider>
    );
};
