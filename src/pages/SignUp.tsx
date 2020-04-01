import React from "react";
import { css } from "emotion";
import { ISignUpData } from "../entity";
import { Button, Card, Typography } from "@material-ui/core";
import { TextField, CustomForm } from "../components";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useAuth, useCustomSnackbar } from "../hooks";
import { getServerError } from "../utils";

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Некорректный e-mail").required("Обязательно для заполнения"),
    login: Yup.string()
        .required("Обязательно для заполнения")
        .min(4, "Пароль должен быть не меньше 4 символов"),
    password: Yup.string()
        .required("Обязательно для заполнения")
        .length(6, "Пароль должен быть не меньше 6 символов"),
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

export const SignUp = () => {
    const { signUp } = useAuth();
    const { showErrorSnackbar, showSuccessSnackbar } = useCustomSnackbar();

    const onSubmit = (data: ISignUpData) => {
        signUp(data)
            .then(() => showSuccessSnackbar("Вы успешно зарегистрированы!"))
            .catch((err) => {
                const error = getServerError(err);
                if (error) {
                    showErrorSnackbar(error.title);
                }
            });
    };

    return (
        <CustomForm<ISignUpData>
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            render={(form) => (
                <div className={styles.wrapper}>
                    <Card className={styles.card}>
                        <Typography variant={"h4"} align={"center"}>
                            Регистрация
                        </Typography>
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
                            <Link to={"/sign-in"} className={styles.link}>
                                Войти
                            </Link>
                        </div>
                    </Card>
                </div>
            )}
        />
    );
};
