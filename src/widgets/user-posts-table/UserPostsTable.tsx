import React, { useState } from "react";
import { IPost } from "../../entity";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import { AppContext } from "../../context";
import { ConfirmPopup } from "../../components/confirm-popup";

interface Props {
    posts?: IPost[];

    onDelete?(id: number): Promise<void>;
}

export const UserPostsTable = (props: Props) => {
    const { posts = [], onDelete } = props;
    const [modal, setModal] = useState(false);
    const [postId, setPostId] = useState<number | undefined>(undefined);
    const [title, setTitle] = useState<string | undefined>(undefined);

    const onOpenModal = (id: number) => {
        setModal(true);
        setPostId(id);
        setTitle(posts.find((item) => item.id === id).title);
    };

    const onCloseModal = () => {
        setModal(false);
        setPostId(undefined);
        setTitle(undefined);
    };

    const goToPost = (id: number) => {
        AppContext.getHistory().push(`/post/${id}`);
    };

    const goToEditPost = (id: number) => {
        AppContext.getHistory().push(`/post/${id}/edit`);
    };

    const handleDelete = () => {
        if (onDelete && postId) {
            onDelete(postId).then(() => {
                setModal(false);
                setPostId(undefined);
            });
        }
    };

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Название</TableCell>
                            <TableCell>Просмотр</TableCell>
                            <TableCell>Редактировать</TableCell>
                            <TableCell>Удалить</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => goToPost(item.id)}
                                    >
                                        Перейти к статье
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => goToEditPost(item.id)}
                                    >
                                        Редактировать
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => onOpenModal(item.id)}
                                    >
                                        Удалить
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ConfirmPopup
                open={modal}
                title={`Вы хотите удалить статью "${title}"`}
                onClose={onCloseModal}
                onSubmit={handleDelete}
            />
        </>
    );
};
