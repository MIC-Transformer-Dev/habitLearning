import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
    card: {
        borderRadius: '15px'
    },
    creatortitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    divider: {
        margin: '20px 0',
        textTransform: 'capitalize'
    },
    loadingPaper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '15px',
        height: '39vh',
    },
    score: {
        margin: '20px 20px',
        textTransform: 'capitalize'
    },
}));