import React, { FC } from "react";
import { Dialog, DialogTitle, IconButton, Typography } from "@material-ui/core";
import { css } from "emotion";
import { Close } from "@material-ui/icons";

export interface IPopupProps {
    title: string;
    open: boolean;

    onClose?(): void;
}

const styles = {
    popup: css`
        min-width: 600px;
    `,
    header: css`
        display: flex;
        width: 100%;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        padding: 16px 10px 16px 24px !important;
    `,
    title: css`
        width: 400px;
        overflow: hidden;
        text-overflow: ellipsis;
    `,
    close: css`
        margin-left: auto !important;
    `
};

export const Popup: FC<IPopupProps> = (props) => {
    const { open, title, onClose, children } = props;

    return (
        <Dialog open={open} onClose={onClose} classes={{paper: styles.popup}}>
            <DialogTitle className={styles.header} disableTypography>
                <Typography variant={"h6"} className={styles.title}>{title}</Typography>
                <IconButton onClick={onClose} className={styles.close}>
                    <Close />
                </IconButton>
            </DialogTitle>
            {children}
        </Dialog>
    );
};
