import React from 'react';
import { Modal, makeStyles, Theme, createStyles, Paper } from '@material-ui/core';
import clsx from 'clsx';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2),
            outline: 'none'
        },
        modal: {
            top: '25%',
            left: '50%',
            transform: 'translate(-50%, -25%)'
        }
    }),
);

export interface BaseModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className? : string;
}

export interface ModalContentProps {
    onClose(): void;
}

const BaseModal: React.FC<BaseModalProps> = ({ open, onClose, children, className }) => {
    const styles = useStyles({});
    return (
        <Modal open={open} onClose={onClose}>
            <Paper className={clsx(styles.paper, styles.modal, className)}>
                {children}
            </Paper>
        </Modal>
    );
};

export default BaseModal;

