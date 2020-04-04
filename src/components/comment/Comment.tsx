import React, { useContext, useState } from "react";
import { IComment } from "../../entity";
import { Avatar, Button, Card, IconButton, Typography } from "@material-ui/core";
import { css } from "emotion";
import { AccountCircle, Delete, Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { UserContext } from "../../app";
import { CustomForm } from "../custom-form";
import { TextField } from "../text-field";
import moment from "moment";

interface Props {
    comment: IComment;

    onEdit?(id: number, data: Partial<IComment>): Promise<void>;

    onDelete?(id: number): Promise<void>;
}

const style = {
    comment: css`
        padding: 10px;
    `,
    content: css`
        display: grid;
        grid-template-columns: 40px 1fr;
        grid-column-gap: 10px;
    `,
    link: css`
        color: #3f51b5;
        text-decoration: none;
        :hover {
            text-decoration: underline;
        }
    `,
    header: css`
        display: flex;
        height: 48px;
    `,
    icons: css`
        margin-left: auto;
        display: grid;
        grid-template-columns: 48px 48px;
    `,
    text: css`
        margin-top: -25px !important;
    `,
};

export const Comment = (props: Props) => {
    const { comment, onDelete, onEdit } = props;
    const userContext = useContext(UserContext);
    const [edit, setEdit] = useState(false);

    const handleDelete = () => {
        if (onDelete) {
            onDelete(comment.id);
        }
    };

    const handleEdit = (data: IComment) => {
        if (onEdit) {
            onEdit(comment.id, data).then(() => setEdit(false));
        }
    };

    return (
        <Card variant={"outlined"} className={style.comment}>
            <div className={style.content}>
                {comment?.avatar ? <Avatar src={comment?.avatar} /> : <AccountCircle />}
                <div>
                    <div className={style.header}>
                        <Link to={`/user/${comment.authorId}`} className={style.link}>
                            {comment.login}
                        </Link>
                        {userContext && userContext.user?.id === comment.authorId && (
                            <div className={style.icons}>
                                <IconButton onClick={() => setEdit(true)}>
                                    <Edit />
                                </IconButton>
                                <IconButton onClick={handleDelete}>
                                    <Delete />
                                </IconButton>
                            </div>
                        )}
                    </div>
                    {edit ? (
                        <CustomForm<IComment>
                            data={comment}
                            onSubmit={handleEdit}
                            render={(form) => (
                                <div>
                                    <TextField name={"text"} textarea />
                                    <div
                                        className={css`
                                            display: flex;
                                        `}
                                    >
                                        <Button onClick={() => setEdit(false)}>Отмена</Button>
                                        <Button
                                            onClick={() => {
                                                if (form.values.text === "") {
                                                    return;
                                                }
                                                form.submitForm();
                                            }}
                                        >
                                            Сохранить
                                        </Button>
                                    </div>
                                </div>
                            )}
                        />
                    ) : (
                        <>
                            <Typography className={style.text}>{comment.text}</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {moment(comment.createdAt).locale("ru").format("MMM Do YY")}
                            </Typography>
                        </>
                    )}
                </div>
            </div>
        </Card>
    );
};
