import React from 'react';
import { Modal, makeStyles, Theme, createStyles, Typography } from '@material-ui/core';
import { filter } from 'ramda';
import { useModalsState, useModalsDispatch } from 'contexts/page-modals';
import { onToggleMergeModal, onSubmitMergeSections } from 'actions';
import BaseModal from '..';
import { useAppState, useAppService } from 'contexts/app';
import { SectionsService } from 'services/section';
import Box from 'components/box';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        reviewBox: {
            paddingLeft: theme.spacing(6)
        }
    }),
);


const useMergeState = () => {
    const { sections } = useAppState();
    const { mergeModalOpen, selectedForMerge } = useModalsState(); // TODO: put selected items in store
    const matchingSection = ({ id }) => id === selectedForMerge[0] || id === selectedForMerge[1];
    const selectedSectionsFromCollection = filter(matchingSection, sections);
    const dispatch = useModalsDispatch();
    return {
        dispatch,
        mergeModalOpen,
        selectedSectionsFromCollection
    };
};

const MergeModal: React.FC = () => {
    const service: SectionsService = useAppService();

    const styles = useStyles({});

    const {
        dispatch,
        mergeModalOpen,
        selectedSectionsFromCollection
    } = useMergeState();
    console.log('TCL: MergeModal:React.FC -> selectedSectionsFromCollection', selectedSectionsFromCollection);

    const handleClose = () => dispatch(onToggleMergeModal);
    const handleSubmit = () => onSubmitMergeSections(service, selectedSectionsFromCollection, dispatch);

    return (
        <BaseModal open={mergeModalOpen} onClose={handleClose}>
            <Typography variant="subtitle1">Merge Sections</Typography>
            <Box className={styles.reviewBox} column >
                {
                    selectedSectionsFromCollection.map(
                        ({ name }) => (
                            <Typography key={name} variant="body1">{name}</Typography>
                        )
                    )
                }
            </Box>
        </BaseModal>
    );
};

export default MergeModal;

