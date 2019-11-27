import React from 'react';
import { Button } from '@material-ui/core';
import MergeIcon from '@material-ui/icons/MergeType';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import { useModalsDispatch, useModalsState } from 'contexts/page-modals';
import { ClickHandler } from 'global-types';
import { useButtonStyles } from 'components/buttons';
import { onToggleMergeModal, onToggleAddModal } from 'slices/modals';


export interface MergeButtonProps {
    onClick: ClickHandler;
    mergeActive: boolean;
}

export const MergeButton = ({ onClick, mergeActive }: MergeButtonProps) => {
    const styles = useButtonStyles({});
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
    const styles = useButtonStyles({});
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
    const styles = useButtonStyles({});
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

