import React, { useContext } from "react";
import { TCreateComment } from "../../entity";
import { UserContext } from "../../app";
import { CustomForm } from "../custom-form";
import { TextField } from "../text-field";
import { css } from "emotion";
import {Button, Typography} from "@material-ui/core";

interface Props {
    postId: number;

    onCreate?(data: TCreateComment): void;
}

export const AddComment = (props: Props) => {
    const { postId, onCreate } = props;
    const userContext = useContext(UserContext);

    const handleCreateComment = (data: TCreateComment) => {
        if (onCreate) {
            onCreate({
                text: data.text,
                postId,
                authorId: userContext.user.id,
            });
        }
    };

    return (
        <CustomForm<TCreateComment>
            onSubmit={handleCreateComment}
            render={(form) => (
                <div>
                    <Typography variant={"h5"}>Оставить комментарий</Typography>
                    <TextField name={"text"} textarea />
                    <div
                        className={css`
                            display: flex;
                        `}
                    >
                        <Button onClick={() => form.setFieldValue("text", "")}>Очистить</Button>
                        <Button onClick={() => {
                            if (!form.values.text || form.values.text === "") {
                                return;
                            }
                            form.submitForm().then(() => form.setFieldValue("text", ""));
                        }}>Сохранить</Button>
                    </div>
                </div>
            )}
        />
    );
};
