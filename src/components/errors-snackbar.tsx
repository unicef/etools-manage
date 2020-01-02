import React, { SyntheticEvent } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import { MySnackbarContentWrapper } from './snackbars';

const useStyles2 = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1)
    }
}));

export interface SnackbarController {
    open: boolean;
    handleClose: (event?: SyntheticEvent, reason?: string) => void;
    errorMessage: string;
}
export default function ErrorsSnackbar({ open, handleClose, errorMessage }: SnackbarController) {
    const classes = useStyles2();

    // const handleClose = (event?: SyntheticEvent, reason?: string) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }

    //     handleClose();
    // };

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                open={open}
            >
                <MySnackbarContentWrapper
                    variant="error"
                    onClose={handleClose}
                    className={classes.margin}
                    message={errorMessage}
                />
            </Snackbar>
        </div>
    );
}
