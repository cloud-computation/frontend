import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { css, cx } from "emotion";
import { Button, IconButton, LinearProgress, Typography } from "@material-ui/core";
import { Close, CloudUpload, Edit } from "@material-ui/icons";
import { ConfirmPopup } from "../../components";
import { useFile } from "../../hooks";
import { useFormikContext } from "formik";

interface IUploadAvatarProps {
    src?: string;
    loading?: boolean;
    imageClassName?: string;
    name: string;
    buttonVisible?: boolean;

    onDeleteAvatar?(): void;

    uploadAvatar?(file: File): void;
}

const styles = {
    wrapper: css`
        position: relative;
        padding-top: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
    `,
    icons: css`
        position: absolute !important;
        right: 0;
        top: 0;
    `,
    icon: css`
        margin-right: 10px;
        :last-child {
            margin-right: 0;
        }
    `,
    avatar: css`
        margin: 20px 0;
    `,
    button: css`
        width: 100%;
    `,
    input: css`
        display: none;
    `,
    progress: css`
        width: 100%;
        margin-top: 20px;
    `,
    error: css`
        margin-top: 20px !important;
    `,
};

export const UploadAvatar = (props: IUploadAvatarProps) => {
    const {
        onDeleteAvatar,
        uploadAvatar,
        loading,
        imageClassName,
        name,
        buttonVisible = true,
    } = props;
    const [modalOpen, setModalOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { src, file, error, setSrc, deleteFile, loadFile } = useFile({
        whiteList: ["png", "jpg", "pdf", "gif", "jpeg"],
        maxFileSize: 1048576,
    });
    const { setFieldValue } = useFormikContext();

    useEffect(() => {
        setSrc(props.src);
        setSrc(props.src);
    }, [props.src, setSrc]);

    useEffect(() => {
        if (setFieldValue) {
            setFieldValue(name, src);
        }
    }, [src]);

    function onModalOpen(): void {
        setModalOpen(true);
    }

    function onModalClose(): void {
        setModalOpen(false);
    }

    const onChoseFile = () => {
        if (!inputRef.current) {
            return;
        }
        inputRef.current.click();
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0);
        if (!file) {
            return;
        }
        loadFile(file);
        setFieldValue("file", file);
    };

    const deleteAvatar = () => {
        deleteFile();
        onModalClose();
        if (onDeleteAvatar) {
            onDeleteAvatar();
        }
    };

    const onUploadAvatar = () => {
        if (!uploadAvatar || !file) {
            return;
        }
        uploadAvatar(file);
    };

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.icons}>
                    <IconButton className={styles.icon} onClick={onChoseFile}>
                        <Edit />
                    </IconButton>
                    {src && (
                        <IconButton className={styles.icon} onClick={onModalOpen}>
                            <Close />
                        </IconButton>
                    )}
                </div>
                <img src={src} className={cx(styles.avatar, imageClassName)} alt={""} />
                {buttonVisible && (
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<CloudUpload />}
                        className={styles.button}
                        onClick={onUploadAvatar}
                        disabled={loading}
                    >
                        Загрузить
                    </Button>
                )}
                {error && (
                    <Typography color={"error"} align={"center"} className={styles.error}>
                        {error}
                    </Typography>
                )}
                <input type="file" className={styles.input} ref={inputRef} onChange={onChange} />
            </div>
            {loading && <LinearProgress className={styles.progress} />}
            <ConfirmPopup
                title={"Вы действительно хотите удалить аватар?"}
                submitTitle={"Удалить"}
                open={modalOpen}
                onClose={onModalClose}
                onSubmit={deleteAvatar}
            />
        </>
    );
};
