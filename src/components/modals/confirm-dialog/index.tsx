import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ClickHandler } from 'global-types';
import { InProgressItem } from 'entities/types';
import { useDispatch } from 'react-redux';
import { onRemoveItemInProgress } from 'actions';
import { onThrowError } from 'reducers/error';

export interface ConfirmDialogProps {
    open: boolean;
    handleClose: ClickHandler;
    handleConfirm?: ClickHandler;
    rowToDelete: InProgressItem | undefined;
}

export default function ConfirmDialog({
    open,
    handleConfirm,
    handleClose,
    rowToDelete
}: ConfirmDialogProps) {
    const dispatch = useDispatch();

    const onConfirm = () => {
        if (rowToDelete) {
            // if we click cancel on close-sections page instead of from sections table
            try {
                onRemoveItemInProgress(dispatch, (rowToDelete as InProgressItem).storageKey);
            } catch (err) {
                dispatch(onThrowError(err));
            }
        }
        handleConfirm && handleConfirm();
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Delete progress</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to remove this work in progress?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="default">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="default" variant="contained" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}
