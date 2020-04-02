import React, {useContext, useState} from "react";
import {UserContext} from "../../app";
import {AppContext} from "../../context";
import {Avatar, Button, IconButton, Tooltip} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";
import {Menu} from "../menu";
import {AuthPopup} from "../../widgets/auth-popup";
import {ConfirmPopup} from "../confirm-popup";
import {css} from "emotion";
import {Container} from "../container";

const styles = {
    header: css`
        width: 100%;
        height: 80px;
        background: #fff;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
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

export const Header = () => {
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
        AppContext.getHistory().push(`/`);
    };

    const goTo = (path: string) => {
        AppContext.getHistory().push(`/${path}`);
        handleMenuClose();
    };
    return (
        <>
            <div className={styles.header}>
                <Container className={css`display: flex`}>
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
                </Container>
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
