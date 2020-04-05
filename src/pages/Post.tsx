import React, { useContext, useEffect } from "react";
import { useComment, usePost } from "../hooks";
import { useParams } from "react-router";
import { Header } from "../components/header";
import { css } from "emotion";
import moment from "moment";
import { Typography } from "@material-ui/core";
import { Container } from "../components/container";
import { Comment } from "../components/comment";
import { AddComment } from "../components/add-comment";
import { UserContext } from "../app";

const styles = {
    header: css`
        width: 100%;
        height: 700px;
        position: relative;
        z-index: 3;
        background-repeat: no-repeat !important;
        background-size: 100% !important;
        background-position: center !important;
    `,
    mask: css`
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        top: 0;
        left: 0;
        z-index: 4;
    `,
    info: css`
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 5;
    `,
    date: css`
        color: #fff;
        font-size: 20px;
        font-weight: 700;
        text-align: center;
        margin-top: 40px;
    `,
    title: css`
        color: #fff;
        font-size: 60px;
        font-weight: 700;
        text-align: center;
        margin-top: 150px;
    `,
    text: css`
        margin-bottom: 40px !important;
        white-space: pre-wrap;
    `,
    comments: css`
        display: grid;
        grid-template-columns: 1fr;
        grid-row-gap: 30px;
        margin-bottom: 40px !important;
    `,
};

export const Post = () => {
    const { post, getPost } = usePost();
    const { id } = useParams();
    const { comments, deleteComment, createComment, editComment } = useComment(Number(id));
    const userContext = useContext(UserContext);

    useEffect(() => {
        getPost(Number(id));
    }, []);

    return (
        <>
            <Header />
            <div
                className={styles.header}
                style={{ background: `url(${post ? post.background : ""})` }}
            >
                <div className={styles.mask} />
                <div className={styles.info}>
                    <div className={styles.date}>
                        {post && moment(post.createdAt).locale("ru").format("MMM Do YY")}
                        <div className={styles.title}>{post && post.title}</div>
                    </div>
                </div>
            </div>
            <Container>
                <Typography className={styles.text}>{post && post.text}</Typography>
                <Typography className={styles.text} variant={"h5"}>
                    Комментарии: {comments.length}
                </Typography>
                <div className={styles.comments}>
                    {comments.map((item, index) => (
                        <Comment
                            comment={item}
                            onDelete={deleteComment}
                            onEdit={editComment}
                            key={index}
                        />
                    ))}
                </div>
                {userContext.user && <AddComment postId={Number(id)} onCreate={createComment} />}
            </Container>
        </>
    );
};
