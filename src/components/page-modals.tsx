import React from 'react';
import { useModalsState, useModalsDispatch } from 'contexts/page-modals';
import { ChildrenProps } from 'global-types';
import { Modal, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { onToggleAddModal } from 'actions';

const Aux = ({ children }: ChildrenProps) => children;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(4),
            outline: 'none'
        }
    }),
);

function FirstModal() {
    const styles = useStyles({});
    const { addModalOpen } = useModalsState();
    const dispatch = useModalsDispatch();

    return (
        <Modal open={addModalOpen} onClose={() => dispatch(onToggleAddModal)
        }>
            <div className={styles.paper}>
                <Typography variant="h6" id="modal-title">
            Text in a modal
                </Typography>
                <Typography variant="subtitle1" id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
            </div>
        </Modal>
    );
}

export default function PageModals() {
    return (
        <Aux >
            <FirstModal />
        </Aux>
    );

}
