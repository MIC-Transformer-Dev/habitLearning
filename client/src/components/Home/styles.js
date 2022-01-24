import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    gap: '0.5rem',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  table: {
    minWidth: 700,
  },
  divider: {
    margin: '20px 0',
    textTransform: 'capitalize'
  },
  userName: {
    textDecoration: 'none',
    color: 'black'
  },
  postsButton: {
    marginTop: '30px',
    marginBottom: '10px',
    fontSize: 20
  }
}));