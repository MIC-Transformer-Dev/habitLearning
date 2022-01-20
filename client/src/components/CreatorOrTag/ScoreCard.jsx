import React, { useState, useEffect } from 'react';
import { Card, Typography } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../actions/user';
import useStyles from './styles';

const ScoreCard = ({ posts }) => {
  const { user, setUser } = useSelector((state) => state.user);
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const id = useState(posts?.creator);

  useEffect(() => {
    dispatch(getUser(id));
  },[]);

  return (
      <>
        <Card className={classes.card}>
            <Typography variant="h4" className={classes.score}>Total Score : {user.totalScore}</Typography>
        </Card>
      </>
  );
};

export default ScoreCard;
