import React, { FC, useContext, useState } from "react";
import { css, cx } from "emotion";
import { AppContext } from "../../context";
import { Menu } from "../menu";
import { UserContext } from "../../app";
import { Avatar, Button, IconButton, Tooltip } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { AuthPopup } from "../../widgets/auth-popup";
import { ConfirmPopup } from "../confirm-popup";

const styles = {
    wrapper: css`
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    `,
    header: css`
        width: 100%;
        height: 80px;
        background: #fff;
        box-shadow: rgba(53, 64, 82, 0.05) 0px 0px 14px 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 40px;
        box-sizing: border-box;
    `,
    content: css`
        height: calc(100vh - 80px);
        overflow: auto;
        background: rgb(247, 249, 252);
    `,
    inner: css`
        width: 1200px;
        margin: 0 auto;
        padding: 40px 0;
    `,
    profile: css`
        margin-left: auto;
    `,
};

export const Container: FC = (props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const userContext = useContext(UserContext);
    const [logoutPopupVisible, setLogoutPopupVisible] = useState(false);
    const [authPopup, setAuthPopup] = useState(false);

    function onOpenLogoutPopup(): void {
        setLogoutPopupVisible(true);
    }

    function onCloseLogoutPopup(): void {
        setLogoutPopupVisible(false);
        handleMenuClose();
    }

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        handleMenuClose();
        localStorage.removeItem("token");
        userContext.setUser(undefined);
        onCloseLogoutPopup();
    };

    const goTo = (path: string) => {
        AppContext.getHistory().push(`/${path}`);
        handleMenuClose();
    };
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div className={styles.profile}>
                        {userContext.user ? (
                            <>
                                <Tooltip
                                    title={userContext.user?.login || userContext.user?.email || ""}
                                >
                                    <IconButton onClick={handleProfileMenuOpen} color={"inherit"}>
                                        {userContext.user?.avatar ? (
                                            <Avatar src={userContext.user?.avatar} />
                                        ) : (
                                            <AccountCircle />
                                        )}
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    anchor={anchorEl}
                                    open={isMenuOpen}
                                    onClose={handleMenuClose}
                                    options={[
                                        {
                                            value: "Профиль",
                                            handler: () => goTo("profile"),
                                        },
                                        {
                                            value: "Выход",
                                            handler: onOpenLogoutPopup,
                                        },
                                    ]}
                                />
                            </>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setAuthPopup(true)}
                            >
                                Войти
                            </Button>
                        )}
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.inner}>{props.children}</div>
                </div>
            </div>
            <AuthPopup
                open={authPopup}
                setUser={userContext.setUser}
                onClose={() => setAuthPopup(false)}
            />
            <ConfirmPopup
                open={logoutPopupVisible}
                title={"Вы действительно хотите выйти?"}
                onClose={onCloseLogoutPopup}
                onSubmit={logout}
            />
        </>
    );
};
