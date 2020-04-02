import React from "react";
import { css } from "emotion";
import cn from "classnames";

const DEFAULT = require("./user.svg");

interface IAvatarProps {
    url?: string;
    name?: string
    className?: string;
}

const styles = {
    wrapper: css`
        width: 200px;
        height: 200px;
        overflow: hidden;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    `,
    image: css`
        width: 100%;
        height: 100%;
    `
};

export const Avatar = (props: IAvatarProps) => {
    const { url, name, className } = props;
    return (
        <div className={cn(styles.wrapper, className)}>
            <img src={url || DEFAULT} alt={name} className={styles.image}/>
        </div>
    );
};
