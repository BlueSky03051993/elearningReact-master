import React from 'react';
import { CardMedia, Container, Grid, Input } from '@material-ui/core';
import { useStyles } from '../../HOCs/Layout/style';
import logo from '../../assets/img/logo-coral.svg';

export default function Header() {
    const classes = useStyles();
    return (
        <Container maxWidth={false} className={classes.MuiContainerRoot}>
            <div style={{ width: '100%', height: '0.8rem', background: 'linear-gradient(90deg, rgb(100, 91, 83) 0%, rgb(235, 82, 82) 18.23%, rgb(247, 143, 47) 34.37%, rgb(244, 193, 81) 48.96%, rgb(82, 187, 118) 66.15%, rgb(38, 165, 215) 82.29%, rgb(224, 105, 183) 100%)' }}>
            </div>
            <nav className="navbar navbar-expand-md">
                <Grid container spacing={1}>
                    <Grid xs={8} spacing={2}>
                        <CardMedia
                            component='img'
                            alt='logo'
                            image={logo}
                            className={classes.imgLogo}
                        />
                    </Grid>
                    <Grid xs={4} spacing={2}>

                    </Grid>
                </Grid>
                
                <div className="col-9 col-md-9 col-xl-7">
                    <div className="header__left">
                        <a className="navbar-brand" href="#">
                            <img src="./img/logo-coral.svg" alt />
                        </a>
                        <a className="categories" href="#">
                            <i className="fa fa-th" />
            Categories
          </a>
                        <form className="form-search">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search for anything" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                    <span className="input-group-text" id="basic-addon2">
                                        <i className="fa fa-search" />
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-1 col-md-3 col-xl-5">
                    <div className="header__right">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item business">
                                <a className="nav-link" href="#">Udemy for Business</a>
                            </li>
                            <li className="nav-item teach">
                                <a className="nav-link" href="#">Teach on Udemy</a>
                            </li>
                            <li className="nav-item icon">
                                <a className="nav-link" href="#">
                                    <i className="fa fa-shopping-cart" />
                                </a>
                            </li>
                            <li className="nav-item ude-btngroup">
                                <button className="login">Log In</button>
                                <button className="signup">Sign Up</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </Container>

    )
}
