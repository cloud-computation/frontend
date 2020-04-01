import React from "react";
import { css, cx } from "emotion";
import { ISignInData } from "../entity";
import { Button, Card, Typography } from "@material-ui/core";
import { TextField, CustomForm } from "../components";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Некорректный e-mail").required("Обязательно для заполнения"),
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

export const ForgotPassword = () => {
    return (
        <CustomForm<ISignInData>
            validationSchema={validationSchema}
            render={(form) => (
                <div className={styles.wrapper}>
                    <Card className={styles.card}>
                        <Typography variant={"h4"} align={"center"}>
                            Восстановление пароля
                        </Typography>
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
                            Войти
                        </Button>
                        <div className={styles.footer}>
                            <Link to={"/sign-up"} className={styles.link}>
                                Регистрация
                            </Link>
                            <Link
                                to={"/sign-in"}
                                className={cx(
                                    styles.link,
                                    css`
                                        margin-left: auto;
                                    `,
                                )}
                            >
                                Войти
                            </Link>
                        </div>
                    </Card>
                </div>
            )}
        />
    );
};
