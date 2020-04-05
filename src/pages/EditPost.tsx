import React, { useEffect } from "react";
import { Header } from "../components/header";
import { Container } from "../components/container";
import { UploadAvatar } from "../components/upload-avatar";
import { css } from "emotion";
import { CustomForm } from "../components/custom-form";
import { TextField } from "../components/text-field";
import * as Yup from "yup";
import { Button, Typography } from "@material-ui/core";
import { useCustomSnackbar, usePost } from "../hooks";
import { ICreatePost, IPost } from "../entity";
import {get, isEqual, omit} from "lodash";
import { getServerError } from "../utils";
import { useParams } from "react-router";

const validationSchema = Yup.object().shape({
    title: Yup.string().required("Обязательно для заполнения"),
    text: Yup.string().required("Обязательно для заполнения"),
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

export const EditPost = () => {
    const { editPost, getPost, post, updateBackground } = usePost();
    const { showErrorSnackbar, showSuccessSnackbar } = useCustomSnackbar();
    const { id } = useParams();

    const fetchPost = () => getPost(Number(id));

    useEffect(() => {
        fetchPost();
    }, []);

    const onSubmit = (data: ICreatePost) => {
        editPost(Number(id), omit(data, ["background"]))
            .then(() => {
                fetchPost();
                showSuccessSnackbar("Успешно обновлено");
            })
            .catch((err) => {
                const error = getServerError(err);
                if (error) {
                    showErrorSnackbar(error.title);
                }
            });
    };

    const handleUpdateBackground = (file: File) => {
        updateBackground(Number(id), { file }).then(() => {
            fetchPost();
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
            <CustomForm<Partial<IPost>>
                validationSchema={validationSchema}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={onSubmit}
                data={post}
                render={(form) => (
                    <>
                        <Container className={styles.content}>
                            <div className={styles.background}>
                                <UploadAvatar
                                    imageClassName={styles.backgroundImage}
                                    name={"background"}
                                    src={post?.background}
                                    uploadAvatar={handleUpdateBackground}
                                    deleteEnable={false}
                                />
                                {get(form.errors, "background") && (
                                    <Typography color={"error"} className={styles.imageError}>
                                        {get(form.errors, "background")}
                                    </Typography>
                                )}
                            </div>
                            <div className={styles.fields}>
                                <TextField name={"title"} label={"Название"} InputLabelProps={{ shrink: !!form?.values?.title }} />
                                <TextField name={"text"} label={"Текст"} textarea InputLabelProps={{ shrink: !!form?.values?.text }} />
                            </div>
                        </Container>
                        <div className={styles.footer}>
                            <Container className={styles.footerContent}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={form.submitForm}
                                    disabled={
                                        !form.isValid || isEqual(form?.values, form?.initialValues)
                                    }
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
