import React from 'react';
import { useStyles } from '../../HOCs/Admin/style';
import { useDispatch, useSelector } from 'react-redux';
import createAction from '../../redux/actions';
import Constants from '../../redux/constants';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { IconButton } from '@material-ui/core';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';

export default function HeaderAdmin() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const handleNavbarOpen = () => {
        dispatch(createAction(Constants.OPEN_NAVBAR, true));
    };

    const open = useSelector((state) => state.admin.openNavbar);

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleNavbarOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    Persistent drawer
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
