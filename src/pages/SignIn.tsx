import React from "react";
import { css } from "emotion";
import { useSignIn } from "../hooks";
import { ISignInData } from "../entity";
import { Button, Card, Typography } from "@material-ui/core";
import { TextField, CustomForm } from "../components";
import { AppContext } from "../context";
import * as Yup from "yup";

interface Props {
    setLogged(value: boolean): void;
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Некорректный e-mail").required("Обязательно для заполнения"),
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
};

export const SignIn = (props: Props) => {
    const { setLogged } = props;
    const { signIn } = useSignIn();

    const handleSignIn = (data: ISignInData) => {
        signIn(data).then(() => {
            setLogged(true);
            AppContext.getHistory().push("/");
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
                    </Card>
                </div>
            )}
        />
    );
};
