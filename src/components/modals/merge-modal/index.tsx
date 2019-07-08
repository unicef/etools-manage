import React, { useState } from 'react';
import { makeStyles, Theme, createStyles, Typography, InputLabel, Input, FormControl, FormHelperText, Button } from '@material-ui/core';
import MergeIcon from '@material-ui/icons/MergeType';
import {
    filter,
    prop,
    compose,
    map,
    find,
    equals,
    toLower,
    trim
} from 'ramda';
import { withRouter } from 'react-router-dom';
import { useModalsState, useModalsDispatch } from 'contexts/page-modals';
import { onToggleMergeModal, onSubmitMergeSections } from 'actions';
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
            width: 440
        },
        reviewBox: {
            background: 'rgba(236,239,241,.38)',
            marginBottom: theme.spacing(2)
        },
        header: {
            color: theme.palette.text.hint,
            marginBottom: theme.spacing(2)
        },
        icon: {
            fontSize: 20
        },
        subtitle: {
            fontWeight: 500,
            fontSize: 14,
            lineHeight: '20px'
        },
        inputHeight: {
            height: 'auto'
        },
        input: {
            fontSize: '0.875rem',
            backgroundColor: '#f1f3f4',
            color: theme.palette.text.secondary,
            borderRadius: 4,
            height: 'auto',
            boxShadow: '0 0 0 2px transparent inset, 0 0 0 1px #e0e0e0 inset'

        },
        inputFocused: {
            backgroundColor: theme.palette.primary.main,
            boxShadow: '0 0 0 2px transparent inset, 0 0 0 1px #e0e0e0 inset'

        },

        formRoot: {
            '& label.Mui-focused': {
                color: '#202124'
            }
        },
        formLabel: {
            color: theme.palette.text.primary,
            marginBottom: theme.spacing(1)
        },
        section: {
            padding: theme.spacing(1),

            lineHeight: 'inherit',
            flex: 1,
            '&:nth-child(1)': {
                paddingBottom: 0
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
            color: theme.palette.primary.contrastText
        },
        confirmBtn: {
            marginLeft: theme.spacing(1),
            color: theme.palette.primary.main
        }
    }),
);


export const useMergeState = () => {
    const { sections } = useAppState();
    const { mergeModalOpen, selectedForMerge } = useModalsState();
    const matchingSection = ({ id }) => id === selectedForMerge[0] || id === selectedForMerge[1];
    const selectedSectionsFromCollection = filter(matchingSection, sections);
    const dispatch = useModalsDispatch();
    return {
        dispatch,
        mergeModalOpen,
        sections,
        selectedForMerge,
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
            <Typography className={styles.sectionName} variant="h6">{section.name}</Typography>
        </Box>
    );
};

interface MergeModalProps {
    onClose(): void;
}
// Content components created for lazy loading modal content
const MergeModalContent: React.FC<MergeModalProps> = ({ onClose }) => {
    const service: SectionsService = useAppService();
    const [errorOnName, setNameError] = useState<string>('');
    const styles = useStyles({});
    const [name, setName] = useState<string>('');

    const {
        selectedSectionsFromCollection,
        sections,
        selectedForMerge,
        dispatch
    } = useMergeState();

    const handleCheckUnique = () => {
        const checkUniqueName = find(compose(equals(trim(name)), toLower, prop('name')));
        const nameExists = checkUniqueName(sections) !== undefined;
        if (nameExists) {
            setNameError('Section name already exists');
        }
    };

    const [first, second] = selectedSectionsFromCollection;
    // const handleSubmit = () => onSubmitMergeSections(service, map(prop('id'), selectedSectionsFromCollection), dispatch);

    const SubmitButton = withRouter(({ history }) => (
        <Button
            onClick={() => history.push(`/merge/sections=${selectedForMerge.join(',')}&newName=${name}`)}
            className={styles.confirmBtn}
            color="secondary"
            variant="contained"
            disabled={!name.length || Boolean(errorOnName.length)}
        >Continue</Button>
    ));
    return (
        <Aux>

            <Box className={styles.header}>
                <MergeIcon color="inherit" className={styles.icon}/>
                <Typography
                    className={styles.subtitle}
                    color="inherit"
                    variant="subtitle1">Merge Sections</Typography>
            </Box>

            <Box column className={styles.reviewBox}>
                <SectionBox section={first} />
                <SectionBox section={second} />
            </Box>


            <FormControl
                classes={{
                    root: styles.formRoot
                }}
                error={Boolean(errorOnName.length)}>

                <InputLabel
                    className={styles.formLabel}
                    shrink htmlFor="new-section-name">New section</InputLabel>
                <Input
                    className={styles.input}
                    classes={{
                        input: styles.inputHeight,
                        focused: styles.inputFocused
                    }}
                    disableUnderline
                    id="new-section-name"
                    placeholder="Enter new section name"
                    value={name}
                    onChange={setValueFromEvent(setName)}
                    onBlur={handleCheckUnique}
                    onFocus={() => setNameError('')}
                />
                <FormHelperText id="component-error-text">{errorOnName}</FormHelperText>
            </FormControl>

            <Box align="center" justify="end">
                <Button onClick={onClose}>Cancel</Button>
                <SubmitButton />
            </Box>


        </Aux>
    );
};

const MergeModal: React.FC = () => {
    const { mergeModalOpen, dispatch } = useMergeState();
    const handleClose = () => dispatch(onToggleMergeModal);
    const styles = useStyles({});
    return (
        <BaseModal open={mergeModalOpen} onClose={handleClose} className={styles.root}>
            <MergeModalContent onClose={handleClose} />
        </BaseModal>
    );
};

export default MergeModal;

