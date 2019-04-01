import React from 'react';
import Box from 'components/box';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles({
    root: {
        paddingTop: 64
    }
});
export default function Page() {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            PAGE 2
        </Box>
    );
}
