import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useStyles } from "./style";
import HeaderAdmin from '../../components/HeaderAdmin';
import NavbarAdmin from '../../components/NavbarAdmin';

export default function Admin(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <HeaderAdmin />
            <NavbarAdmin />
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {props.children}
            </main>
        </div>
    );
}