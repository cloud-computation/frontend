import React, { useContext } from "react";
import { Container } from "../components/container";
import { Header } from "../components/header";
import { css } from "emotion";
import { UserContext } from "../app";
import { UploadAvatar } from "../components/upload-avatar";
import { CustomForm } from "../components/custom-form";
import { IChangePassword, IUser } from "../entity";
import { TextField } from "../components/text-field";
import { Button, Card, Typography } from "@material-ui/core";
import { isEqual, omit } from "lodash";
import { useCustomSnackbar, useUser } from "../hooks";
import { equalTo, getServerError } from "../utils";
import * as Yup from "yup";

const styles = {
    content: css`
        padding: 40px 0;
        display: grid;
        grid-template-columns: 300px 1fr 1fr;
        grid-column-gap: 40px;
        align-items: flex-start;
    `,
    avatar: css`
        padding: 20px;
    `,
    image: css`
        height: 300px;
    `,
    form: css`
        display: grid;
        grid-template-columns: 1fr;
        grid-row-gap: 30px;
        padding: 20px;
    `,
};

const changeUserDataValidationSchema = Yup.object().shape({
    email: Yup.string().email("Некорректный e-mail").required("Обязательно для заполнения"),
    login: Yup.string()
        .required("Обязательно для заполнения")
        .min(4, "Пароль должен быть не меньше 4 символов"),
});

Yup.addMethod(Yup.string, "equalTo", equalTo);

const changePasswordValidationSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, "Пароль должен сожержать минимум 6 символов")
        .required("Поле обязательно для заполнения"),
    newPassword: Yup.string()
        .equalTo(Yup.ref("repeatPassword"), "Новый пароль и повтор пароля должны совпадать")
        .min(6, "Пароль должен сожержать минимум 6 символов")
        .required("Поле обязательно для заполнения"),
    repeatPassword: Yup.string()
        .equalTo(Yup.ref("newPassword"), "Новый пароль и повтор пароля должны совпадать")
        .min(6, "Пароль должен сожержать минимум 6 символов")
        .required("Поле обязательно для заполнения"),
});

export const Profile = () => {
    const userContext = useContext(UserContext);
    const { uploadAvatar, updateUser, deleteAvatar, changePassword } = useUser();
    const { showErrorSnackbar, showSuccessSnackbar } = useCustomSnackbar();

    const handleAvatar = (file: File) => {
        uploadAvatar({ avatar: file })
            .then((response) => {
                userContext.setUser(response.data);
                showSuccessSnackbar("Успешно загружено");
            })
            .catch((err) => {
                const error = getServerError(err);
                if (error) {
                    showErrorSnackbar(error.title);
                }
            });
    };

    const handleDeleteAvatar = () => {
        deleteAvatar()
            .then((response) => {
                userContext.setUser(response.data);
                showSuccessSnackbar("Успешно удалено");
            })
            .catch((err) => {
                const error = getServerError(err);
                if (error) {
                    showErrorSnackbar(error.title);
                }
            });
    };

    const handleUpdateUser = (data: Partial<IUser>) => {
        updateUser(omit(data, ["avatar"]))
            .then((response) => {
                userContext.setUser(response.data);
                showSuccessSnackbar("Успешно обновлено");
            })
            .catch((err) => {
                const error = getServerError(err);
                if (error) {
                    showErrorSnackbar(error.title);
                }
            });
    };

    const handleChangePassword = (data: IChangePassword) => {
        changePassword(data)
            .then(() => showSuccessSnackbar("Успешно обновлено"))
            .catch((err) => {
                const error = getServerError(err);
                if (error) {
                    showErrorSnackbar(error.title);
                }
            });
    };

    return (
        <>
            <Header />
            <Container>
                <Typography
                    variant={"h3"}
                    className={css`
                        margin-top: 40px !important;
                    `}
                >
                    Профиль пользователя {userContext.user.login}
                </Typography>
                <div className={styles.content}>
                    <CustomForm<Partial<IUser>>
                        data={userContext.user}
                        validationSchema={changeUserDataValidationSchema}
                        onSubmit={handleUpdateUser}
                        render={(form) => (
                            <>
                                <Card className={styles.avatar} variant={"outlined"}>
                                    <UploadAvatar
                                        src={userContext.user.avatar}
                                        onDeleteAvatar={handleDeleteAvatar}
                                        uploadAvatar={handleAvatar}
                                        imageClassName={styles.image}
                                        name={"avatar"}
                                    />
                                </Card>
                                <Card className={styles.form} variant={"outlined"}>
                                    <Typography variant={"h5"}>Изменить данные</Typography>
                                    <TextField
                                        name={"email"}
                                        label={"Email"}
                                        InputLabelProps={{ shrink: !!form?.values?.login }}
                                    />
                                    <TextField
                                        name={"login"}
                                        label={"Логин"}
                                        InputLabelProps={{ shrink: !!form?.values?.login }}
                                    />
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={form?.submitForm}
                                        disabled={
                                            !form.isValid || isEqual(form?.values, form?.initialValues)
                                        }
                                    >
                                        Сохранить
                                    </Button>
                                </Card>
                            </>
                        )}
                    />
                    <CustomForm<IChangePassword>
                        onSubmit={handleChangePassword}
                        validationSchema={changePasswordValidationSchema}
                        render={(form) => (
                            <Card variant={"outlined"} className={styles.form}>
                                <Typography variant={"h5"}>Изменить пароль</Typography>
                                <TextField name={"password"} label={"Текущий пароль"} />
                                <TextField name={"newPassword"} label={"Новый пароль"} />
                                <TextField name={"repeatPassword"} label={"Повтор пароля"} />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={form?.submitForm}
                                    disabled={
                                        !form.isValid || isEqual(form?.values, form?.initialValues)
                                    }
                                >
                                    Сохранить
                                </Button>
                            </Card>
                        )}
                    />
                </div>
            </Container>
        </>
    );
};
