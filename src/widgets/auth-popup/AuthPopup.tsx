import React, { useState } from "react";
import { Popup } from "../../components/popup";
import { ISignInData, ISignUpData, IUser } from "../../entity";
import { Button, Typography } from "@material-ui/core";
import { TextField } from "../../components/text-field";
import { css, cx } from "emotion";
import { CustomForm } from "../../components/custom-form";
import * as Yup from "yup";
import { useAuth, useCustomSnackbar } from "../../hooks";
import { getServerError } from "../../utils";
import { transport } from "../../service";

interface Props {
    open: boolean;

    onClose?(): void;

    setUser(user: IUser): void;
}

const signInValidationSchema = Yup.object().shape({
    email: Yup.string().email("Некорректный e-mail").required("Обязательно для заполнения"),
    password: Yup.string()
        .required("Обязательно для заполнения")
        .min(6, "Пароль должен быть не меньше 6 символов"),
});

const signUpValidationSchema = Yup.object().shape({
    email: Yup.string().email("Некорректный e-mail").required("Обязательно для заполнения"),
    login: Yup.string()
        .required("Обязательно для заполнения")
        .min(4, "Логин должен быть не меньше 4 символов"),
    password: Yup.string()
        .required("Обязательно для заполнения")
        .min(6, "Пароль должен быть не меньше 6 символов"),
});

const forgotPasswordValidationSchema = Yup.object().shape({
    email: Yup.string().email("Некорректный e-mail").required("Обязательно для заполнения"),
});

const styles = {
    card: css`
        padding: 20px;
        display: grid;
        grid-template-columns: 1fr;
        grid-row-gap: 20px;
    `,
    footer: css`
        display: flex;
    `,
    link: css`
        text-decoration: none;
        color: #3f51b5;
        cursor: pointer;
        :hover {
            text-decoration: underline;
        }
    `,
};

export const AuthPopup = (props: Props) => {
    const { open, onClose, setUser } = props;
    const [mode, setMode] = useState<"signIn" | "signUp" | "forgotPassword">("signIn");
    const popupTitle = new Map([
        ["signIn", "Войти"],
        ["signUp", "Регистрация"],
        ["forgotPassword", "Восстановить пароль"],
    ]);
    const { signUp, signIn, forgotPassword, login } = useAuth();
    const { showErrorSnackbar, showSuccessSnackbar } = useCustomSnackbar();

    const handleSignIn = (data: ISignInData) => {
        signIn(data)
            .then((response) => {
                transport.setToken(response.data.token);
                login()
                    .then((response) => {
                        setUser(response.data);
                        onClose();
                    })
                    .catch(() => showErrorSnackbar("Ошибка сервера. Попробуйте позже"));
            })
            .catch((err) => {
                const error = getServerError(err);
                if (error) {
                    showErrorSnackbar(error.title);
                }
            });
    };

    const handleSignUp = (data: ISignUpData) => {
        signUp(data)
            .then(() => showSuccessSnackbar("Вы успешно зарегистрированы!"))
            .catch((err) => {
                const error = getServerError(err);
                if (error) {
                    showErrorSnackbar(error.title);
                }
            });
    };

    const handleForgotPassword = (data: { email: string }) => {
        forgotPassword(data)
            .then(() => {
                showSuccessSnackbar("Пароль успешно отправлен");
            })
            .catch((err) => {
                const error = getServerError(err);
                if (error) {
                    showErrorSnackbar(error.title);
                }
            });
    };

    return (
        <Popup open={open} onClose={onClose} title={popupTitle.get(mode)}>
            {mode === "signIn" && (
                <CustomForm<ISignInData>
                    onSubmit={handleSignIn}
                    validationSchema={signInValidationSchema}
                    render={(form) => (
                        <div className={styles.card}>
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
                                <div className={styles.link} onClick={() => setMode("signUp")}>
                                    Регистрация
                                </div>
                                <div
                                    onClick={() => setMode("forgotPassword")}
                                    className={cx(
                                        styles.link,
                                        css`
                                            margin-left: auto;
                                        `,
                                    )}
                                >
                                    Не могу вспомнить пароль
                                </div>
                            </div>
                        </div>
                    )}
                />
            )}
            {mode === "signUp" && (
                <CustomForm<ISignUpData>
                    onSubmit={handleSignUp}
                    validationSchema={signUpValidationSchema}
                    render={(form) => (
                        <div className={styles.card}>
                            <TextField name={"login"} label={"Логин"} />
                            <TextField name={"email"} label={"Email"} />
                            <TextField name={"password"} label={"Пароль"} type={"password"} />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={form?.submitForm}
                                disabled={!form.isValid}
                            >
                                Регистрация
                            </Button>
                            <div className={styles.footer}>
                                <div className={styles.link} onClick={() => setMode("signIn")}>
                                    Войти
                                </div>
                            </div>
                        </div>
                    )}
                />
            )}
            {mode === "forgotPassword" && (
                <CustomForm<{ email: string }>
                    onSubmit={handleForgotPassword}
                    validationSchema={forgotPasswordValidationSchema}
                    render={(form) => (
                        <div className={styles.card}>
                            <Typography variant={"h6"} align={"center"}>
                                На введенный е-mail мы отправим новый пароль
                            </Typography>
                            <TextField name={"email"} label={"Email"} />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={form?.submitForm}
                                disabled={!form.isValid}
                            >
                                Отправить
                            </Button>
                            <div className={styles.footer}>
                                <div className={styles.link} onClick={() => setMode("signUp")}>
                                    Регистрация
                                </div>
                                <div
                                    onClick={() => setMode("signIn")}
                                    className={cx(
                                        styles.link,
                                        css`
                                            margin-left: auto;
                                        `,
                                    )}
                                >
                                    Войти
                                </div>
                            </div>
                        </div>
                    )}
                />
            )}
        </Popup>
    );
};
