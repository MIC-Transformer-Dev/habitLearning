import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography} from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import titleLogo from '../../images/binarLogo.png';
import titleText from '../../images/titleText.png';
import useStyles from "./styles";

const NavBar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch(); 
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime())  logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer} >
                <Link to='/'>
                    <img className={classes.image} src={titleLogo} alt='icon' height='45px'/>
                    <img className={classes.image2} src={titleText} alt='icon' height='45px'/>
                </Link>
            </div>
            <Toolbar className={classes.toolbar}>
                { user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>
                          <Link to={`/creator/${user.result.name}`} className={classes.userName}>
                            {user.result.name}
                          </Link>
                        </Typography>
                        <Button className={classes.logout} variant='contained' color='secondary' onClick={logout}>Log out</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
