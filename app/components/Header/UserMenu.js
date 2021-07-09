import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useSnackbar } from 'notistack';
import styles from './header-jss';
import history from '../../utils/history';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function UserMenu(props) {
    const [image, setimage] = useState(null);
    const [isDone, setIsDone] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [menuState, setMenuState] = useState({
        anchorEl: null,
        openMenu: null,
    });

    const handleMenu = menu => event => {
        const { openMenu } = menuState;
        setMenuState({
            openMenu: openMenu === menu ? null : menu,
            anchorEl: event.currentTarget,
        });
    };

    const handleClose = () => {
        setMenuState({ anchorEl: null, openMenu: null });
    };
    const { anchorEl, openMenu } = menuState;

    const handleLogout = () => {
        enqueueSnackbar('Logout successful', {
            variant: 'success',
        });
        history.push('/');
    };

    const handleProfile = () => {
        handleClose();
        history.push('/app/users/profile');
    };

    useEffect(
        () => {
            if (!isDone) {
                setimage(localStorage.getItem('image'));
                setIsDone(true);
            }
        },
        isDone,
        setIsDone
    );
    return (
        <div>
            <Button onClick={handleMenu('user-setting')}>
                <Avatar alt="avatar" src={image} />
            </Button>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={openMenu === 'user-setting'}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={handleProfile}
                    component={Link}
                    to="/app/users/profile"
                >
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    My Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} component={Link} to="/">
                    <ListItemIcon>
                        <ExitToApp />
                    </ListItemIcon>
                    Log Out
                </MenuItem>
            </Menu>
        </div>
    );
}

UserMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    dark: PropTypes.bool,
};

UserMenu.defaultProps = {
    dark: false,
};

export default withStyles(styles)(UserMenu);
