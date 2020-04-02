import React, { useContext } from "react";
import { Container } from "../components/container";
import { Header } from "../components/header";
import { css } from "emotion";
import { UserContext } from "../app";
import { UploadAvatar } from "../components/upload-avatar";
import { CustomForm } from "../components/custom-form";
import { IUser } from "../entity";
import { TextField } from "../components/text-field";
import { Button, Typography } from "@material-ui/core";
import { isEqual } from "lodash";
import { useCustomSnackbar, useUser } from "../hooks";
import { getServerError } from "../utils";

const styles = {
    content: css`
        padding: 40px 0;
        display: flex;
        align-items: flex-start;
    `,
    avatar: css`
        width: 300px;
    `,
    form: css`
        width: 500px;
        display: grid;
        grid-template-columns: 1fr;
        grid-row-gap: 30px;
        margin-left: 40px;
    `,
};

export const Profile = () => {
    const userContext = useContext(UserContext);
    const { uploadAvatar, updateUser, deleteAvatar } = useUser();
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
        updateUser(data)
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

    return (
        <>
            <Header />
            <Container>
                <Typography variant={"h3"}>
                    Профиль пользователя {userContext.user.login}
                </Typography>
                <div className={styles.content}>
                    <div className={styles.avatar}>
                        <UploadAvatar
                            src={userContext.user.avatar}
                            onDeleteAvatar={handleDeleteAvatar}
                            uploadAvatar={handleAvatar}
                        />
                    </div>
                    <CustomForm<Partial<IUser>>
                        data={userContext.user}
                        onSubmit={handleUpdateUser}
                        render={(form) => (
                            <div className={styles.form}>
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
                            </div>
                        )}
                    />
                </div>
            </Container>
        </>
    );
};
