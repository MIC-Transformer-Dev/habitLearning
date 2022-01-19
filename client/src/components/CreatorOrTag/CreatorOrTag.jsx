import React, { useState, useEffect } from 'react';
import { Card, Grid, Typography, Divider, CircularProgress, Paper } from '@material-ui/core';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPostsByCreator, getPostsBySearch } from '../../actions/posts';
import Post from '../Posts/Post/Post';
import useStyles from './styles';

const CreatorOrTag = () => {
    const { name } = useParams();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const { posts, isLoading } = useSelector((state) => state.posts);

    useEffect(() => {
        if(location.pathname.startsWith('/tag'))
            dispatch(getPostsBySearch({ tags: name }));
        if(location.pathname.startsWith('/creator'))
            dispatch(getPostsByCreator(name));
    },[]);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    if (!posts.length && !isLoading) return 'No posts';

    if(isLoading) {
        return(
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        );
    };

    return (
        <div>
            <div className={classes.creatortitle}>
                <Typography variant="h3" className={classes.divider}>{name}</Typography>
                <Card className={classes.card}>
                    <Typography variant="h4" className={classes.score}>Total Score : {user.result.totalScore}</Typography>
                </Card>
            </div>
            <Divider className={classes.divider} />
            <Grid container alignItems='stretch' spacing={3}>
                {posts?.map((post, i) => (
                    <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
                        <Post post={post} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default CreatorOrTag;
