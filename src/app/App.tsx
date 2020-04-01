import React, { useState } from "react";
import { IConfig } from "../entity";
import { transport } from "../service";
import { Router } from "react-router";
import { AppContext } from "../context";
import { PublicRoute } from "../components/public-route";
import { ForgotPassword, SignIn, SignUp } from "../pages";
import { SnackbarProvider } from "notistack";

const config: IConfig = require("../config/config.json"); // данные находятся в консоли firebase

transport.init(config.serverUrl);

export const App = () => {
    const [logged, setLogged] = useState(false);

    return (
        <SnackbarProvider>
            <Router history={AppContext.getHistory()}>
                <PublicRoute
                    auth={logged}
                    path={"/sign-in"}
                    exact
                    render={() => <SignIn setLogged={setLogged} />}
                />
                <PublicRoute auth={logged} path={"/sign-up"} exact render={() => <SignUp />} />
                <PublicRoute
                    auth={logged}
                    path={"/forgot-password"}
                    exact
                    render={() => <ForgotPassword />}
                />
            </Router>
        </SnackbarProvider>
    );
};
