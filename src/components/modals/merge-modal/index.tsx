import React, { useState } from 'react';
import { makeStyles, Theme, createStyles, Typography, InputLabel, Input } from '@material-ui/core';
import { filter } from 'ramda';
import MergeIcon from '@material-ui/icons/MergeType';
import { useModalsState, useModalsDispatch } from 'contexts/page-modals';
import { onToggleMergeModal } from 'actions';
import BaseModal from '..';
import { useAppState, useAppService } from 'contexts/app';
import { SectionsService } from 'services/section';
import Box from 'components/box';
import { Aux } from 'components/aux';
import { setValueFromEvent } from 'utils';
import { SectionEntity } from 'entities/section';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 550
        },
        reviewBox: {
            margin: `${theme.spacing(1)}px 0 ${theme.spacing(1)}px ${theme.spacing(1)}px`
        },
        header: {
            color: theme.palette.text.hint,
            marginBottom: theme.spacing(3)
        },
        icon: {
            fontSize: 20
        },
        subtitle: {
            fontWeight: 500,
            fontSize: 14,
            lineHeight: '20px'
        },
        input: {
            backgroundColor: '#f1f3f4',
            padding: theme.spacing(1),
            marginLeft: theme.spacing(3),
            borderRadius: 4
        },
        section: {
            background: 'rgba(236,239,241,.38)',
            padding: theme.spacing(1),
            borderRadius: 2,
            lineHeight: 'inherit',
            // minHeight: 90,
            flex: 1,
            '&:nth-child(1)': {
                marginRight: theme.spacing(2)
            }
        },
        sectionTitle: {
            fontSize: 13,
            lineHeight: 'inherit',
            color: theme.palette.action.active,
            paddingBottom: theme.spacing(1)
        },
        name: {
            fontSize: 12,
            color: theme.palette.text.hint
        },
        sectionName: {
            color: theme.palette.primary.contrastText,
            fontSize: 20
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

interface SectionBoxProps {
    section: SectionEntity;
}

const SectionBox: React.FC<SectionBoxProps> = ({ section }) => {
    const styles = useStyles({});
    return (
        <Box column className={styles.section}>
            <Typography className={styles.name} variant="body2">Name</Typography>
            <Typography className={styles.sectionName} variant="body2">{section.name}</Typography>
        </Box>
    );
};

// Content components created for lazy loading modal content
const MergeModalContent: React.FC = () => {
    const service: SectionsService = useAppService();

    const styles = useStyles({});
    const [name, setName] = useState<string>('');

    const {
        selectedSectionsFromCollection
    } = useMergeState();

    const [first, second] = selectedSectionsFromCollection;
    // const handleSubmit = () => onSubmitMergeSections(service, selectedSectionsFromCollection, dispatch);
    return (
        <Aux>

            <Box className={styles.header}>
                <MergeIcon color="inherit" className={styles.icon}/>
                <Typography
                    className={styles.subtitle}
                    color="inherit"
                    variant="subtitle1">Merge Sections</Typography>
            </Box>

            <Box className={styles.reviewBox}>
                <SectionBox section={first} />
                <SectionBox section={second} />
            </Box>

            <InputLabel htmlFor="new-section-name">Name</InputLabel>
            <Input
                className={styles.input}
                disableUnderline
                id="new-section-name"
                value={name}
                onChange={setValueFromEvent(setName)} />

        </Aux>
    );
};

const MergeModal: React.FC = () => {
    const { mergeModalOpen, dispatch } = useMergeState();
    const handleClose = () => dispatch(onToggleMergeModal);
    const styles = useStyles({});
    return (
        <BaseModal open={mergeModalOpen} onClose={handleClose} className={styles.root}>
            <MergeModalContent />
        </BaseModal>
    );
};

export default MergeModal;

