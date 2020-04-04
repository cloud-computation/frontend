import React from "react";
import { IPost } from "../../entity";
import { css } from "emotion";
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from "@material-ui/core";
import { AppContext } from "../../context";

interface Props {
    post: IPost;
}

const styles = {
    description: css`
        height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
    `,
    image: css`
        height: 180px;
    `,
};

export const PostPreview = (props: Props) => {
    const { post } = props;

    const more = () => {
        AppContext.getHistory().push(`/post/${post.id}`);
    };

    return (
        <Card variant={"outlined"} onClick={more}>
            <CardActionArea>
                <CardMedia image={post.background} title={post.title} className={styles.image} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {post.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        className={styles.description}
                    >
                        {post.text}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
