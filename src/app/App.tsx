import React, { createContext, useEffect, useState } from "react";
import { IConfig, IUser, IUserContext } from "../entity";
import { transport } from "../service";
import {Route, Router, Switch} from "react-router";
import { AppContext } from "../context";
import {CreatePost, Main, Post, Profile} from "../pages";
import { SnackbarProvider } from "notistack";
import { useAuth } from "../hooks";
import {PrivateRoute} from "../components/private-route";

const config: IConfig = require("../config/config.json"); // данные находятся в консоли firebase
transport.init(config.serverUrl);
export const UserContext = createContext<IUserContext | undefined>(undefined);

export const App = () => {
    const [user, setUser] = useState<IUser | undefined>(undefined);
    const [logged, setLogged] = useState(false);
    const { login } = useAuth();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            transport.setToken(token);
            login().then((response) => {
                setUser(response.data);
                setLogged(true);
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
                    <Switch>
                        <PrivateRoute auth={logged} exact path={"/profile"} render={() => <Profile />} />
                        <Route path={"/"} exact>
                            <Main />
                        </Route>
                        <PrivateRoute auth={logged} path={"/post/create"} exact render={() => <CreatePost />} />
                        <Route path={"/post/:id"} exact>
                            <Post />
                        </Route>
                    </Switch>
                </Router>
            </SnackbarProvider>
        </UserContext.Provider>
    );
};
