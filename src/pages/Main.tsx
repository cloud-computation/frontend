import React, { useContext, useEffect } from "react";
import { Container } from "../components/container";
import { Header } from "../components/header";
import { Button } from "@material-ui/core";
import { css } from "emotion";
import { Add } from "@material-ui/icons";
import { UserContext } from "../app";
import { usePost } from "../hooks";
import { PostPreview } from "../components/post-preview";
import { AppContext } from "../context";

const styles = {
    header: css`
        margin-bottom: 40px;
    `,
    posts: css`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap: 40px;
        grid-row-gap: 40px;
    `,
};

export const Main = () => {
    const userContext = useContext(UserContext);
    const { posts, getPostList } = usePost();

    useEffect(() => {
        getPostList();
    }, []);

    const onAddPost = () => {
        AppContext.getHistory().push("/post/create");
    };

    return (
        <>
            <Header />
            <Container>
                {userContext.user && (
                    <div className={styles.header}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}
                            onClick={onAddPost}
                        >
                            Создать пост
                        </Button>
                    </div>
                )}
                <div className={styles.posts}>
                    {posts.map((item, index) => (
                        <PostPreview post={item} key={index} />
                    ))}
                </div>
            </Container>
        </>
    );
};
