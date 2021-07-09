import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.svg';
import MainMenu from './MainMenu';
import styles from './sidebar-jss';
import axios from 'axios';
import config from '../../config/config';
function SidebarContent(props) {
    const [transform, setTransform] = useState(0);
    const [name, setName] = useState(null);
    const [image, setImage] = useState(null);
    const [isDone, setIsDone] = useState(false);

    const handleScroll = event => {
        const scroll = event.target.scrollTop;
        setTransform(scroll);
    };
    const baseApiUrl = config.baseApiUrl;
    const getUser = useCallback(async () => {
        try {
            const url = baseApiUrl + 'user/me';
            const response = await axios.get(url, {
                params: {
                    token: localStorage.getItem('token'),
                },
            });
            const user = response.data.data.info;
            localStorage.setItem('image', user.image);
            setImage(user.image);
            setName(user.name);
            setIsDone(true);
        } catch (error) {
            console.log(error.response.data);
            //return error.response ? error.response.data : error.message;
        }
    }, [setName, setImage, setIsDone]);

    useEffect(() => {
        if (!isDone) {
            getUser();
        }
        const mainContent = document.getElementById('sidebar');
        mainContent.addEventListener('scroll', handleScroll);
        return () => {
            mainContent.removeEventListener('scroll', handleScroll);
        };
    }, [isDone]);

    const {
        classes,
        turnDarker,
        drawerPaper,
        toggleDrawerOpen,
        loadTransition,
        leftSidebar,
        dataMenu,
        status,
        anchorEl,
        openMenuStatus,
        closeMenuStatus,
        changeStatus,
        isLogin,
    } = props;

    return (
        <div
            className={classNames(
                classes.drawerInner,
                !drawerPaper ? classes.drawerPaperClose : ''
            )}
        >
            <div className={classes.drawerHeader}>
                <NavLink
                    to="/app"
                    className={classNames(
                        classes.brand,
                        classes.brandBar,
                        turnDarker && classes.darker
                    )}
                >
                    <img src={logo} alt={brand.name} />
                    {brand.name}
                </NavLink>
                {isLogin && (
                    <div
                        className={classNames(classes.profile, classes.user)}
                        style={{
                            opacity: 1 - transform / 100,
                            marginTop: transform * -0.3,
                        }}
                    >
                        <Avatar
                            alt={name}
                            src={image}
                            className={classNames(
                                classes.avatar,
                                classes.bigAvatar
                            )}
                        />
                        <div>
                            <h4>{name}</h4>
                            <Button size="small" onClick={openMenuStatus}>
                                <i
                                    className={classNames(
                                        classes.dotStatus,
                                        classes.online
                                    )}
                                />
                                online
                            </Button>
                            <Menu
                                id="status-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={closeMenuStatus}
                                className={classes.statusMenu}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div
                id="sidebar"
                className={classNames(
                    classes.menuContainer,
                    leftSidebar && classes.rounded,
                    isLogin && classes.withProfile
                )}
            >
                <MainMenu
                    loadTransition={loadTransition}
                    dataMenu={dataMenu}
                    toggleDrawerOpen={toggleDrawerOpen}
                />
            </div>
        </div>
    );
}

SidebarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    drawerPaper: PropTypes.bool.isRequired,
    turnDarker: PropTypes.bool,
    toggleDrawerOpen: PropTypes.func,
    loadTransition: PropTypes.func,
    leftSidebar: PropTypes.bool.isRequired,
    dataMenu: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired,
    anchorEl: PropTypes.object,
    openMenuStatus: PropTypes.func.isRequired,
    closeMenuStatus: PropTypes.func.isRequired,
    changeStatus: PropTypes.func.isRequired,
    isLogin: PropTypes.bool,
};

SidebarContent.defaultProps = {
    turnDarker: false,
    toggleDrawerOpen: () => {},
    loadTransition: () => {},
    anchorEl: null,
    isLogin: true,
};

export default withStyles(styles)(SidebarContent);
