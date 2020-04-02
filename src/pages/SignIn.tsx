import React from "react";
import { css, cx } from "emotion";
import {useAuth, useCustomSnackbar} from "../hooks";
import { ISignInData } from "../entity";
import { Button, Card, Typography } from "@material-ui/core";
import { TextField, CustomForm } from "../components";
import { AppContext } from "../context";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import {getServerError} from "../utils";

interface Props {
    setLogged(value: boolean): void;
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Некорректный e-mail").required("Обязательно для заполнения"),
    password: Yup.string()
        .required("Обязательно для заполнения")
        .min(6, "Пароль должен быть не меньше 6 символов"),
});

const styles = {
    wrapper: css`
        width: 100vw;
        height: 100vh;
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f5f5f5;
    `,
    card: css`
        padding: 20px;
        display: grid;
        grid-template-columns: 1fr;
        grid-row-gap: 20px;
        width: 500px;
    `,
    footer: css`
        display: flex;
    `,
    link: css`
        text-decoration: none;
        color: #3f51b5;
    `,
};

export const SignIn = (props: Props) => {
    const { setLogged } = props;
    const { signIn } = useAuth();
    const { showErrorSnackbar } = useCustomSnackbar();

    const handleSignIn = (data: ISignInData) => {
        signIn(data)
            .then(() => {
                setLogged(true);
                AppContext.getHistory().push("/");
            })
            .catch((err) => {
                const error = getServerError(err);
                if (error) {
                    showErrorSnackbar(error.title);
                }
            });
    };

    return (
        <CustomForm<ISignInData>
            onSubmit={handleSignIn}
            validationSchema={validationSchema}
            render={(form) => (
                <div className={styles.wrapper}>
                    <Card className={styles.card}>
                        <Typography variant={"h4"} align={"center"}>
                            Войти
                        </Typography>
                        <TextField name={"email"} label={"Email"} />
                        <TextField name={"password"} label={"Пароль"} type={"password"} />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={form?.submitForm}
                            disabled={!form.isValid}
                        >
                            Войти
                        </Button>
                        <div className={styles.footer}>
                            <Link to={"/sign-up"} className={styles.link}>
                                Регистрация
                            </Link>
                            <Link
                                to={"/forgot-password"}
                                className={cx(
                                    styles.link,
                                    css`
                                        margin-left: auto;
                                    `,
                                )}
                            >
                                Не могу вспомнить пароль
                            </Link>
                        </div>
                    </Card>
                </div>
            )}
        />
    );
};
