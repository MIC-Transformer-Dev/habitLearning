import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { updatePost } from '../../actions/posts';
import useStyles from './styles';

const CommentSection = ({ post }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();
    const dispatch = useDispatch();
    const commentsRef = useRef();
    const [comments, setComments] = useState(post?.comments);
    const [score, setScore] = useState('');

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${score}`;
        const newComments = await dispatch(updatePost(post._id, {score}));
        setComments(newComments);
        setScore('');
        commentsRef.current.scrollIntoView({ behavior: 'smooth'});
    }

    return (
        <>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}> 
                    <Typography gutterBottom variant='h6'>Score</Typography>
                        <Typography variant='h3' gutterBottom>
                            <strong>{post.score}</strong>
                            <strong>/100</strong>
                        </Typography>
                    <div ref={commentsRef} />
                </div>
                {user?.result?.name && (
                    <div style={{ width: '70%'}}>
                        <Typography gutterBottom variant='h6'>Add Score Here</Typography>
                        <TextField 
                            fullWidth
                            rows={4}
                            variant='outlined'
                            label="Score"
                            multiline
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                        />
                        <Button 
                            className={classes.comment} 
                            fullWidth 
                            variant='contained' 
                            disabled={!score} 
                            onClick={handleClick} 
                            color='primary'
                        >
                            Score
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CommentSection;
