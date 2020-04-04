import React, { FC } from "react";
import { css, cx } from "emotion";

interface Props {
    className?: string;
}

const styles = {
    inner: css`
        width: 1200px;
        margin: 0 auto;
        padding: 40px 0;
    `,
};

export const Container: FC<Props> = (props) => {
    return <div className={cx(styles.inner, props.className)}>{props.children}</div>;
};
