import React, { FC } from "react";
import { IPopupProps, Popup } from "../popup";
import { Button, DialogActions } from "@material-ui/core";
import { css } from "emotion";

interface IConfirmPopupProps extends IPopupProps {
    submitTitle?: string;
    cancelTitle?: string;

    onSubmit?(): void;
}

const styles = {
    button: css`
        margin-right: 20px;
    `,
    actions: css`
        padding: 16px 24px !important;
    `
};

export const ConfirmPopup: FC<IConfirmPopupProps> = (props) => {
    const {
        onClose,
        open,
        title,
        onSubmit,
        cancelTitle = "Отмена",
        submitTitle = "Ок",
    } = props;
    return (
        <Popup open={open} title={title} onClose={onClose}>
            <DialogActions className={styles.actions}>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={onClose}
                    className={styles.button}
                >
                    {cancelTitle}
                </Button>
                <Button variant="outlined" color={"primary"} onClick={onSubmit}>
                    {submitTitle}
                </Button>
            </DialogActions>
        </Popup>
    );
};
