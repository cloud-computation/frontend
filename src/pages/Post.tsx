import React, { useEffect } from "react";
import { usePost } from "../hooks";
import { useParams } from "react-router";
import { Header } from "../components/header";
import { css } from "emotion";
import moment from "moment";
import {Typography} from "@material-ui/core";
import {Container} from "../components/container";

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
};

export const Post = () => {
    const { post, getPost } = usePost();
    const { id } = useParams();

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
                <Typography>{post && post.text}</Typography>
            </Container>
        </>
    );
};
