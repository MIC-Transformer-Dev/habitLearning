import React, { useState, useEffect } from 'react';
import { Card, Grid, Typography, Divider, CircularProgress, Paper } from '@material-ui/core';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPostsByCreator, getPostsBySearch } from '../../actions/posts';
import { getUser } from '../../actions/user';
import Post from '../Posts/Post/Post';
import useStyles from './styles';
import { fetchUser } from '../../api';

const CreatorOrTag = () => {
    const { name } = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const { posts, isLoading } = useSelector((state) => state.posts);
    const [ creator, setCreator ] = useState('')
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        if(location.pathname.startsWith('/tag'))
            dispatch(getPostsBySearch({ tags: name }));
        if(location.pathname.startsWith('/creator'))
            dispatch(getPostsByCreator(name));
    },[]);

    const fetchUserData = async () => {
        const data = await fetchUser(name)
        setCreator(data);
    }

    useEffect(async () => {
        fetchUserData()
        setLoadingUser(false);
    },[]);


    if (!posts.length && !isLoading) return 'No posts';

    if(isLoading) {
        return(
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        );
    };

    if(loadingUser) {
        return(
            <Paper elevation={6}>
                <CircularProgress size="7em" />
            </Paper>
        );
    };

    return (
        <div>
            <div className={classes.creatortitle}>
                <Typography variant="h3" className={classes.divider}>{name}</Typography>
                {location.pathname?.startsWith('/creator') && (
                <Card className={classes.card}>
                    <Typography variant="h4" className={classes.score}>Total Score : {creator?.data[0]?.totalScore}</Typography>
                </Card>
                )}
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
