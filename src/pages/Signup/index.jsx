import React, { useCallback, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles } from '../../HOCs/Admin/style';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from "yup";

const userSchema = yup.object().shape({
  email: yup.string().required('Please Enter your Email').email('Email is not valid'),
  password: yup.string().required('Please Enter your password').matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Password must contain at least 8 Characters, one Uppercase, one Lowercase, one Number and one special case Character"
  ),
  fullname: yup.string().required('Please Enter your name').matches(/^[a-zA-Z ]+$/, "Ten phai la chu"),
  phone: yup.string().required('Please Enter your phone').matches(/^[0-9]+$/, "sdt phai la so"),
  address: yup.string(),
});

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [isConfirm, setIsConfirm] = useState(null);

  const goToSignIn = useCallback(() => {
    history.push('/signin');
  }, []);

  const { handleChange, values, errors, isValid, handleBlur, touched } = useFormik({
    initialValues: {
      email: '',
      password: '',
      fullname: '',
      address: '',
      phone: '',
    },
    validationSchema: userSchema,
    validateOnMount: true,
  });

  const handlePassword = useCallback((event) => {
    setIsConfirm(event.target.value === values.password);
  }, [setIsConfirm]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    if (!isValid || !isConfirm) return;

  }, [isValid, isConfirm]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.signupPaper}>
        <Avatar className={classes.signupAvatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.signupForm} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="email"
                variant="outlined"
                required
                fullWidth
                label="Email"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email && <Typography color='error'>{errors.email}</Typography>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password && <Typography color='error'>{errors.password}</Typography>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="checkPassword"
                variant="outlined"
                required
                fullWidth
                label="Confirm Password"
                type="password"
                onChange={handlePassword}
              />
              {isConfirm !== null && <Typography color='error'>{isConfirm ? "" : "Passwords don't match"}</Typography>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="fullname"
                variant="outlined"
                required
                fullWidth
                label="Full Name"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.fullname && errors.fullname && <Typography color='error'>{errors.fullname}</Typography>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="address"
                label="Address"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="phone"
                label="Phone"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.phone && errors.phone && <Typography color='error'>{errors.phone}</Typography>}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.signupSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link onClick={goToSignIn} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}