import React from "react";
import { Header } from "../components/header";
import { Container } from "../components/container";
import { UploadAvatar } from "../components/upload-avatar";
import { css } from "emotion";
import { CustomForm } from "../components/custom-form";
import { TextField } from "../components/text-field";
import * as Yup from "yup";
import { Button, Typography } from "@material-ui/core";
import { useCustomSnackbar, usePost } from "../hooks";
import { ICreatePost } from "../entity";
import { get, omit } from "lodash";
import { getServerError } from "../utils";
import { AppContext } from "../context";

const validationSchema = Yup.object().shape({
    title: Yup.string().required("Обязательно для заполнения"),
    text: Yup.string().required("Обязательно для заполнения"),
    background: Yup.string().required("Обязательно для заполнения"),
});

const styles = {
    content: css`
        display: grid;
        grid-template-columns: 400px 1fr;
        grid-column-gap: 30px;
    `,
    background: css`
        width: 400px;
    `,
    backgroundImage: css`
        width: 400px;
        height: 300px;
    `,
    fields: css`
        margin-top: 45px;
    `,
    footer: css`
        position: fixed;
        width: 100%;
        bottom: 0;
        height: 80px;
        border-top: 1px solid #ccc;
    `,
    footerContent: css`
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0;
    `,
    imageError: css`
        margin-top: 20px !important;
    `,
};

export const CreatePost = () => {
    const { createPost } = usePost();
    const { showErrorSnackbar } = useCustomSnackbar();

    const onSubmit = (data: ICreatePost) => {
        createPost(omit(data, ["background"]) as ICreatePost)
            .then((response) => AppContext.getHistory().push(`/post/${response.data.id}`))
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
            <CustomForm<ICreatePost>
                validationSchema={validationSchema}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={onSubmit}
                render={(form) => (
                    <>
                        <Container className={styles.content}>
                            <div className={styles.background}>
                                <UploadAvatar
                                    imageClassName={styles.backgroundImage}
                                    name={"background"}
                                />
                                {get(form.errors, "background") && (
                                    <Typography color={"error"} className={styles.imageError}>
                                        {get(form.errors, "background")}
                                    </Typography>
                                )}
                            </div>
                            <div className={styles.fields}>
                                <TextField name={"title"} label={"Название"} />
                                <TextField name={"text"} label={"Текст"} textarea />
                            </div>
                        </Container>
                        <div className={styles.footer}>
                            <Container className={styles.footerContent}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={form.submitForm}
                                >
                                    Сохранить
                                </Button>
                            </Container>
                        </div>
                    </>
                )}
            />
        </>
    );
};
