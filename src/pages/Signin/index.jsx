import React, { useCallback } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles } from '../../HOCs/Admin/style';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from "yup";
import axios from 'axios';
import Constants from '../../redux/constants';
import { useDispatch } from 'react-redux';
import createAction from '../../redux/actions'

const userSchema = yup.object().shape({
  email: yup.string().required('Please Enter your Email').email('Email is not valid'),
  password: yup.string().required('Please Enter your password'),
});

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const goToSignUp = useCallback(() => {
    history.push('/signup');
  }, [history]);

  const { handleChange, values, errors, isValid, handleBlur, touched } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: userSchema,
    validateOnMount: true,
  });

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    if (!isValid) return;

    try {
      const res = await axios({
        url: `${Constants.DOMAIN_API}/api/auth/login`,
        method: 'POST',
        data: values
      });

      localStorage.setItem(Constants.TOKEN_KEY, res.data);
      dispatch(createAction(Constants.SET_TOKEN,res.data));

      history.replace('/');
    } catch (error) {
      console.log({ ...error });
    }
  }, [isValid, values]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.signupPaper}>
        <Avatar className={classes.signupAvatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.signupForm} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Email"
            name="email"
            autoFocus
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && <Typography color='error'>{errors.email}</Typography>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password && <Typography color='error'>{errors.password}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.signupSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link onClick={goToSignUp} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}