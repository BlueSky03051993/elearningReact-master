import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import Constants from '../../redux/constants';
import createAction from '../../redux/actions';
import { Link, useHistory } from 'react-router-dom';

export default function AdminBreadcrumbs({ path, extension }) {
  const history = useHistory();
  const content = ['category', 'course', 'video', 'target', 'user', 'role'];
  const onGoHome = () => {
    history.push('/admin');
  }
  const handlePage = (text) => () => {
    history.push(`/admin/${text}`);
  }
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" onClick={onGoHome} style={{ textDecoration: 'none' }}>
        Home
      </Link>
      {
        content.includes(path) &&
        <Link color="inherit" onClick={handlePage(path)} style={{ textDecoration: 'none' }}>
          {path}
        </Link>
      }

      {
        extension && 
        <Typography color="inherit">
          {extension}
        </Typography>
      }
    </Breadcrumbs>
  );
}