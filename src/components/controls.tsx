import React from 'react';

import { Button, Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import MergeIcon from '@material-ui/icons/MergeType';
import CancelIcon from '@material-ui/icons/Cancel';
import amber from '@material-ui/core/colors/amber';
import clsx from 'clsx';
import { useModalsDispatch, useModalsState } from 'contexts/page-modals';
import { onToggleMergeModal } from 'actions';

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

export const MergeButton = ({ onClick, mergeActive }) => {
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
            className={clsx(styles.button)}
            disabled={selectedForMerge.length !== 2}
            aria-label="Merge">
                Confirm Merge
            <MergeIcon />
        </Button>
    );
};
