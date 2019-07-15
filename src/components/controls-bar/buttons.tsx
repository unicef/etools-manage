import React from 'react';
import { Button, Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import MergeIcon from '@material-ui/icons/MergeType';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import amber from '@material-ui/core/colors/amber';
import { useModalsDispatch, useModalsState } from 'contexts/page-modals';
import { onToggleMergeModal, onToggleAddModal } from 'actions';
import { ClickHandler } from 'global-types';

const useActionStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
            color: theme.palette.primary.main
        },
        btnConfirm: {
            backgroundColor: amber[500]
        },
        icon: {
            marginLeft: theme.spacing(1)
        }
    }));

export interface MergeButtonProps {
    onClick: ClickHandler;
    mergeActive: boolean;
}
export const MergeButton = ({ onClick, mergeActive }: MergeButtonProps) => {
    const styles = useActionStyles({});
    const btnText = mergeActive ? 'Cancel Merge' : 'Merge';
    return (
        <Button
            onClick={onClick}
            variant="contained"
            color="secondary"
            className={styles.button}
            aria-label="Merge">
            { btnText }
            {
                mergeActive ? <CancelIcon className={styles.icon} />
                    : <MergeIcon className={styles.icon} />
            }
        </Button>
    );
};

export const ConfirmMergeButton = () => {
    const styles = useActionStyles({});
    const dispatch = useModalsDispatch();
    const { selectedForMerge } = useModalsState();

    return (
        <Button
            onClick={() => dispatch(onToggleMergeModal) }
            color="secondary"
            variant="contained"
            className={styles.button}
            disabled={selectedForMerge.length !== 2}
            aria-label="Merge">
                Create Merge
            <MergeIcon className={styles.icon}/>
        </Button>
    );
};

export const AddSectionButton = () => {
    const styles = useActionStyles({});
    const dispatch = useModalsDispatch();
    const onClick = () => {
        dispatch(onToggleAddModal);
    };
    return (
        <Button
            onClick={onClick }
            color="secondary"
            className={styles.button}
            variant="contained">
            Add Section
            <AddIcon className={styles.icon}/>
        </Button>
    );
};


