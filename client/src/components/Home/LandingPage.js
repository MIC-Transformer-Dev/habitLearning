import React, { useState, useEffect } from 'react'
import { 
    Container, 
    Grow, 
    Grid, 
    Paper, 
    AppBar, 
    TextField, 
    Button,
    Typography,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
    } 
    from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ChipInput from 'material-ui-chip-input';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { getPostsBySearch } from '../../actions/posts';
import useStyles from "./styles";
import Form from '../Form/Form';
import Pagination from '../Pagination';
import { fetchUsers } from '../../api';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#3f51b5',
      color: theme.palette.common.white,
      fontSize: 20
    },
    body: {
      fontSize: 20
    },
  }))(TableCell);
  
const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
    
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const LandingPage = () => {
    const [currentId, setCurrentId] = useState(0);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();
    const classes = useStyles();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [ creators, setCreators ] = useState('')
    const [loadingUser, setLoadingUser] = useState(true);

    const data = async () => {
        const { data } = await fetchUsers(1)
        setCreators(data)
    }

    useEffect(() => {
        data()
        setLoadingUser(false)
    },[]);
    console.log(creators)

    const handleKeyPress= (event) => {
        if(event.keyCode === 13) {
            searchPost();
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag]);
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    const searchPost = () => {
        if(search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            history.push('/');
        }
    }

    const getPosts = () => {
        history.push('/posts');
    }

    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid className={classes.gridContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                    <Typography variant="h4" align="center">LEADERBOARD</Typography>
                    <Divider className={classes.divider}/>
                    {loadingUser === false && (
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="center">Total Points</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {creators?.data?.map((creator) => (
                                <StyledTableRow key={creator.name}>
                                <StyledTableCell component="th" scope="row">
                                    <Link to={`/creator/${creator.name}`} className={classes.userName}>
                                        {creator.name}
                                    </Link>
                                </StyledTableCell>
                                <StyledTableCell align="center">{creator.totalScore}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    )}
                    <Button className={classes.postsButton} onClick={getPosts} color='primary' variant='contained'>View All Posted Challenges</Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color='inherit'>
                            <TextField 
                                variant='outlined' 
                                label="Search Tasks" 
                                onKeyPress={handleKeyPress}
                                name="search" 
                                fullWidth 
                                value={search} 
                                onChange={(e) => setSearch(e.target.value)} 
                            />
                            <ChipInput 
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant='outlined'
                            />
                            <Button className={classes.searchButton} onClick={searchPost} color='primary' variant='contained'>Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default LandingPage;
