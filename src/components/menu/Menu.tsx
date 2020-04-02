import React from "react";
import { Menu as MaterialMenu, MenuItem } from "@material-ui/core";
import {IOption} from "../../entity";

interface IMenuProps {
    anchor: HTMLElement | null;
    open: boolean;
    options: IOption[];

    onClose?(): void;
}

export const Menu = (props: IMenuProps) => {
    const { anchor, onClose, open, options = [] } = props;

    return (
        <MaterialMenu
            open={open}
            anchorEl={anchor}
            onClose={onClose}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
        >
            {options.map((item, index) => (
                <MenuItem onClick={item.handler} key={index}>
                    {item.value}
                </MenuItem>
            ))}
        </MaterialMenu>
    );
};
