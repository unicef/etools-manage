import React from 'react';
import { makeStyles, Theme, createStyles, Typography, InputLabel, Input, FormControl, FormHelperText, Button } from '@material-ui/core';
import MergeIcon from '@material-ui/icons/MergeType';
import {
    filter

} from 'ramda';
import { withRouter } from 'react-router-dom';
import { useModalsState, useModalsDispatch } from 'contexts/page-modals';
import { onToggleMergeModal } from 'actions';
import BaseModal, { ModalContentProps } from '..';
import { useAppState } from 'contexts/app';
import Box from 'components/box';
import { Aux } from 'components/aux';
import { setValueFromEvent } from 'utils';
import { SectionEntity, useAddSection } from 'entities/section-entity';
import { useModalStyles } from '../styles';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 440
        },
        reviewBox: {
            background: 'rgba(236,239,241,.38)',
            marginBottom: theme.spacing(2)
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


// Content components created for lazy loading modal content
const MergeModalContent: React.FC<ModalContentProps> = ({ onClose }) => {
    const styles = useStyles({});
    const formStyles = useModalStyles({});

    const {
        selectedSectionsFromCollection,
        selectedForMerge
    } = useMergeState();

    const {
        errorOnName,
        setNameError,
        handleValidateSection,
        name,
        setName
    } = useAddSection();

    const [first, second] = selectedSectionsFromCollection;

    const mergeConfirmUrl = `/merge/sections=${selectedForMerge.join(',')}&newName=${name}`;

    const SubmitButton = withRouter(({ history }) => (
        <Button
            onClick={() => history.push(mergeConfirmUrl)}
            className={formStyles.confirmBtn}
            color="secondary"
            variant="contained"
            disabled={!name.length || Boolean(errorOnName.length)}
        >Continue</Button>
    ));

    return (
        <Aux>

            <Box className={formStyles.header} align="center">
                <MergeIcon color="inherit" className={formStyles.icon}/>
                <Typography
                    className={formStyles.subtitle}
                    color="inherit"
                    variant="subtitle1">Merge Sections</Typography>
            </Box>

            <Box column className={styles.reviewBox}>
                <SectionBox section={first} />
                <SectionBox section={second} />
            </Box>


            <FormControl
                classes={{
                    root: formStyles.formRoot
                }}
                error={Boolean(errorOnName.length)}>

                <InputLabel
                    className={formStyles.formLabel}
                    shrink htmlFor="new-section-name">New section</InputLabel>
                <Input
                    className={formStyles.input}
                    classes={{
                        input: formStyles.inputHeight,
                        focused: formStyles.inputFocused
                    }}
                    disableUnderline
                    id="new-section-name"
                    placeholder="Enter new section name"
                    value={name}
                    onChange={setValueFromEvent(setName)}
                    onBlur={handleValidateSection}
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

