import React from 'react';
import { useStyles } from '../../HOCs/Admin/style';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LayersIcon from '@material-ui/icons/Layers';
import PersonIcon from '@material-ui/icons/Person';
import { useDispatch, useSelector } from 'react-redux';
import createAction from '../../redux/actions';
import Constants from '../../redux/constants';
import { useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import logo from '../../assets/images/logo.png';
import { useHistory } from 'react-router-dom';

export default function NavbarAdmin() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const open = useSelector((state) => state.admin.openNavbar);
  const history = useHistory();
  const handleNavbarClose = () => {
    dispatch(createAction(Constants.OPEN_NAVBAR, false));
  };


  const handlePage = (text) => () => {
    history.push(`/admin/${text.toLowerCase()}`)
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <img src={logo} alt='logo' onClick={handlePage('')} />
        <IconButton onClick={handleNavbarClose} className={classes.icon}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {['Category', 'Course', 'Video', 'Target', 'User', 'Role'].map((text, index) => (
          <ListItem button key={text} onClick={handlePage(text)} >
            <ListItemIcon>{index <= 3 ? <LayersIcon className={classes.icon} /> : <PersonIcon className={classes.icon} />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
